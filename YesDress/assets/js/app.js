// Slider main
var getTimeout = function(){var e=setTimeout,b={};setTimeout=function(a,c){var d=e(a,c);b[d]=[Date.now(),c];return d};return function(a){return(a=b[a])?Math.max(a[1]-Date.now()+a[0],0):NaN}}();
function sanitisePercentage(i){
	return Math.min(100,Math.max(0,i));
}
var time_to_switch = 4000; // Время для смены слайда
var percentTime;
var tick;
var progressBar = document.querySelector('.progressbar_line');
var navProgressBar = document.querySelector('.swiper-navigation-pages');
var swiperMain = new Swiper('.swiper .swiper-container', {
	loop: true,
	speed: 1000,
    spaceBetween: 0,
	slidesPerView: 1,
	grabCursor: true,
	watchOverflow: true,
	watchSlidesProgress: true,
	watchSlidesVisibility: true,
	roundLengths: true,
    navigation: {
        nextEl: '.swiper-button-next',
        },
        autoplay: {
            delay: time_to_switch,
            disableOnInteraction: false
        },
    on: {
		slideChange: function() {
			var slidesLenght = this.slides.filter(x => !x.classList.contains('swiper-slide-duplicate')).length
            updateSwiperCountSlide(this.realIndex + 1, slidesLenght, this)
            updateSwiperProgressBar(progressBar, time_to_switch, this, navProgressBar, false)
        }
    },
});

var countSlidesPhotoday = $('.swiper-photoday .swiper-container .swiper-slide').length
var swiperPhotoday = new Swiper('.swiper-photoday .swiper-container', {
	loop: true,
	speed: 1000,
    spaceBetween: 48,
	loopedSlides: countSlidesPhotoday,
	slidesPerView: 'auto',
	observer: true,
	centeredSlides: true,
	watchSlidesProgress: true,
	watchSlidesVisibility: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: time_to_switch,
            disableOnInteraction: false
        },
    on: {
		init: function() {
			activateSlide(this)
			this.init()
		},

		slideChange: function() {
			var slidesLenght = this.slides.filter(x => !x.classList.contains('swiper-slide-duplicate')).length
			activateSlide(this)
            updateSwiperCountSlide(this.realIndex + 1, slidesLenght)
            updateSwiperProgressBar(progressBar, time_to_switch, this, navProgressBar)
			this.init()
        }
    },
});

function activateSlide({$el, slides, activeIndex}) {
	$el.find('.swiper-slide--leftside').removeClass('swiper-slide--leftside')
	slides.eq(activeIndex).addClass('swiper-slide--leftside')
}

function updateSwiperCountSlide(slideIndex, lenSlider){
	if ($('.swiper-navigation-pages .progressbar_line--rotate')) {
		$('.swiper-navigation-pages > span:eq(0)').text(slideIndex).css({'opacity':'.3'})
		$('.swiper-navigation-pages > span:eq(1)').text(lenSlider)
	} else {
		$('.swiper-navigation-pages > span:eq(0)').text(slideIndex)
		$('.swiper-navigation-pages > span:eq(1)').text(lenSlider).css({'opacity':'.3'})
	}
}

function updateSwiperProgressBar(bar, slideDelay, swiper, wrapBar, hidden_bar=true) {
	function startProgressBar() {
		resetProgressBar();
		tick = setInterval(progress, 50);
	}
	function progress() {
		var timeLeft = getTimeout(swiper.autoplay.timeout);
		if (swiper.autoplay.running && !swiper.autoplay.paused) {
			if (hidden_bar) {
				wrapBar.style.display = 'flex'
			}
			percentTime = sanitisePercentage(100 - Math.round(timeLeft / slideDelay * 100));
			if (bar.classList.contains('progressbar_line--rotate')){
				bar.style.height = percentTime + '%';
			} else {
				bar.style.width = percentTime + '%';
			}
			if (percentTime > 100) {
				resetProgressBar();
			}
		}
		if (swiper.autoplay.paused) {
			percentTime = 0;
			if (bar.classList.contains('progressbar_line--rotate')){
				bar.style.height = 0;
			} else {
				bar.style.width = 0;
			}
		}
	}
	function resetProgressBar() {
		percentTime = 0;
		if (hidden_bar) {
			wrapBar.style.display = 'none'
		}
		if (bar.classList.contains('progressbar_line--rotate')){
			bar.style.height = 0;
		} else {
			bar.style.width = 0;
		}
		clearInterval(tick);
	}
	startProgressBar();
}

