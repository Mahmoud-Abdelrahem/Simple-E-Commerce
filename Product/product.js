const productId = window.location.search.split("=")[1];
let product = {}
var date = new Date();
date.setDate(date.getDate() + 5);
var options = { weekday: 'short', month: 'short', day: 'numeric' };
var formattedDate = date.toLocaleDateString('en-US', options);
let xhr = new XMLHttpRequest()
xhr.open("get", "https://fakestoreapi.com/products/" + productId)
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4 && xhr.status == 200) {
    data = JSON.parse(xhr.response)
    viewProduct(data)
    addToCart()
    updateCartCounter()
  }
}
xhr.send()

function viewProduct(product) {
  let product_details = document.getElementsByClassName("product-details")[0]
  if (!product) {
    product_details.innerHTML = "<h1>Product not found</h1>"
  }

  let product_image = document.createElement("div")
  product_image.classList.add("product-image");

  let img = document.createElement("img")
  img.src = product.image
  product_image.appendChild(img)
  product_details.appendChild(product_image)

  let prod_details = document.createElement("div")
  prod_details.classList.add("prod-details");

  let top = document.createElement("div")
  top.classList.add("top");
  let title = document.createElement("h1")
  title.textContent = product.title
  let category = document.createElement("h5")
  category.innerHTML = "Category: " + product.category

  let rate = document.createElement("div")
  rate.classList.add("rate");
  let countRate = document.createElement("span")
  countRate.classList.add("rate-count");
  countRate.textContent = product.rating.rate
  rate.appendChild(countRate)

  for (let i = 0; i < 5; i++) {
    let star = document.createElement("span");
    star.classList.add("stars")
    star.innerHTML = i < Math.round(product.rating.rate) ? "&#9733;" : "&#9734;";
    rate.appendChild(star);
  }
  let hr = document.createElement("hr")

  top.appendChild(title)
  top.appendChild(category)
  top.appendChild(rate)
  prod_details.appendChild(top)
  prod_details.appendChild(hr)
  product_details.appendChild(prod_details)

  let bottom = document.createElement("div")
  bottom.classList.add("bottom");

  let price = document.createElement("div")
  price.classList.add("price")
  price.innerHTML = `<sup>EGP</sup> <span>${product.price}</span>`

  let decription = document.createElement("div")
  decription.classList.add("decription");

  let decriptionH2 = document.createElement("h2")
  decriptionH2.textContent = "Description: "
  decription.appendChild(decriptionH2)

  let decriptionP = document.createElement("p")
  decriptionP.textContent = product.description
  decription.appendChild(decriptionP)

  bottom.appendChild(price)
  bottom.appendChild(decription)
  prod_details.appendChild(bottom)

  let product_box = document.createElement("div")
  product_box.classList.add("product-box")


  let box_price = document.createElement("div")
  box_price.classList.add("box-price")
  box_price.innerHTML = `<sup>EGP </sup><span> ${product.price}</span>`
  product_box.appendChild(box_price)

  let box_delivery = document.createElement("div")
  box_delivery.classList.add("box-delivery")
  box_delivery.innerHTML = `EGP26 delivery <span>${formattedDate}</span>. Order within 7 hrs 17 mins.`
  product_box.appendChild(box_delivery)

  let box_location = document.createElement("div")
  box_location.classList.add("box-location")
  box_location.innerHTML = `<i class="fa-solid fa-location-dot"></i> Deliver to Egypt`
  product_box.appendChild(box_location)

  let cartButton = document.createElement("button");
  cartButton.setAttribute("data-id", product.id);
  cartButton.classList.add("addtocart")
  cartButton.textContent = "Add To Cart";
  product_box.appendChild(cartButton)

  product_details.appendChild(product_box)
}

function addToCart() {
  let addToCart = document.querySelectorAll(".addtocart")
  addToCart.forEach(element => {
    element.addEventListener("click", function () {
      let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      cartItems.push(data);
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