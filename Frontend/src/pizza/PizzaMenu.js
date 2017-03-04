/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML едемент куди будуть додаватися піци

var $pizza_list = $("#pizza_list");
var $inCart = $(".inCart");
var $number = $inCart.text();
var $sum = $(".summ");
var $summa = parseInt($sum.text());

var content = require('../API');
content.getPizzaList(function(exception, PizzaList){
    Pizza_List=PizzaList;
    initialiseMenu();
});

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");
    if ($number == 0) {
        $summa = 0;
    }
    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});
        var $price = $(".price");
        var $node = $(html_code);


        $node.find(".buy-big").click(function () {

                    var $number = $inCart.text();
                    PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
                    $number++;
                    $inCart.text($number);
                    $summa += pizza.big_size.price;
                    $sum.text($summa);

        });
        $node.find(".buy-small").click(function () {
            var $number = $inCart.text();
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
            $number++;
            $inCart.text($number);
            $summa += pizza.small_size.price;
            ;
            $sum.text($summa);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}

var $node = $(".container");
$node.find(".meat").click(function () {
    filterPizza('М’ясна піца');
});
$node.find(".pineapple").click(function () {
    filterPizza('М’ясна піца');
});
$node.find(".mushrooms").click(function () {
    filterPizza('М’ясна піца');
});
$node.find(".seafood").click(function () {
    filterPizza('Морська піца');
});
$node.find(".vega").click(function () {
    filterPizza('Вега піца');
});
$node.find(".all").click(function () {
    filterPizza('all');
});

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати

    if (filter == "all") {
        showPizzaList(Pizza_List);
    } else {
        var pizza_shown = [];
        Pizza_List.forEach(function (pizza) {
            if (pizza.type == filter) {
                pizza_shown.push(pizza);
            }
        });

        //Показати відфільтровані піци
        showPizzaList(pizza_shown);
    }

}

//
// // Compare the textbox's current and last value.  Report a change to the console.
// function watchTextbox() {
//     var txtInput = $('#txtInput');
//     var lastValue = txtInput.data('lastValue');
//     var currentValue = txtInput.val();
//     if (lastValue != currentValue) {
//         console.log('Value changed from ' + lastValue + ' to ' + currentValue);
//         txtInput.data('lastValue', currentValue);
//     }
// }
//
// // Record the initial value of the textbox.
// $('#txtInput').data('lastValue', $('#txtInput').val());
//
// // Bind to the keypress and user-defined set event.
// $('#txtInput').bind('keypress set', null, watchTextbox);
//
// // Example of JS code triggering the user event
// $('#btnSetText').click(function (ev) {
//     $('#txtInput').val('abc def').trigger('set');
// });
// If you don't have control over that code, you could use setInterval() to 'watch' the textbox for changes:
//
// // Check the textbox every 100 milliseconds.  This seems to be pretty responsive.
// setInterval(watchTextbox, 100);


function initialiseMenu() {
    //Показуємо усі піци
    showPizzaList(Pizza_List)
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;