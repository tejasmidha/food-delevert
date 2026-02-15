// Your Firebase configuration (from the image you showed)
const firebaseConfig = {
  apiKey: "AIzaSyD69mFKGWOjHZwLa8wGexGXv3b_d7UF48g",
  authDomain: "food-delivery-app-a7512.firebaseapp.com",
  projectId: "food-delivery-app-a7512",
  storageBucket: "food-delivery-app-a7512.firebasestorage.app",
  messagingSenderId: "803950081326",
  appId: "1:803950081326:web:365eb53d1820f2a0a776bf",
  measurementId: "G-J5EBP7SLCW"
};

// Initialize Firebase (will be loaded from CDN)
let auth;
let currentUser = null;

// Wait for Firebase to load
window.addEventListener('load', function() {
    if (typeof firebase !== 'undefined') {
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        auth = firebase.auth();
        
        // Listen for auth state changes
        auth.onAuthStateChanged(function(user) {
            currentUser = user;
            updateUIForUser(user);
            
            if (user) {
                console.log('User logged in:', user.email);
                // Load user's cart
                loadUserCart();
            } else {
                console.log('User logged out');
            }
        });
    }
});

// Show login modal
function showLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Close login modal
function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Google Sign In
function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            showToast('Welcome ' + result.user.displayName + '! 🎉');
            closeLoginModal();
        })
        .catch((error) => {
            showToast('Login failed: ' + error.message);
        });
}

// Email/Password Sign Up
function signUpWithEmail() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showToast('Please enter email and password');
        return;
    }
    
    if (password.length < 6) {
        showToast('Password must be at least 6 characters');
        return;
    }
    
    auth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
            showToast('Account created! Welcome! 🎉');
            closeLoginModal();
        })
        .catch((error) => {
            // If user already exists, try to sign in instead
            if (error.code === 'auth/email-already-in-use') {
                signInWithEmail();
            } else {
                showToast('Sign up failed: ' + error.message);
            }
        });
}

// Email/Password Sign In
function signInWithEmail() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showToast('Please enter email and password');
        return;
    }
    
    auth.signInWithEmailAndPassword(email, password)
        .then((result) => {
            showToast('Welcome back! 🎉');
            closeLoginModal();
        })
        .catch((error) => {
            showToast('Login failed: ' + error.message);
        });
}

// Logout
function logout() {
    auth.signOut()
        .then(() => {
            showToast('Logged out successfully');
            // Clear cart
            cart = [];
            saveCart();
            updateCart();
        })
        .catch((error) => {
            showToast('Logout failed: ' + error.message);
        });
}

// Update UI based on user state
function updateUIForUser(user) {
    const loginBtn = document.querySelector('.login-btn');
    
    if (user) {
        // User is logged in
        if (loginBtn) {
            loginBtn.textContent = user.displayName || user.email.split('@')[0];
            loginBtn.onclick = showUserMenu;
        }
    } else {
        // User is logged out
        if (loginBtn) {
            loginBtn.textContent = 'Login';
            loginBtn.onclick = showLoginModal;
        }
    }
}

// Show user menu
function showUserMenu() {
    const userMenuHTML = `
        <div class="user-menu-dropdown">
            <p><strong>${currentUser.displayName || currentUser.email}</strong></p>
            <button onclick="logout()">Logout</button>
        </div>
    `;
    
    // Simple implementation - you can enhance this
    if (confirm('Logout?')) {
        logout();
    }
}

// Load user-specific cart
function loadUserCart() {
    if (currentUser) {
        const userCartKey = 'foodDeliveryCart_' + currentUser.uid;
        const savedCart = localStorage.getItem(userCartKey);
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCart();
        }
    }
}

// Override saveCart to save per user
const originalSaveCart = window.saveCart;
window.saveCart = function() {
    if (currentUser) {
        const userCartKey = 'foodDeliveryCart_' + currentUser.uid;
        localStorage.setItem(userCartKey, JSON.stringify(cart));
    } else {
        // If not logged in, save to generic key
        localStorage.setItem('foodDeliveryCart', JSON.stringify(cart));
    }
};