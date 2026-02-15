/* Login Modal Styles */
#loginModal {
    display: none !important;
}

#loginModal.modal {
    display: flex !important;
    position: fixed;
    z-index: 99999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    align-items: center;
    justify-content: center;
}

.login-modal-content {
    max-width: 450px;
    background-color: white;
    border-radius: 12px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
}

.google-signin-btn {
    width: 100%;
    background-color: white;
    border: 2px solid #ddd;
    padding: 12px;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    transition: all 0.3s ease;
    margin-bottom: 20px;
}

.google-signin-btn:hover {
    border-color: #4285f4;
    background-color: #f8f9fa;
}

.google-signin-btn img {
    width: 20px;
    height: 20px;
}

.divider {
    text-align: center;
    margin: 20px 0;
    position: relative;
}

.divider::before,
.divider::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 40%;
    height: 1px;
    background-color: #ddd;
}

.divider::before {
    left: 0;
}

.divider::after {
    right: 0;
}

.divider span {
    background-color: white;
    padding: 0 15px;
    color: #888;
    font-size: 14px;
}

#loginForm input {
    width: 100%;
    padding: 12px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
    box-sizing: border-box;
}

#loginForm input:focus {
    outline: none;
    border-color: #ff6347;
}

.login-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 15px;
}

.login-submit-btn,
.signup-submit-btn {
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
}

.login-submit-btn {
    background-color: #ff6347;
    color: white;
}

.login-submit-btn:hover {
    background-color: #ff4520;
}

.signup-submit-btn {
    background-color: white;
    color: #ff6347;
    border: 2px solid #ff6347;
}

.signup-submit-btn:hover {
    background-color: #fff5f3;
}

.login-note {
    font-size: 12px;
    color: #888;
    text-align: center;
    margin-top: 15px;
}