// small slider
var swiper_small = new Swiper('.coming-photodays_wrap__slider', {
	freeMode: true,
	loop: false,
	slidesPerView: 'auto',
    spaceBetween: 50,
})

// slider by corner
var swiper_corner = new Swiper('.corner__strip', {
	freeMode: true,
	loop: false,
	speed: 100,
    spaceBetween: 50,
	slidesPerView: 'auto',
	touchStartPreventDefault: false,
	mousewheel: {
		eventsTarget: 'body',
		sensitivity: 0.5,
	},
})

// swiper photodays
var swiper_photodays = new Swiper('.photodays_wrap_content__slider', {
	freeMode: true,
	loop: false,
	speed: 100,
	slidesPerView: 'auto',
    spaceBetween: 100,
	watchOverflow: true,
})

// for slider corner (чтобы слайдился только при наличии на экране) 
if (window.location.toString().indexOf('corner.html')>0) {
	$(document).ready(function() {
		$(window).on('scroll', () => {
			var blockPositionBot = ($('.corner_wrap__strip').offset().top + $('.corner_wrap__strip').height()),
				blockPositionTop = $('.corner_wrap__strip').offset().top,
				windowScrollPosition = $(window).scrollTop() + $(window).height();
			
			if( blockPositionTop < windowScrollPosition && blockPositionBot > $(window).scrollTop()) {
				swiper_corner.mousewheel.enable()
			} else {
				swiper_corner.mousewheel.disable()
			}
		});
	});
}

$('.photodays_wrap_content__nav a').click(function(){
	$('.photodays_wrap_content__nav a').removeClass('photodays_wrap_content__nav--active-year')
	$(this).addClass('photodays_wrap_content__nav--active-year')
	var yearVision = '.swiper-slide--group-' + this.text
	$('.photodays_wrap_content__slider .swiper-slide').addClass('swiper-slide--disabled')
	$('.photodays_wrap_content__slider ' + yearVision).removeClass('swiper-slide--disabled')
	swiper_photodays.update()
})

// mobile menu
$('.burger, .cross').click(function(){
	$('.navbar__drop-menu').toggleClass('menu-active')
    if ($('.navbar__drop-menu').hasClass('menu-active')) {
		$('.navbar_wrap__logo a').css({'height' : '80px', 'width' : '80px', 'top': '9px', 'left': '-4vw'})
		$('.navbar_object-menu_button span').text('закрыть')
        $(this).addClass('cross');
        $(this).removeClass('burger');
        $('body').css({'overflow' : 'hidden'});
    } else {
		$('.navbar_wrap__logo a').css({'height' : '80px', 'width' : '80px', 'top': '10px', 'left': '0px'})
		$('.navbar-main .navbar_wrap__logo a').css({'height' : '141px', 'width' : '141px', 'top': '15px', 'left': '-13px'})
		$('.navbar_object-menu_button span').text('меню')
        $(this).addClass('burger');
        $(this).removeClass('cross');
        $('body').css({'overflow' : 'auto'});
    }
});


// drop-list filter

$(".catalog__filter_item:first-child .catalog__filter_item__drop-list").slideToggle(1);
$(".catalog__filter_item:first-child .catalog__filter_item__drop-button").addClass("accordion");
$(".catalog__filter_item:first-child .catalog__filter_item__drop-button").addClass("vision-attr");

