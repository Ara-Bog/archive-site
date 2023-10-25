// вызов меню
$('.menu_wrap__nav__button').click(function() {
  var $parenBlock = $('.menu_wrap__nav') 
  // задаем body возможность скролла
  if ($parenBlock.hasClass("menu-open")) {
    $('body').css({'overflow' : 'visible'});
  } else {
    $('body').css({'overflow' : 'hidden'});
  }
  // меняем закрыт/открыт
  $parenBlock.toggleClass("menu-open")
  $parenBlock.toggleClass("menu-close")
  // добавляем/удаляем активный класс мобальному меню
  $(".modal-linksMenu").toggleClass("modal-linksMenu--active")
  
})


// переключение типов конструктора
$('.constructor_wrap__type > span').click(function() {
  // находим текущий активный тип
  var $currentType = $('.constructor_wrap__type--active')

  // удаляем активный класс
  $currentType.removeClass('constructor_wrap__type--active')
  // добавляем активный класс к нажатому
  $(this).addClass('constructor_wrap__type--active')

  // удаляем ранее установленный фильтр
  $('.constructor-form').removeClass('form-active_type--' + $currentType.attr("id"))
  // устанавливаем конструктору фильтр
  $('.constructor-form').addClass('form-active_type--' + $(this).attr("id"))

  // получаем все вложенные блоки конструктора
  // в них находим поле с id = constructor-type--(japan/korea)
  // берем только первый и ставим ему checked
  $('div[class*=constructor-form__]').find('#constructor-type--' + $(this).attr("id") + ':first input').prop('checked', true)

  // вызываем функцию для переноса выбранных значений
  outPutSelectRadio()
})
// переключение этапов конструктора по кнопке
$('.constructor-form--next-step').click(function() {
  // получаем текущий и следующий этап заказа
  var $currentStep = $('.constructor_wrap__steps--active')
  var $nextStep = $currentStep.next()
  // удаляем и добавляем к этапу класс активности
  $currentStep.removeClass('constructor_wrap__steps--active')
  $nextStep.addClass('constructor_wrap__steps--active')

  var newClasses = 'constructor-form form-active_step--' + $nextStep.attr("id")
  // меняем состояние формы на соответствующий этап
  $('.constructor-form').attr('class', newClasses)
})
// переключение этапов конструктора по вкладкам
$('.constructor_wrap__steps > span').click(function() {
  // меняем активный класс у этапов
  $('.constructor_wrap__steps--active').removeClass('constructor_wrap__steps--active')
  $(this).addClass('constructor_wrap__steps--active')
  var newClasses = 'constructor-form form-active_step--' + $(this).attr("id")
  // меняем состояние формы на соответствующий этап
  $('.constructor-form').attr('class', newClasses)
})


// переключение вкладок новости
$('.news_wrap_content__tabs_wrap > span').click(function() {
  $('.news_wrap_content__tab--active').removeClass('news_wrap_content__tab--active')
  $(this).addClass('news_wrap_content__tab--active')
  var newClasses = 'news_wrap_content__items select-news--' + $(this).attr("id")
  $('.news_wrap_content__items').attr('class', newClasses)
})


// маска телефона
$('.mask_phone').mask("+7 (999) 999-99-99")


// слайдер главная ИНФО
var swiperInfo = new Swiper(".swiper_info", {
  autoHeight: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper_info-button-next",
    prevEl: ".swiper_info-button-prev",
  },
})
// для слайдера ИНФО (смена цветов)
swiperInfo.on('slideChange', function () {
  // проверка что это последний слайд
  if (swiperInfo.isEnd) {
    $('.swiper_info').addClass('swiper_info--reverse')
  } else {
    $('.swiper_info').removeClass('swiper_info--reverse')
  }
});


// слайдер главная предложения
var swiperOffer = new Swiper(".swiper_offer", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper_offer-button-next",
    prevEl: ".swiper_offer-button-prev",
  },
  
  breakpoints: {
    // при экране >= 1000
    1000: {
      spaceBetween: 30,
      slidesPerView: "auto",
      pagination: {
        enabled: false
      },
    },
  }
})


