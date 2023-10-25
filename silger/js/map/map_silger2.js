// Яндекс карта
ymaps.ready(init);
function init(){
    // Начальное положение карт для Silger
    location_silger2 = new ymaps.Map("location_silger2", {
        center: [42.861794, 132.661003],
        zoom: 15
    });
    // Маркер Silger2
    Silger2_2 = new ymaps.Placemark([42.858525, 132.674619], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'assets/icons/map_pointer.svg',
        iconImageSize: [66, 92],
        iconImageOffset: [-33, -92]
    });
    // Добавление маркеров на карту
    location_silger2.geoObjects.add(Silger2_2);
    // Удаление объектов управления
    location_silger2.controls.remove('largeMapDefaultSet')
    .remove('smallMapDefaultSet');
}