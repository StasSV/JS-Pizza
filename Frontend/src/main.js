/**
 * Created by chaika on 25.01.16.
 */

$(function(){
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var Pizza_List = require('./Pizza_List');

    PizzaCart.initialiseCart();
    PizzaMenu.initialiseMenu();

    var API =require("./API");
    $(".pay").click(function(){
        API.createOrder({pizza: [], name: "Hello"}, function(err, result){
            if(!err) {
                LiqPayCheckout.init({
                    data:result.data,
                    signature: result.signature,
                    embedTo: "#liqpay_checkout",
                    mode: "embed" // embed || popup
                }).on("liqpay.callback", function (data) {
                    console.log(data.status);
                    console.log(data);
                }).on("liqpay.ready", function (data) {
                    // ready
                }).on("liqpay.close", function (data) {
                    // close
                });
            }
        })


    })


});

