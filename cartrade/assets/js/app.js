// ТОЛЬКО НА ГЛАВНОЙ
if (window.location.toString().length<=27) {
	$('#accordion').accordionjs();
}
$('.auto_card__picture').brazzersCarousel();

// animation care
var timeRace = 4000, // time to race 
	raceDone = false; 

var dictModal = ['chase--delivery', 'chase--transit', 'chase--customs', 'chase--finish'];

function race(time) {
	var car = $('.schema__car'),
	lineCar = $('.schema__line'),
	fieldWidth = $('.plan-work_wrap__schema').width(),
	pointCheck = fieldWidth / 5 - car.width()/2,
	startTime = new Date($.now());
	var prog = setInterval(function() {
		var nowTime = new Date($.now());
		if (nowTime - startTime < time) {
			var numCh = (Math.round((nowTime - startTime) / time * 100));
			if ((fieldWidth - car.width())/fieldWidth*100 >= numCh) {
				car.css({ 'left' : numCh + '%' });
			}
			lineCar.css({'background': 'linear-gradient(to right, #2067F0 '+numCh+'%, #ffffff '+numCh+'% )'})
			if (numCh >= pointCheck / fieldWidth *100) {
				$('.schema__point').not('.schema__point--active').eq(0).addClass('schema__point--active');
				pointCheck = pointCheck + fieldWidth / 5;
			}
		} else {
			clearInterval(prog)
		}
	}, 0)
}

function scrollTracking(){
	if (raceDone) {
		return false;
	}
	var wt = $(window).scrollTop(),
	wh = $(window).outerHeight(),
	et = $('.plan-work_wrap__schema').offset().top;
 
	if (wt + wh >= et){
		raceDone = true;
		race(timeRace);
	}
}
// ТОЛЬКО НА ГЛАВНОЙ
if (window.location.toString().length<=27) {
	$(window).scroll(function(){
		scrollTracking();
	});
}

var swiper = new Swiper(".comment-swiper", {
	slidesPerView: 1,
	spaceBetween: 30,
	centeredSlides: true,
	navigation: {
		nextEl: '.comment__nav__right',
		prevEl: '.comment__nav__left',
	},
	breakpoints: {
		1150: {
			slidesPerView: 1.5,
		},
		// when window width is >= 640px
		1500: {
			slidesPerView: 2,
		}
	  }
  });

// отзывы
$('.comment-slide_wrap__img').each(function() {
	if ($(window).innerWidth() > 800) {
		var k = 3
	} else {
		var k = 2
	}
	if ($(this).children('a').length > k) {
		var countDiv = $(this).children('a').length - k
		$(this).children('a:nth-child('+k+')').append('<span>+ '+countDiv+'</span>')
	}
})

$(function() {
	$('.footer_bg__text--loop').marquee({
		speed: 2,
		startVisible: true,
		duplicated: true
	});
});

$('.accordion-nav > img').click(function() {
	if (!$(this).hasClass('accordion-nav--disabled')) {
		if ($(this).hasClass('accordion-nav--right')) {
			$('#accordion > li.accordion--selected').next().children('input').click()
		} else {
			$('#accordion > li.accordion--selected').prev().children('input').click()
		}
	}
})

$('#accordion > li').change(function() {
	$('.accordion--selected').removeClass('accordion--selected')
	$(this).addClass('accordion--selected')
	if ($(this).prop('tabindex')+1 == $('#accordion > li').length){
		$('.accordion-nav > img').removeClass('accordion-nav--disabled')
		$('.accordion-nav > img.accordion-nav--right').addClass('accordion-nav--disabled')
	} else if ($(this).prop('tabindex') == 0) { 
		$('.accordion-nav > img').removeClass('accordion-nav--disabled')
		$('.accordion-nav > img.accordion-nav--left').addClass('accordion-nav--disabled')
	} else {
		$('.accordion-nav > img').removeClass('accordion-nav--disabled')
	}
})

// accordeon mobile
if ($(window).innerWidth() <= 1300) {
	$('.accordionjs-content').not($('.accordionjs-content').eq(0)).slideUp(0)
	$('.accordionjs > li').click(function() {
		if (! $(this).hasClass('accordion--selected')){
			$('.accordionjs-content').slideUp(1000)
			$(this).find('.accordionjs-content').slideDown(1000);
		}
	})
}

if ($(window).innerWidth() <= 500) {
	$('.chase_wrap').append($('.chase_wrap__info__row.chase--transit_wrap').eq(1))
	$('.chase_wrap').append($('.chase_wrap__info__upload'))
	$('.chase_wrap').append($('.button-regular.chase_wrap__call'))
}

