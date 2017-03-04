/**
 * Created by chaika on 09.02.16.
 */
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');

//sending info to the server after pressing the button

var html_code = pages.orderPage();
var $node = $(html_code);

$node.find(".next").click(function () {
    var $name=$node.find("#user_name").text();
    var $phone=$node.find("#user_phone").text();
    var $adress=$node.find("#user_adress").text();
    var content = require('../API');
    content.createOrder($name);
    content.createOrder($phone);
    content.createOrder($adress);
    console.log("success");
});


function readName(){
    // var $name=$node.find("#user_name").text();

}
function readPhone(){
    if((document.getElementById('#user_name').value.indexOf("+"))>="0"||
        (document.getElementById('#user_name').value.indexOf("0"))>="0")
    {
        $node.find("#user_name").style.color="green";
    }else{
        $node.find("#user_name").style.color="red";
    }
}
function readAdress(){

}


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