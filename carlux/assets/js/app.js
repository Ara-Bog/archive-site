// ползунок фильтра цен
$( function() {
  $( "#filter-price" ).slider({
    range: true,
    min: 1500,
    max: 50000,
    values: [ 1500, 50000 ],
    slide: function( event, ui ) {
      $('.catalog_filter_row__content #price_upto').val(ui.values[1])
      $('.catalog_filter_row__content #price_from').val(ui.values[0])
    }
  });
  $('.catalog_filter_row__content #price_upto').val($( "#filter-price" ).slider( "values", 1 ))
  $('.catalog_filter_row__content #price_from').val($( "#filter-price" ).slider( "values", 0 ))
} );

// выпадающие блоки фильтр
$('.catalog_filter_row__label').click(function(){
  if ($(this).parent().hasClass('vision-block')){
    $(this).parent().removeClass('vision-block')
    $(this).siblings('.catalog_filter_row__content').toggle(300, 'linear');
  } else {
    $(this).parent().addClass('vision-block')
    $(this).siblings('.catalog_filter_row__content').slideToggle(300, 'linear');
  }
})

// Swiper страница товара
if ($(window).width() > 800) {
  var countEl = $('.pictThumbs .swiper-wrapper').children('.swiper-slide').length 
  $('.pictThumbs ').css({'width':countEl * 115 - 15})
  var swiperThumbs = new Swiper(".pictThumbs", {
    spaceBetween: 15,
    slidesPerView: 'auto',
    watchSlidesProgress: true,
  });
}
var swiperPict = new Swiper(".mainPict", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".product_wrap__pictures_nav .swiper-pagination"
  },
  breakpoints: {
    800: {
      pagination: false,
    }
  },
  thumbs: {
    swiper: swiperThumbs,
  },
});

// Swiper главная популярные категории
if ($(window).width() > 900) {
  var popCat = new Swiper(".popular-cat_wrap_items .swiper", {
    slidesPerView: 6,
    spaceBetween: 16,
    breakpoints: {
      // when window width is >= 900px
      900: {
        slidesPerView: 4
      },
      // when window width is >= 1500px
      1500: {
        slidesPerView: 6,
        spaceBetween: 16
      }
    },
    navigation: {
      nextEl: ".popular-cat_wrap_items .swiper-button-next",
      prevEl: ".popular-cat_wrap_items .swiper-button-prev",
    },
  });
}

// Swiper главная новости
var time_to_switch = 4000; // Время для смены слайда
var tick;
var valueCircle;
var progressBar = $('.main-sign_wrap__swiper_nav_wrap #circle_next');
var progressBarBack = $('.main-sign_wrap__swiper_nav_wrap #circle_prev');
var banner = new Swiper(".main-sign_wrap__swiper .swiper", {
  navigation: {
    nextEl: ".main-sign_wrap__swiper .swiper-button-next",
    prevEl: ".main-sign_wrap__swiper .swiper-button-prev",
  },
  loop: true,
  autoplay: {
    delay: time_to_switch,
    disableOnInteraction: false,
  },
  on: {
    slideChangeTransitionEnd: function() {
    valueCircle = 0;
    progressBarBack.children('#progress').attr({
      'stroke-dasharray':'0, 314'
    });
    clearInterval(tick)
    updateSwiperProgressBar(this, valueCircle)
  },
  },
});
// заполнение круга Swiper главная новости
function updateSwiperProgressBar(swiper, valueCircle) {
	function startProgressBar() {
		resetProgressBar();
		tick = setInterval(progress, time_to_switch/314);
	}
	function progress() {
    valueCircle++;
		if (swiper.autoplay.running && !swiper.autoplay.paused) {
      progressBar.children('#progress').attr({
        'stroke-dasharray':valueCircle+', '+(314 - valueCircle)
      })
		}
		if (swiper.autoplay.paused) {
      resetProgressBar();
		}
	}
	function resetProgressBar() {
		valueCircle = 0;
    progressBar.children('#progress').attr({
      'stroke-dasharray':'0, 314'
    })
	}
	startProgressBar();
};
// заполнение круга назад Swiper главная новости
$('.swiper-button-prev').click(function(){
  progressBar.children('#progress').attr({
    'stroke-dasharray':'0, 314'
  });
  progressBarBack.children('#progress').attr({
    'stroke-dasharray':'314, 0'
  });
});

