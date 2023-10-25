// Яндекс карта
ymaps.ready(init);
function init(){
    // Начальное положение на карте
    if ($(window).outerWidth() > '1000') {
        myMap = new ymaps.Map("map", {
            center: [43.334538, 132.116855],
            zoom: 16
        });
    } else if ($(window).outerWidth() < '770') {
        myMap = new ymaps.Map("map", {
            center: [43.334538, 132.118555],
            zoom: 15
        });
    } else if ($(window).outerWidth() < '1000') {
        myMap = new ymaps.Map("map", {
            center: [43.334538, 132.110055],
            zoom: 15
        });
    }
    // Маркер
    map_pointer = new ymaps.Placemark([43.334538, 132.116855], {}, {
        iconLayout: 'default#image',
        iconImageHref: '../icons/marker.svg',
        iconImageSize: [66, 92],
        iconImageOffset: [-33, -92]
    });
    // Добавление маркеров на карту
    myMap.geoObjects.add(map_pointer);
    // Удаление объектов управления
    myMap.controls.remove('largeMapDefaultSet')
    .remove('smallMapDefaultSet');;
}