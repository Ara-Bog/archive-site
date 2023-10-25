$('.menu_link a, .main_page__button a, .footer_block__link a').on( 'click', function(){ 
    var el = $(this);
    var dest = el.attr('href');
    if(dest !== undefined && dest !== '') { 
        $('html').animate({ 
            scrollTop: $(dest).offset().top 
        }, 1000
        );
    }
    return false;
});

// Доступ к экземпляру объекта
$('#date_in').data('datepicker')

$(document).on('af_complete', function(event, response) {
    var fields = {
        name: "Имя",
        number: "Телефон",
        email: "Email",
        message: "Сообщение",
    };
    
    if (response.success) {
        
	var form = response.form;
	if (form.attr('id') == 'form-2') {
        $('.modal_reservation, .modal_order').removeClass('modal__active')
        $('body').css({'overflow' : 'visible'});
		
	} else if (form.attr('id') == 'form-1') {
        $('.modal_reservation, .modal_order').removeClass('modal__active')
        $('body').css({'overflow' : 'visible'});
	}
        
    } else {
        for (var prop in response.data) {
            AjaxForm.Message.error("Заполните поле '"+fields[prop]+"'");
        }
    }
});

// $('.main_page_block h1, .main_page__button, .main_page__link ').css({'opacity' : '1'});

// Мобильное меню
$('.sandwich').click(function () {
    $('.menu__content').css({'left' : '0', 'right' : '0'})
    $('body').css({'overflow' : 'hidden'});
})

$('.cross').click(function () {
    $('.menu__content').css({'left' : '100%', 'right' : '-100%'})
    $('body').css({'overflow' : 'auto'});
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
// Слайдер 
$('.slider__img').slick({
	centerMode: true,
	infinite: true,
	appendArrows: $('.button_slider'),
	prevArrow: '<a class="slider_button__left"><img src="assets/icons/button_slider.svg"></a>',
	nextArrow: '<a class="slider_button__right"><img src="assets/icons/button_slider.svg"></a>',
	slidesToShow: 3,
	autoplay: true,
    autoplaySpeed: 2000,
	responsive: [
	  {
		breakpoint: 2100,
		settings: {
		  slidesToShow: 2
		}
	  },
	  {
		breakpoint: 1650,
		settings: {
			centerMode: false
		}
	  },
	  {
		breakpoint: 1450,
		settings: {
			slidesToShow: 2
		}
	  },
	  {
		breakpoint: 1200,
		settings: {
			centerMode: false,
			slidesToShow: 2
		}
	  },
	  {
		breakpoint: 1000,
		settings: {
			centerMode: true,
			slidesToShow: 3
		}
	  },
	  {
		breakpoint: 650,
		settings: {
			centerMode: true,
			slidesToShow: 2
		}
	  },
	  {
		breakpoint: 550,
		settings: {
			centerMode: false,
			slidesToShow: 2
		}
	  },
	  {
		breakpoint: 450,
		settings: {
			centerMode: true,
			slidesToShow: 1
		}
	  }
	]
  });
  
  // Инициализация
$('#date_in').datepicker({
    minDate: new Date()
})

// Переменные для яндекс карты
var myMap,
    location_silger1,
    location_silger2,
    Silger1,
    Silger1_1,
    Silger2_2,
    Silger2;