// mobile
function openMenu() {
	$('.navbar_wrap__button').removeClass('navbar_wrap__button--close')
	$('.navbar_wrap__button').addClass('navbar_wrap__button--open')
	$('.navbar_wrap__link').addClass('navbar_wrap__link--active')
	$('.navbar').addClass('navbar--active')
	$('body').css({'overflow' : 'hidden'})
}

function closeMenu() {
	$('.navbar_wrap__button').removeClass('navbar_wrap__button--open')
	$('.navbar_wrap__button').addClass('navbar_wrap__button--close')
	$('.navbar_wrap__link').removeClass('navbar_wrap__link--active')
	$('.navbar').removeClass('navbar--active')
	$('body').css({'overflow' : 'auto'})	
}
$('.navbar_wrap__button__burger').click(function() {
	openMenu()
})
$('.navbar_wrap__button__cross').click(function() {
	closeMenu()
})

// ВСЕ КРОМЕ ГЛАВНОЙ
if (window.location.toString().length>27) {
	if ($(window).innerWidth() > 1150) {
		var valMargin = ($('.navbar_wrap').outerWidth(true) - $('.navbar_wrap').outerWidth())/2 - 40;
		$('.navbar-regular .navbar_wrap').css({'margin' : '0 '+ valMargin})	
	}
}

$('.range-progress-years').slider({
	animate: 'fast',
    range: true,    
	min: 2012,
	max: 2021,
	values: [ 2012, 2021 ],
	slide : function(event, ui) {    
		$(".filter_years-before").val(ui.values[0]);   
		$(".filter_years-after").val(ui.values[1]);  
	},
	classes: {
		"ui-slider-handle" : "ui-slider-handle-custom",
		"ui-slider-range" : "ui-slider-range-custom",
		"ui-slider" : "ui-slider-custom",
	},
});

$('.range-progress-price').slider({
	animate: 'fast',
    range: true,    
	step: 1000,
	min: 216000,
	max: 3900000,
	values: [ 216000, 3900000 ],
	slide : function(event, ui) {    
		$(".filter_price-before").val(ui.values[0] + ' ₽');   
		$(".filter_price-after").val(ui.values[1] + ' ₽');  
	},
	classes: {
		"ui-slider-handle" : "ui-slider-handle-custom",
		"ui-slider-range" : "ui-slider-range-custom",
		"ui-slider" : "ui-slider-custom",
	},
});

$('#filter-brand').change(function() {
	if ( $(this).val() == "") {
		$('#filter-model').parent().addClass('catalog_wrap__filter__section--disabled')
		$('#filter-model').val("").prop('disabled', true)
	} else {
		$('#filter-model').prop('disabled', false)
		$('#filter-model').parent().removeClass('catalog_wrap__filter__section--disabled')
	}
})


$('.filter_price-before').val($('.range-progress-price').slider("values")[0] + ' ₽')
$('.filter_price-after').val($('.range-progress-price').slider("values")[1] + ' ₽')
$('.filter_years-before').val($('.range-progress-years').slider("values")[0])
$('.filter_years-after').val($('.range-progress-years').slider("values")[1])

$('#filter-clear').click(function() {
	var valYearsMin = $( ".range-progress-years" ).slider("option", "min"),
	valYearsMax = $( ".range-progress-years" ).slider("option", "max"),
	valPriceMin = $( ".range-progress-price" ).slider("option", "min"),
	valPriceMax = $( ".range-progress-price" ).slider("option", "max");
	$( ".range-progress-years" ).slider( "values", [ valYearsMin, valYearsMax ] );
	$( ".range-progress-price" ).slider( "values", [ valPriceMin, valPriceMax ] );
	$('.filter_price-before').val(valPriceMin + ' ₽')
	$('.filter_price-after').val(valPriceMax + ' ₽')
	$('.filter_years-before').val(valYearsMin)
	$('.catalog_wrap__filter__section select').val("")
	$('#filter-brand').change()
})

$('.catalog_wrap__button-filter').click(function() {
	$('.catalog_wrap__filter').addClass('catalog_wrap__filter--open')	
	$('body').css({'overflow' : 'hidden'})
})

$('.catalog_wrap__filter__cross').click(function() {
	$('.catalog_wrap__filter').removeClass('catalog_wrap__filter--open')
	$('body').css({'overflow' : 'auto'})
})

