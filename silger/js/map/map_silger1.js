// Яндекс карта
ymaps.ready(init);
function init(){
    // Начальное положение карт для Silger
    location_silger1 = new ymaps.Map("location_silger1", {
        center: [42.863794, 132.670003],
        zoom: 16
    });
    // Маркер Silger1
    Silger1_2 = new ymaps.Placemark([42.863210, 132.668834], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'assets/icons/map_pointer.svg',
        iconImageSize: [66, 92],
        iconImageOffset: [-20, -92]
    });
    // Добавление маркеров на карту
    location_silger1.geoObjects.add(Silger1_2);
    // Удаление объектов управления
    location_silger1.controls.remove('largeMapDefaultSet')
    .remove('smallMapDefaultSet');
}