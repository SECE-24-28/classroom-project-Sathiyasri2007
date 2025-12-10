// Utility Functions for Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[6-9]\d{9}$/;
    return re.test(phone);
}

function validatePassword(password) {
    return password.length >= 6;
}

function showError(element, message) {
    let errorEl = element.parentNode.querySelector('.error-message');
    if (!errorEl) {
        errorEl = document.createElement('p');
        errorEl.className = 'error-message text-red-500 text-sm mt-1';
        element.parentNode.appendChild(errorEl);
    }
    errorEl.textContent = message;
    element.classList.add('border-red-500');
}

function clearError(element) {
    const errorEl = element.parentNode.querySelector('.error-message');
    if (errorEl) errorEl.remove();
    element.classList.remove('border-red-500');
}

// Auto-detect operator based on mobile number prefix
function detectOperator(phone) {
    if (!phone || phone.length < 4) return '';
    const prefix = phone.substring(0, 4);
    if (prefix.startsWith('9')) return 'airtel';
    if (prefix.startsWith('8')) return 'jio';
    if (prefix.startsWith('7')) return 'vi';
    if (prefix.startsWith('6')) return 'bsnl';
    return 'mtnl';
}

// Simulate data flow with localStorage
function saveSelectedPlan(plan) {
    localStorage.setItem('selectedPlan', JSON.stringify(plan));
}

function getSelectedPlan() {
    const plan = localStorage.getItem('selectedPlan');
    return plan ? JSON.parse(plan) : null;
}

function saveRechargeData(data) {
    localStorage.setItem('rechargeData', JSON.stringify(data));
}

function getRechargeData() {
    const data = localStorage.getItem('rechargeData');
    return data ? JSON.parse(data) : null;
}

// Authentication functions
function isLoggedIn() {
    return localStorage.getItem('loggedIn') === 'true';
}

function setLoggedIn(status) {
    localStorage.setItem('loggedIn', status.toString());
}

function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

function saveUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

function findUser(email) {
    const users = getUsers();
    return users.find(user => user.email === email);
}

function logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userEmail');
    window.location.href = 'index.html';
}

