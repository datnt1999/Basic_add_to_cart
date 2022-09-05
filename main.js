
var cartIcon = document.querySelector('#cart-icon')
var cart = document.querySelector('.cart')
var closeCart = document.querySelector('#close-cart')

var clickOpenCart = () => {
    cart.classList.add("active")
}
var clickCloseCart = () => {
    cart.classList.remove("active")
}
cartIcon.onclick = clickOpenCart
closeCart.onclick = clickCloseCart
// Cart working Js
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}
else {
    ready()
}
function ready() {
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityCarts = document.querySelectorAll('.cart-quantity')
    for (var quantityCart of quantityCarts) {
        quantityCart.addEventListener('change', quantityChange)
    }

    var addCarts = document.querySelectorAll(".add-cart")
    for (var addCart of addCarts) {
        addCart.addEventListener("click", addCartClick)
    }
    document.querySelector('.btn-buy').addEventListener('click', buyButtonClick)
}
function buyButtonClick() {
    alert('Your order is placed')
    var cartContent = document.querySelector('.cart-content')
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild)
    }
    updateTotal()
}
function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updateTotal()
}

function quantityChange(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateTotal()
}

function addCartClick(event) {
    var button = event.target
    var shopProducts = button.parentElement
    var title = shopProducts.querySelector('.product-title').innerHTML
    var price = shopProducts.querySelector('.price').innerHTML
    var productImg = shopProducts.querySelector('.product-img').src
    addProductToCart(title, price, productImg)
    updateTotal()
}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement('div')
    cartShopBox.classList.add('cart-box')
    var cartItems = document.querySelector('.cart-content')
    var cartTitles = cartItems.querySelectorAll('.cart-product-title')
    for (var cartTitle of cartTitles) {
        if (cartTitle.innerHTML == title) {
            let quantityItem = cartTitle.parentElement.querySelector(".cart-quantity")
            quantityItem.value = parseInt(quantityItem.value) + 1
            updateTotal()
            return
        }
    }
    var cartBoxContent = `
                    <img src="${productImg}" alt="" class="cart-img">
                    <div class="detail-box">
                        <div class="cart-product-title">${title}</div>
                        <div class="cart-price">${price}</div>
                        <input type="number" value="1" class="cart-quantity">
                    </div>
                    <i class='bx bxs-trash-alt cart-remove'></i>
    `
    cartShopBox.innerHTML = cartBoxContent
    console.log(cartShopBox)
    cartItems.append(cartShopBox)
    cartShopBox.querySelector('.cart-remove').addEventListener('click', removeCartItem)
    cartShopBox.querySelector('.cart-quantity').addEventListener('change', quantityChange)
    updateTotal()
}

function updateTotal() {
    var priceCarts = document.querySelectorAll('.cart-price')
    var quantityCarts = document.querySelectorAll('.cart-quantity')

    var total = 0
    var countIt = 0
    for (var i = 0; i < priceCarts.length; i++) {
        var price = parseFloat(priceCarts[i].innerHTML.replace("$", ""))
        var quantity = quantityCarts[i].value
        total = total + price * quantity
        total = Math.round(total * 100) / 100
        countIt += parseInt(quantity)
    }
    document.querySelector('.total-price').innerHTML = "$" + total
    if (countIt > 0) {
        document.querySelector('.count-item').innerHTML = countIt
        document.querySelector('.count-item').classList.add("active-count-item")
    }
    else {
        document.querySelector('.count-item').classList.remove("active-count-item")
    }
}



































// var updateTotal = () => {
//     var cartContent = document.getElementsByClassName('cart-content')[0]
//     var cartBoxes = cartContent.getElementsByClassName('cart-box')
//     var total = 0
//     for (var i = 0; i < cartBoxes.length; i++) {
//         var cartBox = cartBoxes[i]
//         var priceElement = cartBox.getElementsByClassName("cart-price")[0]
//         var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0]
//         var price = parseFloat(priceElement.innerText.replace("$", ""))
//         var quantity = quantityElement.value
//         total = total + price * quantity
//     }
//     document.getElementsByClassName("total-price")[0].innerText = "$" + total
// }