// отображение подробностей товара
if ($('.product_wrap__description-spec__content').children().length > 12) {
  $('.product_wrap__description-spec__more').removeClass('spec__more--hidden');
}
$('.product_wrap__description-spec__more').click(function(){
  if ($(this).hasClass('spec__more--active')){
    $(this).removeClass('spec__more--active');
    $('.product_wrap__description-spec__content').removeClass('spec__content--show_all');
  } else {
    $(this).addClass('spec__more--active');
    $('.product_wrap__description-spec__content').addClass('spec__content--show_all');
  }
})

// кнопки для авторизации
$('a[data-on_modal]').click(function() {
  var blockActivate = $(this).attr('data-on_modal');
  $('.on_modal__wrap').removeClass().addClass('on_modal__wrap on_modal__wrap--' + blockActivate);
  if (blockActivate == 'recovery' || blockActivate == 'registration') {
    $('.on_modal__wrap').addClass('on_modal__wrap--back')
  }
})

// кнопки для профиля
$('a[data-profile_link]').click(function() {
  var blockActivate = $(this).attr('data-profile_link');
  $('.profile__nav_link--active').removeClass('profile__nav_link--active')
  $('.profile__content').removeClass().addClass('profile__content profile__content--' + blockActivate);
  $(this).parent().addClass('profile__nav_link--active')
})

// кнопки для контактов
$('div[data-contact_map]').click(function() {
  var blockActivate = $(this).attr('data-contact_map');
  $('.contact-item--active').removeClass('contact-item--active')
  $(this).addClass('contact-item--active')
  $('.contacts_wrap__map').removeClass().addClass('contacts_wrap__map contacts_wrap__map--' + blockActivate);
})

// call modal
$('a[class*="modal"]').click(function() {
	var modal = $('#' + $(this).attr("class").split(' ').filter(nameClass => nameClass.indexOf('modal') !== -1)[0])
	modal.addClass('active-modal')
	if (modal.hasClass('modal-full')){
		$('body').css({'overflow' : 'hidden'})
	}
})

// close modal
$('.shadow, .close-modal').click(function () {
	if ($(this).hasClass("shadow")) {
		hideaAllChildModal($(this).parent())
		$(this).parent().removeClass('active-modal')
	} else {
		var modal = $('#' + "modal-" + $(this).parents('.modal_wrap > div').attr("class"))
		hideaAllChildModal($(modal))
		$(modal).removeClass('active-modal')
	}
    $('body').css({'overflow' : 'visible'});
})

// close sub-modal
$('[class*=close-modal--] > *').click(function () {
	var blockName = $(this).parent().attr("class").split(' ').filter(nameClass => nameClass.indexOf('close-modal') !== -1)[0].split('--')[1]
	var modal = $('#' + "modal-" + blockName)
	$(modal).removeClass('active-modal')
	$(this).parents('.modal').removeClass('active-modal')
	$('.active-' + blockName).removeClass('active-' + blockName)
	$(this).addClass('active-' + blockName)
  $('body').css({'overflow' : 'visible'});
})

// запуск меню
$('a[id*=menu-]').click(function() {
	$('body').css({'overflow' : 'hidden'})
  var calledName = $(this).attr('id')
	$('.' + calledName + '--active').parents('body').css({'overflow' : 'visible'})
	$('.' + calledName).toggleClass(calledName + '--active')
  console.log(calledName)
  if (calledName == 'menu-categories') {
    $('.' + calledName + '--title').text('Меню')
    $($('.sub-menu')[0]).addClass('sub-menu--active')
  }
})

// мобильное меню навигации, закрытие 
$('[id*=-cross]').click(function() {
	$('body').css({'overflow' : 'visible'})
  var parentName = $(this).attr('id').split('--')[0]
	$('.' + parentName).removeClass(parentName + '--active') 
  $('.sub-menu--active').removeClass('sub-menu--active')
  $('#menu-back').css({'display':'none'})
})

// закрытие модалки из другого места
function hideaAllChildModal(parent) {
	parent.find('.modal').removeClass('active-modal')
}

