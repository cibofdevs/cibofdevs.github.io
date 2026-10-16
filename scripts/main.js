import config from './config.js';
import { createCollapsible, revealSections } from './motion.js';

document.documentElement.classList.add('js');
document.getElementById('current-year').textContent = new Date().getFullYear();

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.getElementById('main-navigation');
const navigationPanel = document.getElementById('navigation-panel');
const header = document.querySelector('.site-header');
const mobileViewport = window.matchMedia('(max-width: 580px)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
menuButton.hidden = false;

function updateHeaderOffset() {
  document.documentElement.style.setProperty('--header-offset', `${header.offsetHeight + 32}px`);
}

const menuMotion = createCollapsible(navigationPanel, {
  expanded: !mobileViewport.matches,
  duration: 200,
  reducedMotion,
  onChange: expanded => menuButton.setAttribute('aria-expanded', String(mobileViewport.matches && expanded)),
  onBeforeHide: () => menuButton.focus(),
  onFinish: updateHeaderOffset
});

function closeMenu() {
  return menuMotion.setExpanded(false);
}

menuButton.addEventListener('click', () => menuMotion.setExpanded(!menuMotion.expanded));
navigation.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (!link || !mobileViewport.matches || !menuMotion.expanded) return;
  event.preventDefault();
  closeMenu().then(completed => {
    // Let native anchor navigation run after the header reaches its closed size.
    if (completed && !menuMotion.expanded) link.click();
  });
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
mobileViewport.addEventListener('change', () => menuMotion.setExpanded(!mobileViewport.matches, { immediate: true }));
if ('ResizeObserver' in window) {
  new ResizeObserver(updateHeaderOffset).observe(header);
} else {
  window.addEventListener('resize', updateHeaderOffset);
}

document.querySelectorAll('.animated-details').forEach(details => {
  const summary = details.querySelector(':scope > summary');
  const content = details.querySelector(':scope > .disclosure-content');
  let expanded = details.open;
  let animation = null;

  // Keep native details as the fallback, and animate only its content panel.
  function finish() {
    const previous = animation;
    animation = null;
    if (previous) {
      previous.onfinish = null;
      previous.cancel();
    }
    details.open = expanded;
    summary.setAttribute('aria-expanded', String(expanded));
    details.classList.remove('is-closing');
    content.style.removeProperty('overflow');
    content.inert = false;
  }

  summary.addEventListener('click', event => {
    event.preventDefault();
    const height = details.open ? content.getBoundingClientRect().height : 0;
    const opacity = details.open ? Number.parseFloat(getComputedStyle(content).opacity) : 0;
    expanded = !expanded;
    if (animation) {
      animation.onfinish = null;
      animation.cancel();
      animation = null;
    }
    summary.setAttribute('aria-expanded', String(expanded));
    if (reducedMotion.matches || !content.animate) {
      finish();
      return;
    }

    details.open = true;
    details.classList.toggle('is-closing', !expanded);
    content.inert = !expanded;
    content.style.overflow = 'hidden';
    animation = content.animate([
      { height: `${height}px`, opacity },
      { height: `${expanded ? content.scrollHeight : 0}px`, opacity: expanded ? 1 : 0 }
    ], { duration: 280, easing: 'cubic-bezier(.2, .8, .2, 1)', fill: 'both' });
    animation.onfinish = finish;
  });

  details.addEventListener('toggle', () => {
    if (!animation) {
      expanded = details.open;
      summary.setAttribute('aria-expanded', String(expanded));
    }
  });
  window.addEventListener('resize', () => {
    if (animation) finish();
  });
  reducedMotion.addEventListener('change', () => {
    if (animation) finish();
  });
});

const previousPositions = document.getElementById('previous-positions');
const experienceButton = document.getElementById('showMore');
experienceButton.hidden = false;
const previousMotion = createCollapsible(previousPositions, {
  reducedMotion,
  duration: 280,
  onBeforeHide: () => experienceButton.focus(),
  onChange: expanded => {
    experienceButton.setAttribute('aria-expanded', String(expanded));
    experienceButton.innerHTML = expanded
      ? 'Hide previous positions <span aria-hidden="true">−</span>'
      : 'Show previous positions <span aria-hidden="true">+</span>';
  }
});
experienceButton.addEventListener('click', async () => {
  const expanded = !previousMotion.expanded;
  const completed = await previousMotion.setExpanded(expanded);
  if (completed && !expanded) experienceButton.scrollIntoView({ block: 'nearest' });
});

const navLinks = [...navigation.querySelectorAll('a')];
const sections = [...document.querySelectorAll('main > section[id]')];
let navigationFrame = null;

function updateActiveNavigation() {
  const marker = header.getBoundingClientRect().bottom + 48;
  let current = sections[0];
  sections.forEach(section => {
    if (section.getBoundingClientRect().top <= marker) current = section;
  });
  navLinks.forEach(link => {
    if (current && link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

function scheduleNavigationUpdate() {
  if (navigationFrame !== null) return;
  navigationFrame = window.requestAnimationFrame(() => {
    navigationFrame = null;
    updateActiveNavigation();
  });
}

window.addEventListener('scroll', scheduleNavigationUpdate, { passive: true });
window.addEventListener('resize', scheduleNavigationUpdate);
updateActiveNavigation();
revealSections(document.querySelectorAll('main > .content-section'), reducedMotion);

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitButton = contactForm.querySelector('button[type="submit"]');
const idleButtonContent = submitButton.innerHTML;

function showStatus(message, state) {
  formStatus.textContent = message;
  formStatus.dataset.state = state;
}

contactForm.addEventListener('submit', async event => {
  event.preventDefault();
  if (submitButton.disabled || !contactForm.reportValidity()) return;
  submitButton.disabled = true;
  contactForm.setAttribute('aria-busy', 'true');
  submitButton.textContent = 'Sending…';
  showStatus('Sending your message…', 'sending');
  try {
    if (!window.emailjs) throw new Error('Email service unavailable');
    window.emailjs.init(config.EMAILJS_PUBLIC_KEY);
    await window.emailjs.send(config.EMAILJS_SERVICE_ID, config.EMAILJS_TEMPLATE_ID, {
      from_name: contactForm.elements.from_name.value.trim(),
      from_email: contactForm.elements.from_email.value.trim(),
      subject: contactForm.elements.subject.value.trim(),
      message: contactForm.elements.message.value.trim(),
      to_email: 'cibofdev@gmail.com'
    });
    showStatus('Thank you! Your message is on its way. I’ll get back to you soon.', 'success');
    contactForm.reset();
  } catch {
    showStatus('Your message could not be sent. Please try again or email cibofdev@gmail.com directly.', 'error');
  } finally {
    submitButton.disabled = false;
    contactForm.removeAttribute('aria-busy');
    submitButton.innerHTML = idleButtonContent;
  }
});
