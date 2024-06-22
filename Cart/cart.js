viewCart()
function viewCart() {
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    var container = document.getElementsByClassName("contianer")[0]
    container.innerHTML = ''

    var MainDiv = document.createElement("div");
    MainDiv.classList.add("cart-body")
    container.appendChild(MainDiv)

    var MainDiv2 = document.createElement("div")
    MainDiv2.classList.add("TotalPrice")
    container.appendChild(MainDiv2)
    
    var para = document.createElement("p")
    para.innerText = "Your order qualifies for FREE Shipping Choose this option at checkout"
    MainDiv2.appendChild(para)

    MainDiv2.appendChild(document.createElement("br"))
    MainDiv2.appendChild(document.createElement("hr"))
    MainDiv2.appendChild(document.createElement("br"))

    var heading = document.createElement("h3")
    var subtotal = 0
        for (const key in cartItems) {
            subtotal += cartItems[key].price
            heading.innerHTML = "Subtotal : " + subtotal + " EGP"
        }


        MainDiv2.appendChild(heading)


        MainDiv2.appendChild(document.createElement("br"))

        var ConfirmBtn = document.createElement("button")
        ConfirmBtn.classList.add("confirmBtn")
        ConfirmBtn.innerHTML = "Proceed to Buy"

        MainDiv2.appendChild(ConfirmBtn)
        
    ConfirmBtn.addEventListener("click", function () {
        alert("Thank you for your payment! Your order has been successfully processed.")
    })

    var innerDiv = document.createElement("div")
    MainDiv.appendChild(innerDiv)
    innerDiv.classList.add("inner")

    var shopSpan = document.createElement("span")
    shopSpan.classList.add("shop")
    shopSpan.innerHTML = "Shopping Cart"

    var priceSpan = document.createElement("span")
    priceSpan.innerHTML = "Price"
    priceSpan.classList.add("price")

    innerDiv.appendChild(shopSpan)
    innerDiv.appendChild(priceSpan)

    MainDiv.appendChild(document.createElement("hr"))

    if (cartItems.length === 0) {
        container.removeChild(MainDiv2)
        MainDiv.innerHTML = '<p>Your cart is empty</p>'
    }
    for (let index = 0; index < cartItems.length; index++) {
        var ProductDiv = document.createElement("div")
        ProductDiv.classList.add("productDiv")
        ProductDiv.setAttribute("id", cartItems[index].id)

        MainDiv.appendChild(ProductDiv)

        var image = document.createElement("img")
        image.classList.add("image-cart")
        image.src = cartItems[index].image
        ProductDiv.appendChild(image)

        var TextDiv = document.createElement("div")
        TextDiv.classList.add("textDiv")

        var btn = document.createElement("button")
        btn.classList.add("btn")
        btn.innerText = "X"
        btn.setAttribute("num", cartItems[index].id)
        TextDiv.appendChild(btn)
        btn.addEventListener("click", function () {
            let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            cartItems.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cartItems));
            viewCart()
            updateCartCounter()
        });

        var h3 = document.createElement("h3")
        h3.innerHTML = cartItems[index].title
        h3.classList.add("name")
        TextDiv.appendChild(h3)

        var description = document.createElement("p")
        description.classList.add("description")
        description.innerText = cartItems[index].description
        TextDiv.appendChild(description)

        var p = document.createElement("p")
        p.classList.add("pricePar")
        p.innerText = cartItems[index].price + " EGP"
        TextDiv.appendChild(p)

        ProductDiv.appendChild(TextDiv)
    }

    if (cartItems.length != 0) {
        var ConfirmDiv = document.createElement("div")
        ConfirmDiv.classList.add("confirm")
        MainDiv.appendChild(ConfirmDiv)

        var heading2 = document.createElement("h3")
        heading2.classList.add("heading2")
        heading2.innerHTML = "Subtotal : " + subtotal + " EGP"
        ConfirmDiv.appendChild(heading2)
    }
    updateCartCounter()
}

function updateCartCounter() {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let cartCounter = document.querySelector(".cart");
    cartCounter.setAttribute('data-content', cartItems.length);
}

let user = JSON.parse(localStorage.getItem("currentUser"))
if (user) {
    const navRight = document.querySelector('.nav-right');
    navRight.innerHTML = `
    <h4>Welcome <span id="username">${user.name}</span></h4>
    <a href="../index.html">Home</a>
    <a href="#" onclick="logout()">Logout</a>
    <div class="cart">
    <a href="./Cart/cart.html">
    <span class="cart-counter">0</span>
    <span><i class="fa-solid fa-cart-shopping"></i></span>
    </a>
    <p>Cart</p>
    </div>
    `
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = './index.html';
}