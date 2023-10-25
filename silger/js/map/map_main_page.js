// Яндекс карта
ymaps.ready(init);
function init(){
    // Начальное положение на карте
    if ($(window).outerWidth() > '1000') {
        myMap = new ymaps.Map("map", {
            center: [42.861794, 132.664903],
            zoom: 16
        });
    } else if ($(window).outerWidth() < '750') {
        myMap = new ymaps.Map("map", {
            center: [42.861794, 132.670003],
            zoom: 15
        });
    } else if ($(window).outerWidth() < '1000') {
        myMap = new ymaps.Map("map", {
            center: [42.861794, 132.661003],
            zoom: 15
        });
    }
    // Маркер Silger1
    Silger1 = new ymaps.Placemark([42.863210, 132.668834], {}, {
        iconLayout: 'default#image',
        iconImageHref: '../../icons/map_pointer.svg',
        iconImageSize: [66, 92],
        iconImageOffset: [-33, -92]
    });
    // Маркер Silger2 
    Silger2 = new ymaps.Placemark([42.858525, 132.674619], {}, {
        iconLayout: 'default#image',
        iconImageHref: '../../icons/map_pointer.svg',
        iconImageSize: [66, 92],
        iconImageOffset: [-33, -92]
    });
    // Добавление маркеров на карту
    myMap.geoObjects.add(Silger1)
    .add(Silger2);
    // Удаление объектов управления
    myMap.controls.remove('largeMapDefaultSet')
    .remove('smallMapDefaultSet');
}