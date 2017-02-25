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

function initialiseMenu() {
    //Показуємо усі піци
    showPizzaList(Pizza_List)
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;