/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

var $pizza_list = $("#pizza_list");
var $inCart = $(".inCart");
var $number = $inCart.text();
var $sum = $(".summ");
var $summa = 0;

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});
        var $price = $(".price");
        var $node = $(html_code);


        $node.find(".buy-big").click(function () {
            //checking(pizza);
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
            }
        );

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}


function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];
    var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

    var $node = $(html_code);

    $node.find(".meat").click(function () {

        Pizza_List.forEach(function (pizza) {
            //Якщо піка відповідає фільтру
            if (pizza.type == 'М’ясна піца') {
                pizza_shown.push(pizza);
            }
            //TODO: зробити фільтри
        });

        //Показати відфільтровані піци
        showPizzaList(pizza_shown);
    });
}

function initialiseMenu() {
    //Показуємо усі піци
    showPizzaList(Pizza_List)
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;