window.addEventListener('load', () => {
    // showSubMenu();
    toggleMobileMenu();
    toggleMobileSubMenu();
    showSearchScreen();
    hideSearchScreen();
    showMapPopup();
    hideMapPopup();
    showSubscriptionPopup();
    hideSubscriptionPopup();
    hideCookieNotification();
    togglePostBody();
    // initSliders();
    // initOwlSliders();
    initSlickSliders();

    // плавный скролл
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// ввиду особенностей позиционирования элементов и структуры шапки,
// обработка ховера по пункту основного меню и отображение выпадающего меню,
// производится в отдельной функции

// Показать/спрятать главное меню в мобке
function toggleMobileMenu() {

        $('.menu-button').click(function(e) {
            if (window.innerWidth < 768) {
                $('.menu-button i').toggleClass('fa-times');
                $('header').toggleClass('opened');
                $('body').toggleClass('overflowed');
                $('.bottom-line').slideToggle().clearQueue();
            }
        });

    let header = document.body.querySelector('.header');
    var lastScrollTop = 0;

    window.addEventListener("scroll", function(){
        var st = window.pageYOffset || document.documentElement.scrollTop;
        if (window.innerWidth < 768) {
            if (st > lastScrollTop) {
                if (!$('.mobile-menu').hasClass('opened')) {
                    header.classList.remove('show');
                }
            } else {
                header.classList.add('show');
            }
            lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
        }
    }, false);
}

// Показать/спрятать выпадающее меню в главном меню в мобке
function toggleMobileSubMenu() {
    $('.menu-item.expand').click(function(e) {
        if (window.innerWidth < 768) {
            e.stopPropagation();
            e.preventDefault();
            $(this).children('.sub-menu-wrapper').slideToggle().clearQueue();
            $(this).toggleClass('opened');
        }
    });
}

// переключение между типами тела статьи
function togglePostBody() {
    $('.lecture-btns .lecture-type a').click(function (e) {
        e.preventDefault();
        $('.changing-body').css('display', 'none');
        $('.lecture-btns .lecture-type a').removeClass('active');
        $(this).addClass('active');
        let targ = $(this).attr('data-target');
        $(`.${targ}`).css('display', 'block')
    })
}

//Показать экран поиска
function showSearchScreen() {
    let searchBtn = document.body.querySelectorAll('.search-btn');
    let searchScreen = document.body.querySelector('.search-screen');
    if(searchBtn.length) {
        searchBtn.forEach(btn => {
            btn.addEventListener('click', () => {
                document.body.classList.add('overflowed');
                searchScreen.classList.add('active', "animate__fadeIn")
                searchScreen.querySelector('.search-field').focus();
            })
        })
    }
}

// Спрятать экран поиска
function hideSearchScreen() {
    let closeBtn = document.body.querySelectorAll('.close-search-screen');
    let searchScreen = document.body.querySelector('.search-screen');

    let removeActiveClass = () => {
        document.body.classList.remove('overflowed');
        searchScreen.classList.remove("active", "animate__fadeOut");
        // searchScreen.removeEventListener('animationend', removeActiveClass)
    };

    if(closeBtn.length) {

        closeBtn.forEach(btn => {
            btn.addEventListener('click', () => {
                searchScreen.classList.remove("animate__fadeIn");
                searchScreen.classList.add("animate__fadeOut");
                searchScreen.addEventListener('animationend', removeActiveClass, {once: true});
            })
        });
    }
}

function showSubscriptionPopup() {
    let subscriptionBtn = document.body.querySelectorAll('.mailing-btn');
    let subscriptionPopup = document.body.querySelector('.subscribe-block.popup');
    if(subscriptionBtn.length) {
        subscriptionBtn.forEach(btn => {
            btn.addEventListener('click', () => {
                document.body.classList.add('overflowed');
                subscriptionPopup.classList.add('opened', "animate__fadeIn");
                subscriptionPopup.querySelector('.popup-wrapper').classList.add('animate__fadeInDown')
            })
        })
    }
}

function hideSubscriptionPopup() {
    let closeBtn = document.body.querySelectorAll('.subscribe-block.popup .close-popup');
    let subscriptionPopup = document.body.querySelector('.subscribe-block.popup');

    let removeActiveClass = () => {
        document.body.classList.remove('overflowed');
        subscriptionPopup.classList.remove("opened", "animate__fadeOut");
        // searchScreen.removeEventListener('animationend', removeActiveClass)
    };

    if(closeBtn.length) {

        closeBtn.forEach(btn => {
            btn.addEventListener('click', () => {
                subscriptionPopup.classList.remove("animate__fadeIn");
                subscriptionPopup.classList.add("animate__fadeOut");
                subscriptionPopup.addEventListener('animationend', removeActiveClass, {once: true});
            })
        });
    }
}


function showMapPopup() {
    let mapBtn = document.body.querySelectorAll('.map-btn');
    let mapPopup = document.body.querySelector('.map-block.popup');
    if(mapBtn.length) {
        mapBtn.forEach(btn => {
            btn.addEventListener('click', (event) => {
                event.preventDefault();
                document.body.classList.add('overflowed');
                mapPopup.classList.add('opened', "animate__fadeIn");
                mapPopup.querySelector('.popup-wrapper').classList.add('animate__fadeInDown')
            })
        })
    }
}

function hideMapPopup() {
    let closeBtn = document.body.querySelectorAll('.map-block.popup .close-popup');
    let mapPopup = document.body.querySelector('.map-block.popup');

    let removeActiveClass = () => {
        document.body.classList.remove('overflowed');
        mapPopup.classList.remove("opened", "animate__fadeOut");
        // searchScreen.removeEventListener('animationend', removeActiveClass)
    };

    if(closeBtn.length) {

        closeBtn.forEach(btn => {
            btn.addEventListener('click', () => {
                mapPopup.classList.remove("animate__fadeIn");
                mapPopup.classList.add("animate__fadeOut");
                mapPopup.addEventListener('animationend', removeActiveClass, {once: true});
            })
        });
    }
}

// Спрятать уведомление о куках
function hideCookieNotification() {
    let closeBtn = document.body.querySelectorAll('.accept-cookie');
    let notification = document.body.querySelector('.cookie-notification');

    let disableNotification = () => {
        notification.classList.add("disabled");
        // searchScreen.removeEventListener('animationend', removeActiveClass)
    };

    if(closeBtn.length) {
        closeBtn.forEach(btn => {
            btn.addEventListener('click', () => {
                notification.classList.add("animate__fadeOutDown");
                notification.addEventListener('animationend', disableNotification, {once: true});
            })
        });
    }
}

function initSlickSliders() {
    $('.events-slider').slick({
        dots: true,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        variableWidth: false,
        edgeFriction: 0.1,
        touchThreshold: 10,
        swipeToSlide: true,
        // centerMode: true,
        // centerPadding: 50,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                    variableWidth: true,
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

    $('.compilation-slider').slick({
        dots: true,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        variableWidth: false,
        edgeFriction: 0.1,
        touchThreshold: 10,
        swipeToSlide: true,
        // centerMode: true,
        // centerPadding: 50,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                    variableWidth: true,
                }
            },
            {
                breakpoint: 420,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                    variableWidth: false,
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
}