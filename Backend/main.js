/**
 * Created by chaika on 09.02.16.
 */
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
// var formPage = require('./common/formPage');
// var $node = $(formPage);
// $node.find("next")
// var pages = require('./pages');
//
// //sending info to the server after pressing the button
//
// var html_code = pages.orderPage();
// var $node = $(html_code);
//
// $node.find(".next").click(function () {
//     var $name=$node.find("#user_name").text();
//     var $phone=$node.find("#user_phone").text();
//     var $adress=$node.find("#user_adress").text();
//     var content = require('../API');
//     content.createOrder($name, function(err,order_info, callback){});
//     content.createOrder($phone, function(err,order_info, callback){});
//     content.createOrder($adress, function(err,order_info, callback){});
//     console.log("success");
// });


// function initialize() {
// //Тут починаємо працювати з картою
//     var mapProp = {
//         center: new google.maps.LatLng(50.464379,30.519131),
//         zoom: 11
//     };
//     var html_element = document.getElementById("googleMap");
//     var map = new google.maps.Map(html_element, mapProp);
// //Карта створена і показана
// }
// //Коли сторінка завантажилась
// google.maps.event.addDomListener(window, 'load', initialize);
//


function configureEndpoints(app) {
    var pages = require('./pages');
    var api = require('./api');

    //Налаштування URL за якими буде відповідати сервер
    //Отримання списку піц
    app.get('/api/get-pizza-list/', api.getPizzaList);
    app.post('/api/create-order/', api.createOrder);

    //Сторінки
    //Головна сторінка
    app.get('/', pages.mainPage);

    //Сторінка замовлення
    app.get('/order.html', pages.orderPage);

    //Якщо не підійшов жоден url, тоді повертаємо файли з папки www
    app.use(express.static(path.join(__dirname, '../Frontend/www')));
}

function startServer(port) {
    //Створюється застосунок
    var app = express();

    //Налаштування директорії з шаблонами
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    //Налаштування виводу в консоль списку запитів до сервера
    app.use(morgan('dev'));

    //Розбір POST запитів
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    //Налаштовуємо сторінки
    configureEndpoints(app);

    //Запуск додатка за вказаним портом
    app.listen(port, function () {
        console.log('My Application Running on http://localhost:'+port+'/');
    });
}

exports.startServer = startServer;