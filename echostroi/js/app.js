// Мобильное меню
$('.burger, .cross').click(function(){
    $('.menu__content').toggleClass('menu__content__open');
    if ($(this).hasClass('burger')) {
        $(this).addClass('cross');
        $(this).removeClass('burger');
        $('body').css({'overflow' : 'hidden'});
    } else {
        $(this).addClass('burger');
        $(this).removeClass('cross');
        $('body').css({'overflow' : 'auto'});
    }
})

// Маска для поля с телефоном
$(function(){
    $("#phone").mask("+7 (999) 999-99-99");
});

// основной swaper
var mySwiper = new Swiper ('.swiper-container-main', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
});

// дополнительный swaper
var mySwiper = new Swiper ('.slider-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 2.4,
    centeredSlides: false,
    freeMode: true,
    autoHeight: false,
    freeModeMomentum: false,
    spaceBetween: 60,

    breakpoints: {
        300: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        600: {
          slidesPerView: 1.5,
          spaceBetween: 20
        },
        800: {
          slidesPerView: 2,
          spaceBetween: 30
        },
        1160: {
          slidesPerView: 2.4,
          spaceBetween: 60
        }
      },
});

// полный размер картинки слайдер
$('.slider-img-fullscreen').click(function () {
    var fs = $(this).prev().attr('src');
    $('.modal_img').css({'display' : 'flex'});
    $('.modal_order').css({'display' : 'none'});
    $('.modal, .modal_img').addClass('modal__active');
    $('body').css({'overflow' : 'hidden'});
    $('.modal_img > img').attr("src", fs)
})
// Открытие окна для заявки на звонок
$('.order').click(function () {
    $('.modal_order').css({'display' : 'flex'});
    $('.modal_img').css({'display' : 'none'});
    $('.modal, .modal_order').addClass('modal__active');
    $('body').css({'overflow' : 'hidden'});
})
// Закрытие модальных окон
$('.shadow, .modal__cross > img').click(function () {
    $('.modal, .modal_order, .modal_img').removeClass('modal__active');
    $('body').css({'overflow' : 'visible'});
})
// Переменные для яндекс карты
var myMap,
	map_pointer;