// слайдер главная отзывы
var swiperReviews = new Swiper(".swiper_reviews", {
  autoHeight: true,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper_reviews-button-next",
    prevEl: ".swiper_reviews-button-prev",
  },
  
  breakpoints: {
    // при экране >= 1000
    1000: {
      spaceBetween: 30,
      slidesPerView: 1.088, // чтобы по бокам показывались куски других слайдов (чем больше, тем больше будут куски и меньше активный слайд)
      centeredSlides: true,
      pagination: {
        enabled: false
      }
    },

    // при экране >= 1300
    1300: {
      spaceBetween: 50,
      slidesPerView: 1.11, // чтобы по бокам показывались куски других слайдов (чем больше, тем больше будут куски и меньше активный слайд)
      centeredSlides: true,
      pagination: {
        enabled: false
      }
    }
  }
});


// слайдер страницы машины
// пагинация
var swiperCarPagination = new Swiper(".swiper_car-pagination", {
  spaceBetween: 10,
  slidesPerView: "auto",
  freeMode: true,
  watchSlidesProgress: true,
});
// основной
var swiperCar = new Swiper(".swiper_car", {
  spaceBetween: 10,
  slidesPerView: "auto",
  loop: true,
  navigation: {
    nextEl: ".swiper_car-button-next",
    prevEl: ".swiper_car-button-prev",
  },
  thumbs: {
    swiper: swiperCarPagination,
  },
});
// раскрытие слайдера страницы машины на весь экран
swiperCar.on('click', function(swiper, ev) {
  // т.к. идет дублирование слайдеров, то нужно проверить, не открыт ли уже слайдер
  if (!$('.car-info_wrap__slider').hasClass('car-info_wrap__slider--full')) {
    // получаем размер слайдера
    var fillPadding = $('.car-info_wrap__slider').height()
    // заполняем пустым местом родителя, чтобы экран не съезжал
    $('.car-info_wrap').css({'padding-bottom': fillPadding + 'px'})
    // запрещаем скролл
    $('body').css({'overflow' : 'hidden'})
    // разворачиваем на полный экран
    $('.car-info_wrap__slider').addClass('car-info_wrap__slider--full')
    // включаем зум
    swiper.zoom.enable()
  }
})
// закрытие фулсайз слайдера страницы машины
$('.car-info_wrap__slider--full-close').click(function() {
  // удаляем ранее добавленный отступ
  $('.car-info_wrap').removeAttr("style")
  // разрешаем скролл
  $('body').css({'overflow' : 'hidden'})
  // убираем полный экран на полный экран
  $('.car-info_wrap__slider').removeClass('car-info_wrap__slider--full')
  // сбрасываем приближение у активного слайда
  swiperCar.zoom.out()
  // запрещаем зум
  swiperCar.zoom.disable()  
})
// при смене слайдов в фул сайзе нужно сбразывать зум
swiperCar.on('slideChange', function (swiper, ev) {
  // проверка что зум включен
  if (swiper.zoom.enabled) {
    // сбрасываем приближение
    swiper.zoom.out()
  }
});


// запуск видео
$('.video-element-play').click(function() {
  // получаем запускаемое видео
  var selectVideo = $(this).siblings('video').get(0)

  // на разных браузерах, разный способ вызова фулл скрина
  if (selectVideo.requestFullscreen) {
    selectVideo.requestFullscreen();
  } else if (selectVideo.mozRequestFullScreen) {
    selectVideo.mozRequestFullScreen();
  } else if (selectVideo.webkitRequestFullscreen) {
    selectVideo.webkitRequestFullscreen();
  } else if (selectVideo.msRequestFullscreen) { 
    selectVideo.msRequestFullscreen();
  }

  // добавляем событие при изменении фул скрина
  selectVideo.addEventListener("fullscreenchange", function (e) { 
    // когда документ выходит из фулл скрина - ставим видос на паусу
    // !!это нужно, т.к. иначе видео свернется и продолжит воспроизведение СО ЗВУКОМ
    if (!document.fullscreenElement) {
      selectVideo.pause()
    }
  });

  // запуск видео при открытии на фул скрин (можно убрать, но наверное не стоит)
  selectVideo.play()
})


// мобилка, перенос блоков
if ($(window).width() >= 1000) {
  $('.videos_wrap__text_dictription').append($('.videos_wrap > .button-default'))
  $('.offer-slider_wrap_title').append($('.offer-slider_wrap > .link-default'))
  $('.offer_wrap__title').append($('.offer_wrap > .link-default'))
  $('.news-feed_wrap__title').append($('.news-feed_wrap > .link-default'))
}


