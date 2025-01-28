import anime from './anime.es.js';
import constants from './constants.js';

$(document).ready(_ => {
    console.log('Hello 🌍 from cibofdevs')
    let containerPositions = {};
    containerPositions[constants.INTRO_CONTAINER] = $(`#${constants.INTRO_CONTAINER}`).offset().top;
    containerPositions[constants.ABOUT_CONTAINER] = $(`#${constants.ABOUT_CONTAINER}`).offset().top;
    containerPositions[constants.EXPERIENCE_CONTAINER] = $(`#${constants.EXPERIENCE_CONTAINER}`).offset().top;

    let containerShown = {};
    let containerClass = {};
    containerClass[constants.INTRO_CONTAINER] = constants.ANIMATE_INTRO;
    containerClass[constants.ABOUT_CONTAINER] = constants.ANIMATE_ABOUT;
    containerClass[constants.EXPERIENCE_CONTAINER] = constants.ANIMATE_EXPERIENCE;

    function init() {
        initAnimations();
        initActionItems();

        $('#current-year').text(new Date().getFullYear());
    }

    function initAnimations() {
        for (const key of Object.keys(containerPositions)) {
            let currentPosition = window.pageYOffset + window.innerHeight;
            if (currentPosition > containerPositions[key]) {
                animate(key);
                containerShown[key] = true;
            }
        }

        $(window).scroll(_ => {
            for (const key of Object.keys(containerPositions)) {
                let currentPosition = window.pageYOffset + window.innerHeight;
                // if (key === constants.PROJECT_CONTAINER) console.log(currentPosition, containerPositions[key]);
                if (!containerShown[key] && currentPosition > containerPositions[key]) {
                    animate(key);
                    containerShown[key] = true;
                }
            }
        });
    }

    function initActionItems() {
        let ExperienceXL = $(`#${constants.EXPERIENCE_XL}`);
        let ExperienceALTO = $(`#${constants.EXPERIENCE_ALTO}`);
        let ExperienceTW = $(`#${constants.EXPERIENCE_TW}`);
        let ExperiencePO = $(`#${constants.EXPERIENCE_PO}`);

        let xlStory = $(`#${constants.XL_STORY}`);
        let altoStory = $(`#${constants.ALTO_STORY}`);
        let twStory = $(`#${constants.TW_STORY}`);
        let poStory = $(`#${constants.PO_STORY}`);

        ExperienceXL.click(() => {
            ExperienceALTO.removeClass(constants.SELECTED_STORY);
            ExperienceTW.removeClass(constants.SELECTED_STORY);
            ExperiencePO.removeClass(constants.SELECTED_STORY);
            ExperienceXL.addClass(constants.SELECTED_STORY);

            altoStory.removeClass(constants.ACTIVE_STORY);
            twStory.removeClass(constants.ACTIVE_STORY);
            poStory.removeClass(constants.ACTIVE_STORY);
            xlStory.addClass(constants.ACTIVE_STORY);
        });

        ExperienceALTO.click(() => {
            ExperienceXL.removeClass(constants.SELECTED_STORY);
            ExperienceTW.removeClass(constants.SELECTED_STORY);
            ExperiencePO.removeClass(constants.SELECTED_STORY);
            ExperienceALTO.addClass(constants.SELECTED_STORY);

            xlStory.removeClass(constants.ACTIVE_STORY);
            twStory.removeClass(constants.ACTIVE_STORY);
            poStory.removeClass(constants.ACTIVE_STORY);
            altoStory.addClass(constants.ACTIVE_STORY);
        });

        ExperienceTW.click(() => {
            ExperienceXL.removeClass(constants.SELECTED_STORY);
            ExperienceALTO.removeClass(constants.SELECTED_STORY);
            ExperiencePO.removeClass(constants.SELECTED_STORY);
            ExperienceTW.addClass(constants.SELECTED_STORY);

            xlStory.removeClass(constants.ACTIVE_STORY);
            altoStory.removeClass(constants.ACTIVE_STORY);
            poStory.removeClass(constants.ACTIVE_STORY);
            twStory.addClass(constants.ACTIVE_STORY);
        });

        ExperiencePO.click(() => {
            ExperienceXL.removeClass(constants.SELECTED_STORY);
            ExperienceALTO.removeClass(constants.SELECTED_STORY);
            ExperienceTW.removeClass(constants.SELECTED_STORY);
            ExperiencePO.addClass(constants.SELECTED_STORY);

            xlStory.removeClass(constants.ACTIVE_STORY);
            altoStory.removeClass(constants.ACTIVE_STORY);
            twStory.removeClass(constants.ACTIVE_STORY);
            poStory.addClass(constants.ACTIVE_STORY);
        });
    }

    function animate(key) {
        let animateObj = {
            targets: document.getElementsByClassName(containerClass[key]),
            opacity: 1,
            easing: 'linear',
            duration: 500,
            delay: anime.stagger(300, {start: 200})
        };

        if (key === constants.INTRO_CONTAINER) {
            animateObj['translateY'] = [25, 0];
            anime(animateObj);
        } else {
            anime(animateObj);
        }
    }

    init();
});