$(function() {
	$(".catalog__filter_item__drop-button").on("click", function(e) {

		e.preventDefault();
		var $this = $(this);

		if (!$this.hasClass("accordion")) {
			$(".catalog__filter_item__drop-list").slideUp(150);
			$(".catalog__filter_item__drop-button").removeClass("accordion");
			$('.catalog__filter_item__drop-button').removeClass('vision-attr');
		}

		$this.toggleClass("accordion");
		$this.next().slideToggle();
		$(this).toggleClass('vision-attr');
	});	
});

// switch heart (delete)
$('.heart, .profile, .basket, .logout').not('.navbar_wrap__object .heart').click(function(){
	$(this).toggleClass('active-icon');
})

// switch enter form
$('.enter_wrap_content__switch > div').click(function(){
	if (!($(this).hasClass('switch_buttton-active'))){
		$('.enter_wrap_content__form').toggleClass('form-disabled')
		$('.enter_wrap_content__switch > div').toggleClass('switch_buttton-active')
	}
})

// password-show
$('.password-control > span').click(function(){
	if ($(this).hasClass('password-show')) {
		$(this).siblings('input').attr('type', 'password')
		$(this).removeClass('password-show')
	} else {
		$(this).siblings('input').attr('type', 'text')
		$(this).addClass('password-show')
	}
})
// Маска для поля с телефоном
$(function(){
    $(".phone-control > input").mask("+7 (999) 999-99-99?", {autoclear: false});
});

// transition text for password-nput
$('.content_form-row:not(.submit-control) > input, .content_form-row > textarea').focus(function(){
	$(this).siblings('label').addClass('active-label')
	$(this).siblings('label').removeClass('disabled-label')
	$(this).css({'border' : '1px solid #237061', 'background-color' : '#ffffff'})
	$(this).siblings('label').addClass('active-label')
})

$('.content_form-row:not(.submit-control) > input, .content_form-row > textarea').focusout(function(){
	$(this).siblings('label').removeClass('active-label')
	if ($(this).val() == '' || $(this).val() == '+7 (___) ___-__-__'){
		$(this).css({'border' : '1px solid #F8F8F8', 'background-color' : '#F8F8F8'})
		$(this).siblings('label').removeClass('disabled-label')
	}
	else {
		$(this).siblings('label').addClass('disabled-label')
		$(this).css({'border' : '1px solid #E1E2E6', 'background-color' : '#ffffff'})
	}
})

// call modal
$('a[class*="modal"]').click(function() {
	var modal = $('#' + $(this).attr("class").split(' ').filter(nameClass => nameClass.indexOf('modal') !== -1)[0])
	modal.addClass('active-modal')
	if (!(modal.hasClass('modal-notice'))){
		$('body').css({'overflow' : 'hidden'})
	}
})

// close modal
$('.shadow, .close-modal').click(function () {
	if ($(this).hasClass("shadow")) {
		hideaAllChildModal($(this).parent())
		$(this).parent().removeClass('active-modal')
	} else {
		var modal = $('#' + "modal-" + $(this).parent().attr("class"))
		hideaAllChildModal($(modal))
		$(modal).removeClass('active-modal')
	}
    $('body').css({'overflow' : 'visible'});
})

function hideaAllChildModal(parent) {
	parent.find('.modal').removeClass('active-modal')
}

// zoom img
$('.product_wrap__show_item > a').click(function() {
	showZoomImg(this)
})

$('.zoom__pagination--prev, .zoom__pagination--next').click(function() {
	var indexImg = $('.zoom__content > img').attr("aria-label")
	if ($(this).hasClass('zoom__pagination--prev')) {
		if ($(this).hasClass('zoom__pagination--end')) {
			indexImg = $('.product_wrap__show').find('img').length - 1
		} else {
			indexImg = indexImg - 1
		}
	} 
	if ($(this).hasClass('zoom__pagination--next')) {
		if ($(this).hasClass('zoom__pagination--end')) {
			indexImg = 0
		} else {
			indexImg = Number(indexImg) + 1
		}
	}
	showZoomImg($($('.product_wrap__show').find('img')[indexImg]).parent())
})

