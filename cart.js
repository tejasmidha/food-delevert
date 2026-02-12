// Cart array to store items
let cart = [];

// Add item to cart
function addToCart(itemName, itemPrice) {
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.name === itemName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: itemName,
            price: itemPrice,
            quantity: 1
        });
    }
    
    updateCart();
    
    // Show feedback
    showAddedToCartMessage(itemName);
}

// Remove item from cart
function removeFromCart(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    updateCart();
}

// Update quantity
function updateQuantity(itemName, change) {
    const item = cart.find(item => item.name === itemName);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(itemName);
        } else {
            updateCart();
        }
    }
}

// Update cart display
function updateCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalContainer = document.getElementById('cartTotal');
    const cartCountBadge = document.querySelector('.cart-count');
    
    // Clear current cart display
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotalContainer.classList.add('hidden');
        cartCountBadge.textContent = '0';
        return;
    }
    
    // Display cart items
    cart.forEach(item => {
        const cartItemHTML = `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">₹${item.price}</p>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateQuantity('${item.name}', -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${item.name}', 1)">+</button>
                </div>
            </div>
        `;
        cartItemsContainer.innerHTML += cartItemHTML;
    });
    
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 40;
    const grandTotal = subtotal + deliveryFee;
    
    // Update totals
    document.getElementById('subtotal').textContent = `₹${subtotal}`;
    document.getElementById('grandTotal').textContent = `₹${grandTotal}`;
    
    // Show cart total section
    cartTotalContainer.classList.remove('hidden');
    
    // Update cart count badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountBadge.textContent = totalItems;
}

// Show added to cart message
function showAddedToCartMessage(itemName) {
    // You can enhance this with a toast notification later
    console.log(`Added ${itemName} to cart!`);
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCart();
});