/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};
var Storage = require('../storage');


// //Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок

    //Приклад реалізації, можна робити будь-яким іншим способом
    var i = 0;
    var k =0;
    for (i = 0; i < Cart.length; i++) {
        if (Cart[i].pizza.title == pizza.title
            && Cart[i].size == size) {
            Cart[i].quantity++;
            k++;
        }
    }
    if(k==0) {
        Cart.push({
            pizza: pizza,
            size: size,
            quantity: 1
        });
    }
    Storage.set("cart", Cart);

    updateCart();


    //Оновити вміст кошика на сторінці


}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    //TODO: треба зробити
    var i = 0;
    var Copy = [];
    for (i = 0; i < Cart.length; i++) {
        if (Cart[i].pizza.title == cart_item.pizza.title
            && Cart[i].size == cart_item.size) {
            continue;
        } else {
            Copy.push(Cart[i]);
        }
        ;
        console.log("current_It", Cart[i].pizza.title);
        console.log("Cart_It", cart_item.pizza.title)
    }

    Cart = Copy;
    //Після видалення оновити відображення
    Storage.set("cart", Cart);
    Storage.set("quantity", cart_item.quantity);
    updateCart();


}


function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...

//get
    var saved_orders = Storage.get('cart');
    if (saved_orders) {
        Cart = saved_orders;
    }
    // var saved_amount = Storage.get('quantity');
    // if (saved_amount) {
    //     Cart.cart_item = saved_amount;
    // }
    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}


function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");
    localStorage.removeItem('Cart');

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);
        var $sum = $(".summ")
        var $summa = parseInt($sum.text());
        var $node = $(html_code);

        function plus(cart_item) {

            //Збільшуємо кількість замовлених піц
            cart_item.quantity++;
            console.log("cart ", cart_item);
            if (cart_item.pizza.big_size)
                $summa += cart_item.pizza.big_size.price;
            if (cart_item.pizza.small_size)
                $summa += cart_item.pizza.small_size.price;
            if ($summa > 0) {
                $sum.text($summa);
            } else {
                $summa = 0;
                $sum.text($summa);
            }
            //Оновлюємо відображення
            Storage.set("cart", Cart);
            Storage.set("quantity", cart_item.quantity);

            updateCart();
        }

        function minus(cart_item) {
            if (cart_item.quantity === 1) {
                var $inCart = $(".inCart");
                var $number = $inCart.text();
                if (cart_item.pizza.big_size)
                    $summa -= cart_item.pizza.big_size.price;
                if (cart_item.pizza.small_size)
                    $summa -= cart_item.pizza.small_size.price;
                if ($summa > 0) {
                    $sum.text($summa);
                } else {
                    $summa = 0;
                    $sum.text($summa);
                }
                removeFromCart(cart_item);
                $number--;
                $inCart.text($number);
            }
            if (cart_item.quantity > 1) {
                cart_item.quantity--;
            }


            //Оновлюємо відображення
            Storage.set("cart", Cart);
            Storage.set("quantity", cart_item.quantity);
            updateCart();

        }

        function cross(cart_item) {
            var $inCart = $(".inCart");
            var $number = $inCart.text();
            console.log("NODE  ", $node);
            if (cart_item.pizza.big_size)
                $summa -= cart_item.pizza.big_size.price;
            if (cart_item.pizza.small_size)
                $summa -= cart_item.pizza.small_size.price;
            if ($summa > 0) {
                $sum.text($summa);
            } else {
                $summa = 0;
                $sum.text($summa);
            }
            Storage.set("cart", Cart);
            Storage.set("quantity", cart_item.quantity);
            removeFromCart(cart_item);
            $number--;
            $inCart.text($number);

        }

        function clear() {
            for (i = 0; i < Cart.length; i++) {
                Cart.pop();
            }
            updateCart();
            var $sum = $(".summ")
            var $summa = parseInt($sum.text());
            var $inCart = $(".inCart");
            var $number = $inCart.text();
            $summa = 0;
            $sum.text($summa);
            $number = 0;
            $inCart.text($number);
            Storage.set("cart", Cart);
            Storage.set("quantity", cart_item.quantity);
        }

        $node.find(".plus").click(function () {
            plus(cart_item);
        });


        $node.find(".minus").click(function () {
            minus(cart_item);
        });


        $node.find(".cross").click(function () {
            cross(cart_item);
        });

        var $rnode = $(".rightPanel");
        $rnode.find(".clear").click(function () {
            clear();
        });

        $cart.append($node);

    }

    Cart.forEach(showOnePizzaInCart);
    localStorage.setItem('Cart', Cart);
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;