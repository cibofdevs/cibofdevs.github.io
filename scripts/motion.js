const easing = 'cubic-bezier(.2, .8, .2, 1)';

export function createCollapsible(panel, {
  expanded = false,
  duration = 280,
  reducedMotion,
  onChange = () => {},
  onFinish = () => {},
  onBeforeHide = () => {}
}) {
  let animation = null;
  let pending = null;
  let resolvePending = null;

  function cancel() {
    if (animation) {
      animation.onfinish = null;
      animation.cancel();
      animation = null;
    }
    if (resolvePending) resolvePending(false);
    resolvePending = null;
    pending = null;
  }

  function finish() {
    const resolve = resolvePending;
    resolvePending = null;
    cancel();
    panel.hidden = !expanded;
    panel.inert = !expanded;
    panel.style.removeProperty('overflow');
    onFinish(expanded);
    if (resolve) resolve(true);
  }

  function setExpanded(next, { immediate = false } = {}) {
    if (next === expanded && !immediate) return pending || Promise.resolve(true);
    const height = panel.hidden ? 0 : panel.getBoundingClientRect().height;
    const opacity = panel.hidden ? 0 : Number.parseFloat(getComputedStyle(panel).opacity);
    cancel();
    expanded = next;
    if (!expanded && panel.contains(document.activeElement)) onBeforeHide();
    onChange(expanded);
    panel.inert = !expanded;
    if (immediate || reducedMotion.matches || !panel.animate) {
      finish();
      return Promise.resolve(true);
    }

    panel.hidden = false;
    panel.style.overflow = 'hidden';
    pending = new Promise(resolve => { resolvePending = resolve; });
    animation = panel.animate([
      { height: `${height}px`, opacity },
      { height: `${expanded ? panel.scrollHeight : 0}px`, opacity: expanded ? 1 : 0 }
    ], { duration, easing, fill: 'both' });
    animation.onfinish = finish;
    return pending;
  }

  function settle() {
    if (animation) finish();
  }

  panel.hidden = !expanded;
  panel.inert = !expanded;
  onChange(expanded);
  onFinish(expanded);
  window.addEventListener('resize', settle);
  reducedMotion.addEventListener('change', settle);

  return { setExpanded, get expanded() { return expanded; } };
}

export function revealSections(sections, reducedMotion) {
  if (!('IntersectionObserver' in window)) return;
  const active = new Map();
  const seen = new WeakSet();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const section = entry.target;
      if (seen.has(section)) return;
      seen.add(section);
      observer.unobserve(section);
      const target = document.querySelector(':target');
      if (reducedMotion.matches || !section.animate || section.getBoundingClientRect().top < 0 ||
          section.contains(document.activeElement) || (target && section.contains(target))) return;

      const animation = section.animate([
        { opacity: 0, transform: 'translateY(10px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 360, easing, fill: 'both' });
      active.set(section, animation);
      const clear = () => {
        active.delete(section);
        animation.onfinish = null;
        animation.oncancel = null;
        animation.cancel();
      };
      animation.onfinish = clear;
      animation.oncancel = () => active.delete(section);
    });
  }, { rootMargin: '0px 0px -24px 0px', threshold: 0 });

  sections.forEach(section => observer.observe(section));
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) active.forEach(animation => animation.cancel());
  });
  document.addEventListener('focusin', () => {
    active.forEach((animation, section) => {
      if (section.contains(document.activeElement)) animation.cancel();
    });
  });
}
