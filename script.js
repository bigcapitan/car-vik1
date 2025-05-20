document.addEventListener('DOMContentLoaded', () => {
    // Слайдер
    const sliderWrapper = document.querySelector('.slider__wrapper');
    const sliderItems = document.querySelectorAll('.slider__item');
    const prevButton = document.querySelector('.slider__arrow--prev');
    const nextButton = document.querySelector('.slider__arrow--next');
    let currentIndex = 0;
    const totalSlides = sliderItems.length;

    const updateSliderPosition = () => {
        const offset = -currentIndex * 100;
        sliderWrapper.style.transform = `translateX(${offset}%)`;
    };

    if (prevButton && nextButton && sliderItems.length) {
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSliderPosition();
        });

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSliderPosition();
        });
    }

    // Галерея "Показать ещё"
    const toggleBtn = document.getElementById('toggle-gallery');
    const hiddenImages = document.querySelectorAll('.gallery img.hidden');
    if (toggleBtn && hiddenImages.length > 0) {
        toggleBtn.addEventListener('click', () => {
            const isHidden = hiddenImages[0].classList.contains('hidden');
            hiddenImages.forEach(img => {
                img.classList.toggle('hidden');
            });
            toggleBtn.textContent = isHidden ? 'Скрыть' : 'Показать ещё';
        });
    }

    // Блокировка формы отзывов после отправки
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const inputs = reviewForm.querySelectorAll('input, textarea, button');
            inputs.forEach(el => el.disabled = true);
        });
    }

    // --- Реализация светлой темы с нужными ховерами ---
    function addUnderline(e) {
        e.target.style.textDecoration = "underline";
        e.target.style.textDecorationColor = "#000";
        e.target.style.textUnderlineOffset = "4px";
        e.target.style.color = "#000";
    }
    function removeUnderline(e) {
        e.target.style.textDecoration = "";
        e.target.style.textDecorationColor = "";
        e.target.style.textUnderlineOffset = "";
        e.target.style.color = "#000";
    }

    function specsLiHover(e) {
        e.target.style.background = "#1fa143";
    }
    function specsLiUnhover(e) {
        e.target.style.background = "";
    }

    // --- Переключение темы ---
    const iconBtn = document.getElementById('iconToggleBtn');
    const iconImg = document.getElementById('toggleIcon');
    let isGreen = false;

    if (iconBtn && iconImg) {
        iconBtn.addEventListener('click', () => {
            const body = document.body;
            const pList = document.querySelectorAll('p');
            const startSection = document.querySelector('#start');
            const allSections = document.querySelectorAll('section');
            const header = document.querySelector('header');
            const footer = document.querySelector('.footer');
            const buttons = document.querySelectorAll('button, .more-btn, #toggle-gallery, #review-form button');
            const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
            const menuLinks = document.querySelectorAll('.menu ul li a, .footer__links a, .footer__social a');
            const specsLis = document.querySelectorAll('#specs ul li');
            const commentTexts = document.querySelectorAll('.comment-text');

            if (!isGreen) {
                // Фон body
                body.style.background = "linear-gradient(218deg,rgba(102,255,0,1) 0%, rgba(255,255,255,1) 100%)";
                // Все p черные
                pList.forEach(p => p.style.color = "#000");
                // Фон секции старт убираем
                if (startSection) {
                    startSection.style.background = "none";
                    startSection.style.boxShadow = "none";
                    startSection.style.borderRadius = "0";
                }
                // Фон остальных секций
                allSections.forEach(sec => {
                    if (sec.id !== "start") {
                        sec.style.background = "#26de5ab5";
                        sec.style.borderRadius = "20px";
                        sec.style.boxShadow = "0 4px 16px rgba(0,0,0,0.10)";
                    }
                });
                // Хедер и футер
                if (header) header.style.background = "#26de5ab5";
                if (footer) footer.style.background = "#26de5ab5";
                // Кнопки
                buttons.forEach(btn => {
                    btn.style.background = "#26de5a";
                    btn.style.color = "#fff";
                    btn.addEventListener('mouseenter', greenHover);
                    btn.addEventListener('mouseleave', greenUnhover);
                });
                // Все заголовки зелёные
                headings.forEach(h => h.style.color = "#00631c");
                // Все .comment-text черные
                commentTexts.forEach(el => el.style.color = "#000");
                // Ссылки всегда черные, ховер — только подчёркивание
                menuLinks.forEach(link => {
                    link.style.color = "#000";
                    link.addEventListener('mouseenter', addUnderline);
                    link.addEventListener('mouseleave', removeUnderline);
                });
                // li в specs всегда черные в светлой теме
                specsLis.forEach(li => {
                    li.style.color = "#000";
                    li.addEventListener('mouseenter', specsLiHover);
                    li.addEventListener('mouseleave', specsLiUnhover);
                });
                // Меняем иконку
                iconImg.src = './img/free-icon-half-moon-6643017.png';
                isGreen = true;
            } else {
                // Возврат к стандартным стилям
                body.style.background = "";
                pList.forEach(p => p.style.color = "");
                if (startSection) {
                    startSection.style.background = "";
                    startSection.style.boxShadow = "";
                    startSection.style.borderRadius = "";
                }
                allSections.forEach(sec => {
                    if (sec.id !== "start") {
                        sec.style.background = "";
                        sec.style.borderRadius = "";
                        sec.style.boxShadow = "";
                    }
                });
                if (header) header.style.background = "";
                if (footer) footer.style.background = "";
                buttons.forEach(btn => {
                    btn.style.background = "";
                    btn.style.color = "";
                    btn.removeEventListener('mouseenter', greenHover);
                    btn.removeEventListener('mouseleave', greenUnhover);
                });
                headings.forEach(h => h.style.color = "");
                commentTexts.forEach(el => el.style.color = "");
                menuLinks.forEach(link => {
                    link.removeEventListener('mouseenter', addUnderline);
                    link.removeEventListener('mouseleave', removeUnderline);
                    link.style.textDecoration = "";
                    link.style.textDecorationColor = "";
                    link.style.textUnderlineOffset = "";
                    link.style.color = "";
                });
                specsLis.forEach(li => {
                    li.removeEventListener('mouseenter', specsLiHover);
                    li.removeEventListener('mouseleave', specsLiUnhover);
                    li.style.background = "";
                    li.style.color = "";
                });
                iconImg.src = './img/icons8-солнце-50.png';
                isGreen = false;
            }
        });
    }

    // Ховеры для кнопок (зелёная тема)
    function greenHover(e) {
        e.target.style.background = "#00d13b";
        e.target.style.color = "#fff";
    }
    function greenUnhover(e) {
        e.target.style.background = "#26de5a";
        e.target.style.color = "#fff";
    }
});