function showZoomImg(image) {
	var listImg = $(image).parents('.product_wrap__show').find('img'), 
	imgSrc = $(image).children("img")
	$('.zoom__content').html(imgSrc.clone().attr("aria-label", listImg.index(imgSrc)))
	if (listImg.index(imgSrc) == 0) {
		$('.zoom__pagination--prev').addClass('zoom__pagination--end')
	} else {
		$('.zoom__pagination--prev').removeClass('zoom__pagination--end')
	}
	if (listImg.index(imgSrc) == listImg.length - 1) {
		$('.zoom__pagination--next').addClass('zoom__pagination--end')	
	} else {
		$('.zoom__pagination--next').removeClass('zoom__pagination--end')
	}
}

var maxDateBirthday = new Date(),
startDateBirthday = new Date("01.01.1980")
maxDateBirthday.setFullYear(maxDateBirthday.getFullYear() - 6) // с 16 лет

$('.datepicker-bd').datepicker({
	multipleDates: 1,
	startDate: startDateBirthday,
	minDate: "",
	maxDate: maxDateBirthday,
	view: "years",
	showOtherYears: true,
	selectOtherYears: true,
	moveToOtherYearsOnSelect: true,
})

// map
if (window.location.toString().indexOf('contact.html')>0) {
	var map;
		DG.then(function () {
			map = DG.map('map', {
				center: [43.162229383838955, 131.91459486461108],
				zoom: 15.5,
				zoomControl: false,
				fullscreenControl: false,
			});
			DG.marker([43.162052857486664, 131.91710501705313]).addTo(map);
		});
}
// left-banner
window.addEventListener('load', (event) => {
	var docHeight = $('body').outerHeight(true)
	$(function() {
		var sumHeight = 0
		$('section').each(function() {
			sumHeight =  sumHeight + $(this).outerHeight(true);
		})
		if (sumHeight < $(window).outerHeight()){
			$('.footer').css({'margin-top' : $(window).height() - sumHeight})
		}
	});
	$('.left-banner').css({'max-height' : docHeight})
	while (docHeight - $('.left-banner').outerHeight() > 1) {
		$('.left-banner').append('<p>HELLO DRESS HUNTER</p>')
	}
});

// Переключение цвета
$( document ).ready(function() {
	var n = $(".item__color-text"),
			s = $(".item__color"),
			r = $(".item__color.current").attr("data-color");
	s.on("mouseenter", function () {
			var t = $(this).attr("data-color");
			n.text(t)
	}),
	s.on("mouseleave", function () {
			return n.text(r)
	})
});

// Видео
$('.product_wrap__show_item video').click(function() {
	this.paused ? this.play() : this.pause();
});

var swiper_new = new Swiper('.swiper_new', {
	slidesPerView: 3,
	freeMode: true,
	loop: false,
	slidesPerView: 'auto',
    spaceBetween: 45,
});

// Пуш окна (не работает)
// $(doсument).on('ready', function() {
// 	miniShop2.Message = {
// 	success: function() {console.log('cart:Добавленно в корзину');},
// 	error: function() {console.log('cart:2');},
// 	info: function() {console.log('cart:3');},
// 	};
// });

// video player
var videoEl = document.querySelector('.autoplay-video'),
	videoButton = $(videoEl).prev(".video-button");

$(videoButton).click(function() {
	if (videoEl.paused) {
		videoEl.play();
	} else {
		videoEl.pause();
	}
});
 
videoEl.addEventListener('play', function () {
	$(videoEl).prev(".video-button").css({'opacity' : '0', 'visibility' : 'hidden'})
});
 
videoEl.addEventListener('pause', function () {
	$(videoEl).prev(".video-button").css({'opacity' : '1', 'visibility' : 'visible'})
});