var $fotoramaDiv = $('.fotorama').fotorama({
	allowfullscreen: true,
	nav: 'thumbs',
	thumbmargin: 15,
	thumbheight: 121,
	fit: "cover",
	thumbfit: "cover",
	arrows: 'always',
	thumbwidth: 178,
	loop: true,
	width: '100%',
});

var fotorama  = $fotoramaDiv.data('fotorama')

$('.questions_wrap__content__list_item__label').click(function(){
    if ($(this).parent().hasClass('vision-txt')){
        $(this).parent().removeClass('vision-txt')
        $(this).siblings('.questions_wrap__content__list_item__text').toggle(300, 'linear');
    } else{
        $(this).parent().addClass('vision-txt')
        $(this).siblings('.questions_wrap__content__list_item__text').slideToggle(300, 'linear');
    }
})

$('.fotorama').on('fotorama:showend fotorama:ready', function (e, fotorama) {
	if ($(window).innerWidth() <= 1150) {
		$('.fotorama__wrap').attr('data-content', ++fotorama.activeIndex + '/' + fotorama.size)
	}
});

if (window.location.toString().indexOf('product.html')>0 && $(window).innerWidth() <= 1150) {
	$('.auto .auto_wrap__content').append($('.auto .auto_wrap__feature'))
	$('.auto').prepend($('.auto_wrap__content .fotorama'))
	fotorama.setOptions({
		nav: false,
		arrows: false,
		allowfullscreen: false,
	});
}

// call modal
$('a[class*="modal"]').click(function() {
	callModal(this)
})

$('button.modal_to_modal').click(function() {
	// вторым аргументом передавать dictModal[x] x - статус доставки
	callModal(this, dictModal[2])
})

function callModal(obj, stepChase = false) {
	hideaAllChildModal()
	var modal = $('#' + $(obj).attr("class").split(' ').filter(nameClass => nameClass.indexOf('modal') !== -1)[0]),
	checkModal = true;
	if ($(obj).hasClass('modal__form__check')) {
		$(obj).parents('form').find('select').each(function() {
			if ($(this).val() == null) {
				if ( ! $(this).hasClass('invalid-filed')) {
					$(this).addClass('invalid-filed')
					$(this).parent().append('<span class="promt-error">Ошибка - это обязательное поле</span>')
				}
				checkModal = false
			}
		})
	}
	if (checkModal) {
		if (stepChase) {
			hideaAllChildModal()
			modal.addClass(stepChase)
			modal.find('.chase_wrap__way__point').eq(dictModal.indexOf(stepChase)).addClass('chase-point--active')
			for (i=dictModal.indexOf(stepChase)+1; i < dictModal.length; i++) {
				modal.find('.chase_wrap__way__point').eq(i).addClass('chase-point--disabled')
			}
		}
		if ($('.navbar').hasClass('navbar--active')) {
			closeMenu()
		}
		modal.addClass('modal--active')
		$('body').css({'overflow' : 'hidden'});
	}
}

// close modal
$('.shadow, .close-modal').click(function () {
	var modal = $(this).parents('.modal');
	hideaAllChildModal()
})

function hideaAllChildModal() {
	$('.modal').removeClass('modal--active')
    $('body').css({'overflow' : 'visible'});
}

$('.modal-confirm').click(function () {
	checkValid(this)
})

function checkValid(obj) {
	$(obj).parents('form').find('input').each(function() {
		if ( $(this).is(':invalid')) {
			if ( ! $(this).hasClass('invalid-filed')) {
				$(this).addClass('invalid-filed')
				$(this).parent().append('<span class="promt-error">Ошибка - это обязательное поле</span>')
			}
		}
	})
}

$('.invalid-filed').click(function() {
	$(this).removeClass('invalid-filed')
	$(this).siblings('span.promt-error').detach()
})

$('select, .invalid-filed').change(function() {
	if ($(this).hasClass('invalid-filed')) {
		$(this).removeClass('invalid-filed')
		$(this).siblings('span.promt-error').detach()
	}
})

if (window.location.toString().indexOf('contacts.html')>0) {
	DG.then(function () {
		map = DG.map('mapContact', {
			center: [43.10075496959036, 131.90208885383106],
			zoom: 14,
			dragging: true,
			touchZoom: false,
			scrollWheelZoom: false,
			doubleClickZoom: false,
			boxZoom: false,
			geoclicker: false,
			zoomControl: false,
			fullscreenControl: false
		});

		DG.marker([43.10075496959036, 131.90208885383106]).addTo(map);
	});
}