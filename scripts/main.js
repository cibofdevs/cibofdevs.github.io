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
        let EexperienceXL = $(`#${constants.EXPERIENCE_XL}`);
        let EexperienceALTO = $(`#${constants.EXPERIENCE_ALTO}`);

        let xlStory = $(`#${constants.XL_STORY}`);
        let altoStory = $(`#${constants.ALTO_STORY}`);

        EexperienceXL.click(() => {
            EexperienceALTO.removeClass(constants.SELECTED_STORY);
            EexperienceXL.addClass(constants.SELECTED_STORY);

            altoStory.removeClass(constants.ACTIVE_STORY);
            xlStory.addClass(constants.ACTIVE_STORY);
        });

        EexperienceALTO.click(() => {
            EexperienceXL.removeClass(constants.SELECTED_STORY);
            EexperienceALTO.addClass(constants.SELECTED_STORY);

            xlStory.removeClass(constants.ACTIVE_STORY);
            altoStory.addClass(constants.ACTIVE_STORY);
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
