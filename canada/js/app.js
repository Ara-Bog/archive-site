// Мобильное меню d4659be4-efa9-417b-9408-6a3f25847519
$('.burger, .cross').click(function(){
    $('.menu_content').toggleClass('menu_content__open');
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

// drop-list mobil
if ($(window).outerWidth() < '1101') {
    $('.menu__link_programm').click(function(){
        $('.programm__wrap').toggleClass('drop-list__active');
        $('.menu__link_programm').toggleClass('drop-list__arrow');
    })
}

// racall
var mySwiper = new Swiper ('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 3,
    centeredSlides: true,
    freeMode: true,
    autoHeight: false,
    freeModeMomentum: false,
    spaceBetween: 30,

    breakpoints: {
        300: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        600: {
          slidesPerView: 1.5,
          spaceBetween: 20
        },
        900: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1100: {
          slidesPerView: 2.5,
          spaceBetween: 30
        }
      },
});


// Маска для поля с телефоном
$(function(){
    $("#phone").mask("+7 (999) 999-99-99");
});

// Открытие окна для заявки на звонок
$('.order, .visa').click(function () {
    if ('.order') {
        $('.modal_order').css({'display' : 'flex'});
        $('.modal_visa').css({'display' : 'none'});
        $('.modal, .modal_order').addClass('modal__active');
    } else if ('.visa') {
        $('.modal_visa').css({'display' : 'flex'});
        $('.modal_order').css({'display' : 'none'});
        $('.modal, .modal_order').addClass('modal__active');
    }
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