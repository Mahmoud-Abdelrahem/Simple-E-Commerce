let data = {}
let xhr = new XMLHttpRequest()
xhr.open("get", "https://fakestoreapi.com/products")
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4 && xhr.status == 200) {
    data = JSON.parse(xhr.response)
    addProducts(data)
    addToCart()
    updateCartCounter()
    viewProduct()
  }
}
xhr.send()

function addProducts(data) {
  let container = document.getElementsByClassName("product-container")[0];
  data.forEach(product => {
    let card = document.createElement("div");
    card.classList.add("product-card");
    card.setAttribute("id", product.id)

    let img = document.createElement("img");
    img.src = product.image;
    card.appendChild(img);

    let product_info = document.createElement("div")
    product_info.classList.add("product-info");
    card.appendChild(product_info)

    let title = document.createElement("p")
    title.textContent = product.title;
    product_info.appendChild(title)

    let rate = document.createElement("div")
    rate.classList.add("rate")
    product_info.appendChild(rate)

    for (let i = 0; i < 5; i++) {
      let star = document.createElement("span");
      star.innerHTML = i < Math.round(product.rating.rate) ? "&#9733;" : "&#9734;";
      rate.appendChild(star);
    }

    let price = document.createElement("div")
    price.classList.add("price")
    product_info.appendChild(price)

    let priceValue = document.createElement("p");
    priceValue.textContent = `EGP ${product.price}`;
    price.appendChild(priceValue);

    let buttons = document.createElement("div");
    buttons.classList.add("buttons")
    card.appendChild(buttons)

    let viewButton = document.createElement("button");
    viewButton.setAttribute("data-id", product.id);
    viewButton.classList.add("viewproduct")
    viewButton.textContent = "View Product";
    buttons.appendChild(viewButton)

    let cartButton = document.createElement("button");
    cartButton.setAttribute("data-id", product.id);
    cartButton.classList.add("addtocart")
    cartButton.textContent = "Add To Cart";
    buttons.appendChild(cartButton)


    container.appendChild(card)
  });
}

function addToCart() {
  let addToCart = document.querySelectorAll(".addtocart")
  addToCart.forEach(element => {
    element.addEventListener("click", function () {
      let productId = element.getAttribute("data-id");
      let product = data.find(item => item.id == productId);
      let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      cartItems.push(product);
      localStorage.setItem('cart', JSON.stringify(cartItems));
      updateCartCounter()
    })
  })
}

function updateCartCounter() {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  let cartCounter = document.querySelector(".cart-counter");
  cartCounter.textContent = cartItems.length;
}

function viewProduct() {
  let viewProduct = document.querySelectorAll(".viewproduct")
  viewProduct.forEach(element => {
    element.addEventListener("click", function () {
      let productId = element.getAttribute("data-id");
      window.location.assign("./Product/product.html?id=" + productId)
    })
  })
}

let user = JSON.parse(localStorage.getItem("currentUser"))
if (user) {
  const navRight = document.querySelector('.nav-right');
  navRight.innerHTML = `
    <h4>Welcome <span id="username">${user.name}</span></h4>
    <a href="./index.html">Home</a>
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