
const products = [
    { id: 1, name: "Laptop", price: 999.99, quantity: 10 },
    { id: 2, name: "Smartphone", price: 699.99, quantity: 20 },
    { id: 3, name: "Headphones", price: 199.99, quantity: 15 },
];
const productList = document.getElementById("product-list");
const cart = document.getElementById("cart");
const totalPriceElement = document.getElementById("total-price");
let cartState = JSON.parse(localStorage.getItem("cartState")) || [];
function renderProductList() {
    productList.innerHTML = "";
    products.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.className = "product";
        productElement.innerHTML = `
            <span>${product.name} - $${product.price}</span>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productElement);
    });
}
function renderCart() {
    cart.innerHTML = "";
    cartState.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <span>${item.name} - $${item.price}</span>
            <input type="number" min="1" value="${item.quantity}" onchange="updateCart(${item.id}, this.value)">
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cart.appendChild(cartItem);
    });
    updateTotal();
    saveCartState();
}
function addToCart(productId) {
    const product = products.find((p)=>p.id === productId);
    const existingItem = cartState.find((item)=>item.id === productId);
if (existingItem) {
        existingItem.quantity++;
    }else{
        cartState.push({ ...product, quantity: 1 });
    }
    renderCart();
}
function updateCart(productId, newQuantity) {
    const item = cartState.find((item)=>item.id === productId);
    if (item) {
        item.quantity = Math.max(1,parseInt(newQuantity));
    }
    renderCart();
}
function removeFromCart(productId) {
    cartState = cartState.filter((item) => item.id !== productId);
    renderCart();
}
function updateTotal() {
    const total = cartState.reduce((sum,item) =>sum+item.price*item.quantity,0);
    totalPriceElement.textContent = total.toFixed(2);
}
function saveCartState() {
    localStorage.setItem("cartState", JSON.stringify(cartState));
}
renderProductList();
renderCart();
