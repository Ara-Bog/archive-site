// Мобильное меню
$('.burger, .cross').click(function(){
    $('.navigation').toggleClass('navigation__open');
    if ($(this).hasClass('burger')) {
        $(this).addClass('cross');
        $(this).removeClass('burger');
        $('.navigation__catalog').removeClass('navigation__catalog_active') 
        $('body').css({'overflow' : 'hidden'});
    } else {
        $(this).addClass('burger');
        $(this).removeClass('cross');
        $('.navigation__catalog_block').removeClass('navigation__catalog_block__open')
        $('body').css({'overflow' : 'auto'});
    }
})

$('.basket').click(function(){
    $('.modal').addClass('modal__active')
    $('body').css({'overflow' : 'hidden'});
})
// Маска для поля с телефоном
$(function(){
    $("#phone").mask("+7 (999) 999-99-99");
});

$('.order__submit').click(function(){
    if ($('order').hasClass('order__open')) {

    } else {
        $('.order').addClass('order__open')
    }
})

// Открытие формы для брони
$('.reservation_button').click(function () {
	event.preventDefault();
    $('.modal_reservation').addClass('modal__active');
    $('body').css({'overflow' : 'hidden'});
})
// Открытие окна для заявки на звонок
$('.reserv_call').click(function () {
    $('.modal_order').addClass('modal__active');
    $('body').css({'overflow' : 'hidden'});
})
// Закрытие модальных окон
$('.shadow, .cross_modal').click(function () {
    $('.modal_reservation, .modal_order').removeClass('modal__active')
    $('body').css({'overflow' : 'visible'});
})
// Переменные для яндекс карты
var myMap,
	map_pointer;