// пренос страница товара
if ($(window).width() <= 1200) {
  $('.product_wrap__description h2').prependTo('.product_wrap')
}
// мобилка, перенос блоков
if ($(window).width() <= 1000) {
  // навигация
  $('.header_wrap__nav #menu-categories').text('')
  $('.curtain_wrap__local').prependTo('.header_wrap')
  $('.curtain_wrap__nav_wrap a').appendTo('.menu-categories_wrap__content_wrap')
  $('.header_wrap__profile__account.login--enter').appendTo('.menu-categories_wrap__footer .login--enter .button_regular')
  $('.header_wrap__profile__account.login--profile').prependTo('.menu-categories_wrap__footer .login--profile')
  // каталог
  $('.filter-reset').appendTo('.menu-filter-buttons')
}
if ($(window).width() <= 800) {
  // кнопка выйти в профиле, перенос и смена текста
  $('.on_modal__wrap h2').after($('.profile__nav_link-exit'))
  $('.profile__nav_link-exit a').text('Выйти')
  // корзина, переносы
  $('.basket__pickup > *').prependTo('.basket-mobile-pickup')
  $('.basket__delivery > *').prependTo('.basket-mobile-delivery')
  $('.basket__pickup__list > h4').prependTo('.basket__pickup')
  $('.basket__delivery__list > h4').prependTo('.basket__delivery')
  $('.basket__pickup, .basket__delivery').prependTo('.basket-mobile__nav')
  // корзина, переход между самовывоз и доставкой
  $('.basket__pickup, .basket__delivery').click(function() {
    var nameBlock = $(this).attr('class').split('__')[1]
    $('.basket-mobile__content > div').animate({opacity:'0'}, 0, "linear")
    $('.basket-mobile').attr('class', 'basket-mobile basket-mobile--active-' + nameBlock)
    $('.basket-mobile__content > [class*=' + nameBlock + ']').animate({opacity:'1'}, 300, "linear")
  })
}
// мобилка, удаление текста в навигации. можно перенести сразу в $(window).width() <= 1000
if ($(window).width() <= 600) {
  $('.curtain_wrap__local p').text('')
  $('.header_wrap__profile__basket p').text('')
}

// Оформление заказа, изменение типа оплаты 
$('.ordering-data__payment_wrap [class*=type--]').not('.ordering-data__payment_item--disabled').click(function() {
  var nameBlock = $(this).attr('class').split(' ')[1]
  // меняем невидимый checkbox
  if(nameBlock == 'type--online') {
    $('.ordering-data__payment_wrap input').prop('checked', false)
  } else {
    $('.ordering-data__payment_wrap input').prop('checked', true)
  }
  $('.ordering-data__payment_wrap').attr('class', 'ordering-data__payment_wrap payment_' + nameBlock)
})

// мобильное меню, переход по категориям
$('.menu-categories_wrap__content span').click(function() {
  $('.menu-categories--title').text($(this).text())
  $(this).parents('.sub-menu')[0].scrollTop = 0
  $(this).siblings('.sub-menu').addClass('sub-menu--active')
  $('#menu-back').css({'display':'flex'})
  if ($('.sub-menu--active').length > 1) {
    $($('.sub-menu--active')[$('.sub-menu--active').length - 2]).css({'overflow-y':'hidden'})
  }
})

// мобильное меню, переход назад
$('#menu-back').click(function() {
  $($('.sub-menu--active')[$('.sub-menu--active').length - 1]).removeClass('sub-menu--active')
  if ($('.sub-menu--active').length == 2) {
    $('.menu-categories--title').text('Каталог')
    $($('.sub-menu--active')[1]).css({'overflow-y':'auto'})
  } else {
    $('.menu-categories--title').text('Меню')
    $('#menu-back').css({'display':'none'})
    $('.sub-menu--active').css({'overflow-y':'auto'})
  }
})

// эффект затухания фильтра
$('.menu-filter_wrap').scroll(function() {
  if (this.scrollHeight - this.scrollTop === this.clientHeight) {
    $(this).removeClass('menu-filter_wrap--shadow')
  } else {
    $(this).addClass('menu-filter_wrap--shadow')
  }
})

// подсказки в корзине
$('.basket--acitvate-notice').hover(function() {
  $(this).parent().parent().children('.basket-order__services__item-notice').addClass('basket-order__services__item-notice--active')
}, function() {
  $(this).parent().parent().children('.basket-order__services__item-notice').removeClass('basket-order__services__item-notice--active')
})

// костыль для удаление popup в iframe (не работает, нужно отследить загрузку iframe)
// function checkLoad() {
//   console.log($(this))
//   console.log($(this).ownerDocument)
//   var zz = $(this).ownerDocument;
//   console.log(zz)
//   var kk = zz.documentElement.getElementsByClassName('popup');
//   console.log(kk)
//   zz.body.removeChild(kk[0]);
// }