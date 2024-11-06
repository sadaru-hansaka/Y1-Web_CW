let iconCart = document.querySelector('.fa-cart-shopping');
let closeCart = document.querySelector('.close-cart');
let cart = document.querySelector('.cart');
let cartContent = document.querySelector('.listCart');

iconCart.addEventListener('click', () => {
    cart.classList.add('activeCart');
});

closeCart.addEventListener('click', () => {
    cart.classList.remove('activeCart');
});

// Store selected products
let products=[];


// Add to cart
let cartBtns=document.querySelectorAll('.sales_item .fa-cart-shopping');
cartBtns.forEach((btn)=>{
    btn.addEventListener('click',function(){
        addtoCart(btn);
    })
});

function addtoCart(btn){
    let itemContainer = btn.closest('.sales_item');
    let itemImg = itemContainer.querySelector('.itemImg').src;
    let itemName = itemContainer.querySelector('.itemName').innerText;
    let itemPrice = itemContainer.querySelector('.itemPrice').innerText;
    let itemQuantity = 1;
    let item = {
        img:itemImg,
        name:itemName,
        price:itemPrice,
        quantity:itemQuantity
    }

    let existingProduct = products.find(product => product.name === itemName);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        products.push(item);
    }

    console.log(products);
    calculateTotal();
    displayCart();
}

// Remove item from cart
cartContent.addEventListener('click', function(event) {
    if (event.target.classList.contains('fa-trash')) {
        let itemName = event.target.parentElement.querySelector('.itemName').innerText;
        let item = products.find(product => product.name === itemName);
        let confirmation = confirm('Are you sure you want to remove this item from the cart?');
            if (confirmation === true) {
                products = products.filter(product => product.name !== itemName);
            }
        calculateTotal();
        displayCart();
    }
});


//display cart
function displayCart(){
    cartContent.innerHTML = ''; // Clear existing content

    products.forEach(product => {
        let produtPrice = parseFloat(product.price) * parseFloat(product.quantity); // Calculate product price with quantity
        let newProduct = document.createElement('div');
        newProduct.classList.add('cart_item');
        newProduct.innerHTML =
            `<img class="itemImg" src="${product.img}" width="90%">
        <div class="description">
            <i class="fa-solid fa-trash"></i>
            <span class="itemName">${product.name}</span><br><br>
            <span class="itemPrice">Rs. ${produtPrice}</span><br>
            <input type="number" value="${product.quantity}" class="itemQuantity" min="1">
        </div>`;
        cartContent.appendChild(newProduct);
    });     
}

// change quantity
cartContent.addEventListener('change', function(event) {
    if (event.target.classList.contains('itemQuantity')) {
        let itemName = event.target.parentElement.querySelector('.itemName').innerText;
        let item = products.find(product => product.name === itemName);
        item.quantity = Number(event.target.value);
        calculateTotal();
        displayCart();
    }
});

// calculate total
function calculateTotal() {
    let total = 0;
    products.forEach(product => {
        let price = parseFloat(product.price);
        let quantity = parseFloat(product.quantity);
        total += price * quantity;
    });
    document.getElementById('total-price').innerText = total.toFixed(2);
    console.log(total);
    itemsinCart();
}

// display number of items in cart
function itemsinCart() {
    let items = 0;
    products.forEach(product => {
        items += parseFloat(product.quantity);
    });
    if (items === 0) {
        document.getElementById('display-cart-items').style.display = 'none';
    }else {
        document.getElementById('display-cart-items').style.display = 'block';
        document.getElementById('display-cart-items').innerHTML = items;
        console.log(items);
    }  
}

// proceed to checkout
document.getElementById('checkOut').addEventListener('click', function() {
    if (products.length > 0) {
        window.location.href = 'payment_gateway.html';
    } else {
        alert('Your cart is empty. You should at least add one item to proceed to checkout.');
    }
});