// DOM Manipulation Functions
function showSummary(data) {
    const summary = `
        <div id="summary-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
                <h3 class="text-xl font-bold mb-4 text-green-600">Recharge Summary</h3>
                <p><strong>Mobile:</strong> ${data.mobile}</p>
                <p><strong>Operator:</strong> ${data.operator}</p>
                <p><strong>Amount:</strong> ₹${data.amount}</p>
                <p><strong>Payment:</strong> ${data.payment}</p>
                <div class="mt-4 flex gap-2">
                    <button id="confirm-recharge" class="bg-green-500 text-white px-4 py-2 rounded">Confirm</button>
                    <button id="cancel-recharge" class="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', summary);

    document.getElementById('confirm-recharge').addEventListener('click', () => {
        window.location.href = 'success.html';
    });

    document.getElementById('cancel-recharge').addEventListener('click', () => {
        document.getElementById('summary-modal').remove();
    });
}

function addLoadingState(button) {
    button.disabled = true;
    button.textContent = 'Processing...';
    setTimeout(() => {
        button.disabled = false;
        button.textContent = button.dataset.originalText;
    }, 2000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Check login status for protected pages
    const currentPage = window.location.pathname.split('/').pop();
    const protectedPages = ['recharge.html', 'plans.html', 'offers.html'];

    if (protectedPages.includes(currentPage) && !isLoggedIn()) {
        window.location.href = 'login-recharge.html';
        return;
    }

    // Handle protected links on index page
    const protectedLinks = document.querySelectorAll('a[href="recharge.html"], a[href="plans.html"], a[href="offers.html"]');
    protectedLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!isLoggedIn()) {
                e.preventDefault();
                window.location.href = 'login-recharge.html';
            }
        });
    });

    // Recharge Form Validation and Functionality
    const rechargeForm = document.querySelector('form[action="success.html"]');
    if (rechargeForm) {
        const mobileInput = document.getElementById('mobile');
        const operatorSelect = document.getElementById('operator');
        const amountInput = document.getElementById('amount');
        const paymentSelect = document.getElementById('payment');

        // Auto-detect operator on mobile input
        if (mobileInput) {
            mobileInput.addEventListener('input', function() {
                const operator = detectOperator(this.value);
                if (operator && operatorSelect.value === '') {
                    operatorSelect.value = operator;
                }
            });
        }

        // Handle quick recharge buttons
        const quickButtons = document.querySelectorAll('.grid.grid-cols-3 button');
        quickButtons.forEach(button => {
            button.addEventListener('click', function() {
                const amount = this.textContent.replace('₹', '');
                amountInput.value = amount;
            });
        });

        // Form validation on submit
        rechargeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            // Validate mobile
            if (!validatePhone(mobileInput.value)) {
                showError(mobileInput, 'Please enter a valid 10-digit mobile number starting with 6-9');
                isValid = false;
            } else {
                clearError(mobileInput);
            }

            // Validate operator
            if (!operatorSelect.value) {
                showError(operatorSelect, 'Please select an operator');
                isValid = false;
            } else {
                clearError(operatorSelect);
            }

            // Validate amount
            const amount = parseInt(amountInput.value);
            if (isNaN(amount) || amount < 10 || amount > 5000) {
                showError(amountInput, 'Amount must be between ₹10 and ₹5000');
                isValid = false;
            } else {
                clearError(amountInput);
            }

            // Validate payment
            if (!paymentSelect.value) {
                showError(paymentSelect, 'Please select a payment method');
                isValid = false;
            } else {
                clearError(paymentSelect);
            }

            if (isValid) {
                const data = {
                    mobile: mobileInput.value,
                    operator: operatorSelect.value,
                    amount: amount,
                    payment: paymentSelect.value
                };
                saveRechargeData(data);
                showSummary(data);
            }
        });
    }

    // Login Form Validation
    const loginForm = document.querySelector('form[action="recharge.html"]');
    if (loginForm && document.getElementById('email')) {
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');

        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            if (!validateEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError(emailInput);
            }

            if (!validatePassword(passwordInput.value)) {
                showError(passwordInput, 'Password must be at least 6 characters');
                isValid = false;
            } else {
                clearError(passwordInput);
            }

            if (isValid) {
                addLoadingState(this.querySelector('button[type="submit"]'));
                setTimeout(() => {
                    setLoggedIn(true);
                    localStorage.setItem('userEmail', emailInput.value);
                    window.location.href = 'recharge.html';
                }, 1000);
            }
        });
    }

    // Signup Form Validation
    const signupForm = document.querySelector('form[action="recharge.html"]');
    if (signupForm && document.getElementById('name')) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirm-password');

        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            if (!nameInput.value.trim()) {
                showError(nameInput, 'Please enter your full name');
                isValid = false;
            } else {
                clearError(nameInput);
            }

            if (!validateEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError(emailInput);
            }

            // Check if user already exists
            if (findUser(emailInput.value)) {
                showError(emailInput, 'Email already registered. Please login instead.');
                isValid = false;
            } else {
                clearError(emailInput);
            }

            if (!validatePassword(passwordInput.value)) {
                showError(passwordInput, 'Password must be at least 6 characters');
                isValid = false;
            } else {
                clearError(passwordInput);
            }

            if (passwordInput.value !== confirmPasswordInput.value) {
                showError(confirmPasswordInput, 'Passwords do not match');
                isValid = false;
            } else {
                clearError(confirmPasswordInput);
            }

            if (isValid) {
                // Save user to localStorage
                const user = {
                    name: nameInput.value,
                    email: emailInput.value,
                    password: passwordInput.value
                };
                saveUser(user);

                addLoadingState(this.querySelector('button[type="submit"]'));
                setTimeout(() => {
                    setLoggedIn(true);
                    localStorage.setItem('userEmail', emailInput.value);
                    window.location.href = 'recharge.html';
                }, 1000);
            }
        });
    }

    // Plans Selection
    const planButtons = document.querySelectorAll('.bg-white.p-6.rounded-lg.shadow-lg button');
    if (planButtons.length > 0) {
        planButtons.forEach((button, index) => {
            button.addEventListener('click', function() {
                const plans = [
                    { name: '₹199 Plan', amount: 199, validity: '28 days', data: '1GB/day' },
                    { name: '₹299 Plan', amount: 299, validity: '56 days', data: '2GB/day' },
                    { name: '₹499 Plan', amount: 499, validity: '84 days', data: '3GB/day' }
                ];
                const selectedPlan = plans[index];
                saveSelectedPlan(selectedPlan);
                window.location.href = 'recharge.html';
            });
        });
    }

    // Offers Claim
    const offerButtons = document.querySelectorAll('button[onclick*="alert"], button:contains("Claim Offer")');
    offerButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Offer claimed successfully! You will receive details via SMS.');
            this.textContent = 'Claimed ✓';
            this.disabled = true;
        });
    });

    // Index Page Smooth Scroll
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Success Page Animation
    if (document.querySelector('h2:contains("Recharge Successful")')) {
        const successMessage = document.querySelector('h2');
        successMessage.style.animation = 'bounce 1s ease-in-out';
    }

    // Pre-fill amount from selected plan
    if (amountInput && getSelectedPlan()) {
        const plan = getSelectedPlan();
        amountInput.value = plan.amount;
        localStorage.removeItem('selectedPlan'); // Clear after use
    }
});