// для конструктора, вывод активных радио
// при иницилизации
if ($('.constructor-form').length != 0) {
  outPutSelectRadio()
}
// вывод выбранных радио
function outPutSelectRadio() {
  // получаем список выбранных значений
  var $listCheckedInput = $('.constructor-form input[type=radio]:checked')
  // обходим циклом
  $listCheckedInput.each(function() {
    // получаем id для вывода (можно без переменной сделать)
    var idOut = '#' + $(this).attr("name") + '-out'
    // находим поле для вывода с таким id и добавляем ему текст value кнопки с checked
    $('.constructor-form__confirm_construct__select_data ' + idOut).text($(this).val())
  })
}


// ползунок фильтра - цен
var $parentInputsPrice = $('#filter-price').prev()
function changeValueInputsPrice(data) {
  console.log($parentInputsPrice.children('#filter-price-start').val())
  $parentInputsPrice.children('#filter-price-start').val(data.from_pretty)
  console.log(data)
  console.log($parentInputsPrice.children('#filter-price-start').val())
  $parentInputsPrice.children('#filter-price-end').val(data.to_pretty)
}
$("#filter-price > input").ionRangeSlider({
  // все параметры можно прописать на прямую у input через data
  // data-min="1000000"
  type: "double",
  // минимальное/ максимальное для ползунка
  min: 1000000,
  max: 5000000,
  // шаг при проктутке
  step: 1000,
  // встроенные блоки, которые не нужны
  hide_min_max: true,
  hide_from_to: true,
  grid_margin: false,
  // при старте нужно задать input'ам значение мин и макс
  onStart: function (data) {
    changeValueInputsPrice(data)
  },
  // меняем значение input'ам на значение ползунка
  onChange: function (data) {
    changeValueInputsPrice(data)
  }
});
// сохраняем ползунок в переменную, чтобы потом обновлять его
var sliderPrice = $("#filter-price > input").data("ionRangeSlider");
// при изменении input'ов цены
$parentInputsPrice.children().on('input', function(e) {
  // запрещаем ввод всего, кроме цифр
  this.value = this.value.replace(/[^0-9\.]/g, '')
  // получаем текущие значение input'ов
  var fromInput = $('#filter-price-start').val().replace(/[^0-9\.]/g, '')
  var toInput = $('#filter-price-end').val().replace(/[^0-9\.]/g, '')

  // обновляем ползунок на значение input'ов
  sliderPrice.update({
    from: fromInput,
    to: toInput
  })
  // форматируем вывод значений по сотням
  this.value = this.value.replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ');
})
// проверка, чтобы значения не были <> min/max ползунка
$parentInputsPrice.children().on('change', function(e) {
  // флаг для проверки, нужно ли обновлять ползунок
  var flagError = false
  // получаем текущие значение input'ов
  var fromInput = parseInt($('#filter-price-start').val().replace(/[^0-9\.]/g, ''))
  var toInput = parseInt($('#filter-price-end').val().replace(/[^0-9\.]/g, ''))
  // получаем параметры ползунка
  var paramsSlider = sliderPrice.result;
  var outMin = paramsSlider.min.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ');
  var outMax = paramsSlider.max.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ');
  // проверка ОТ
  if (paramsSlider.min > fromInput) {
    $('#filter-price-start').val(outMin)
    flagError = true
  } else if (paramsSlider.min > toInput) {
    $('#filter-price-start').val(outMin)
    $('#filter-price-end').val(outMin)
    flagError = true
  }
  // проверка ДО
  if (paramsSlider.max < fromInput) {
    $('#filter-price-start').val(outMax)
    $('#filter-price-end').val(outMax)
    flagError = true
  } else if (paramsSlider.max < toInput) {
    $('#filter-price-end').val(outMax)
    flagError = true
  }
  
  if (flagError) {
    // получаем текущие значение input'ов
    var fromInput = parseInt($('#filter-price-start').val().replace(/[^0-9\.]/g, ''))
    var toInput = parseInt($('#filter-price-end').val().replace(/[^0-9\.]/g, ''))

    // обновляем ползунок на значение input'ов
    sliderPrice.update({
      from: fromInput,
      to: toInput
    })
  }
})

// Ползунки вот тут
// http://ionden.com/a/plugins/ion.rangeSlider/demo.html

