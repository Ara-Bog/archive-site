if ($(window).width() > '999') {
  $('.menu').hover(function() {
    $(this).toggleClass('menu_active');
    $('.ru a').text(function(i, v){
      return v === 'Ru' ? 'Russian' : 'Ru'
    });
    $('.shadow').toggleClass('shadow_active');
  })
} else {
  $('.sandwich').click(function() {
    $('.sandwich').toggleClass('cross');
    $('.menu').toggleClass('menu_active');
    $('.shadow').toggleClass('shadow_active');
    $('.ru a').text(function(i, v){
      return v === 'Ru' ? 'Russian' : 'Ru'
    });
  })
}

if ($(window).width() < '992') {
  $('.camp__text').addClass('order-1');
  $('.camp__img').addClass('order-2');
}

$('.product a').click(function() {
  var v = $(this).attr('id');
  $('div.product a').removeClass('active_product');
  $(this).addClass('active_product');
  $('div#pruf div').removeClass('active_pruf');  
  $('div#pruf div#' + v).addClass('active_pruf');
  $('div.text_info div').removeClass('active_info');
  $('div.text_info div#' + v).addClass('active_info');    
})

$('.contact_form').focus(function() {
  $(this).siblings().addClass('active_label');
})

$('.contact_form').focusout(function() {
  $('div.contact_block label').removeClass('active_label');
})

$('.multiple-items').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 2000
      }
    }
  ]
});