// ползунок фильтра - год
var $parentInputsYear = $('#filter-year').prev()
function changeValueInputsYear(data) {
  $parentInputsYear.children('#filter-year-start').val(data.from_pretty)
  $parentInputsYear.children('#filter-year-end').val(data.to_pretty)
}
$("#filter-year > input").ionRangeSlider({
  // все параметры можно прописать на прямую у input через data
  // data-min="1000000"
  type: "double",
  // минимальное/ максимальное для ползунка
  min: 1990,
  max: 2022,
  // шаг при проктутке
  step: 1,
  // убираем префик делящий по сотням
  prettify_separator: "",
  // встроенные блоки, которые не нужны
  hide_min_max: true,
  hide_from_to: true,
  grid_margin: false,
  // при старте нужно задать input'ам значение мин и макс
  onStart: function (data) {
    changeValueInputsYear(data)
  },
  // меняем значение input'ам на значение ползунка
  onChange: function (data) {
    changeValueInputsYear(data)
  }
});
// сохраняем ползунок в переменную, чтобы потом обновлять его
var sliderYear = $("#filter-year > input").data("ionRangeSlider");
// при изменении input'ов цены
$parentInputsYear.children().on('input', function(e) {
  // запрещаем ввод всего, кроме цифр
  this.value = this.value.replace(/[^0-9\.]/g, '')
  // получаем текущие значение input'ов
  var fromInput = $('#filter-year-start').val().replace(/[^0-9\.]/g, '')
  var toInput = $('#filter-year-end').val().replace(/[^0-9\.]/g, '')
  // обновляем ползунок на значение input'ов
  sliderYear.update({
    from: fromInput,
    to: toInput
  })
})
// проверка, чтобы значения не были <> min/max ползунка
$parentInputsYear.children().on('change', function(e) {
  // флаг для проверки, нужно ли обновлять ползунок
  var flagError = false
  // получаем текущие значение input'ов
  var fromInput = parseInt($('#filter-year-start').val())
  var toInput = parseInt($('#filter-year-end').val())
  // получаем параметры ползунка
  var paramsSlider = sliderYear.result;
  var outMin = paramsSlider.min
  var outMax = paramsSlider.max
  // проверка ОТ
  if (paramsSlider.min > fromInput) {
    $('#filter-year-start').val(outMin)
    flagError = true
  } else if (paramsSlider.min > toInput) {
    $('#filter-year-start').val(outMin)
    $('#filter-year-end').val(outMin)
    flagError = true
  }
  // проверка ДО
  if (paramsSlider.max < fromInput) {
    $('#filter-year-start').val(outMax)
    $('#filter-year-end').val(outMax)
    flagError = true
  } else if (paramsSlider.max < toInput) {
    $('#filter-year-end').val(outMax)
    flagError = true
  }
  
  if (flagError) {
    // получаем текущие значение input'ов
    var fromInput = $('#filter-year-start').val()
    var toInput = $('#filter-year-end').val()

    // обновляем ползунок на значение input'ов
    sliderYear.update({
      from: fromInput,
      to: toInput
    })
  }
})

// обработка сброса фильтра
$('.catalog_wrap__filter_content').on('reset', function() {
  setTimeout(function() {
    sliderYear.update({
      from: sliderYear.result.min,
      to: sliderYear.result.max,
    })
    sliderPrice.update({
      from: sliderPrice.result.min,
      to: sliderPrice.result.max,
    }) 
    changeValueInputsPrice(sliderPrice.result)
    changeValueInputsYear(sliderYear.result)
  }, 0)
})

// закрытие фильтра
$('.close-filter, .filter-mobil-footer > input[submit]').on('click', function() {
  $('.catalog_wrap__filter').removeClass('filter--open')
})
// открытие фильтра
$('.catalog-filter--button').on('click', function() {
  $('.catalog_wrap__filter').addClass('filter--open')
})

// УДАЛИ ЭТОТ БЛОК, ЭТО ЧТОБЫ НА ОТПРАВКЕ ЗАЯВКИ СТРАНИЦА НЕ ОБНОВЛЯЛАСЬ
// ЧЕРЕЗ AJAX СДЕЛАЕШЬ
$('.modal-bid_wrap__form').submit(function() {
  return false
})

// смена блоков на заявке (страница машины)
$('.modal-bid_wrap__form > button').on('click', function(e) {
  $('.modal-bid_wrap').addClass('modal-bid_wrap--confirm')
})

// закрытие заявки
$('.modal-bid-close').on('click', function() {
  $('.modal-bid').removeClass('modal-bid--active')
  $('body').css({'overflow' : 'visible'})
})

// открытие заявки
$('#open-modal-bid').on('click', function() {
  $('.modal-bid').addClass('modal-bid--active')
  $('body').css({'overflow' : 'hidden'})
})
