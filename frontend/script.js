let isDay = false;

function toggleBackground() {
    document.body.style.animation = "fadeIn 1s ease";
    
    if (isDay) {
        document.body.style.backgroundImage = 'url("assets/background2.png")';
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        document.getElementById("toggleBtn").textContent = "🌞";
    } else {
        document.body.style.backgroundImage = 'url("assets/background.png")';
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        document.getElementById("toggleBtn").textContent = "🌙";
    }

    isDay = !isDay;

    setTimeout(() => {
        document.body.style.animation = "";
    }, 1000);
}


document.addEventListener('DOMContentLoaded', function() {
    localStorage.removeItem('passwordNotificationShown');
    document.body.classList.add('dark-theme');
    document.body.style.backgroundImage = 'url("assets/background2.png")';
    document.getElementById("toggleBtn").textContent = "🌞";
});

document.getElementById('toggleBtn').addEventListener('click', toggleBackground);

const gif = document.querySelector('.gif-center img');
const liqutglassWrapper = document.querySelector('.liqut_glass');
const loginInput = document.getElementById('login');
const passwordInput = document.getElementById('password');
const actionBtn = document.getElementById('actionBtn');
const formTitle = document.getElementById('formTitle');
const switchText = document.getElementById('switchText');
const switchLink = document.getElementById('switchLink');
const notificationWrapper = document.querySelector('.notification');

let isLoginMode = false;

if (gif && liqutglassWrapper) {
    gif.addEventListener('animationend', () => {
        liqutglassWrapper.classList.add('show');
        setTimeout(() => {
            loginInput.focus();
        }, 300);
    })
}

if (loginInput) {
    loginInput.setAttribute('maxlength', '20');
    loginInput.addEventListener('input', () => {
        loginInput.value = loginInput.value
            .replace(/[^a-zA-Z0-9]/g, '')
            .slice(0, 20);
        checkFields();
    });
}

if (passwordInput) {
    passwordInput.setAttribute('maxlength', '20');
    passwordInput.addEventListener('input', function() {
        checkFields();
        showPasswordNotification();
    });
}

function showPasswordNotification() {
    if (localStorage.getItem('passwordNotificationShown')) {
        return;
    }
    
    if (passwordInput.value.length > 0 && !notificationWrapper.classList.contains('show')) {
        notificationWrapper.classList.add('show');
        localStorage.setItem('passwordNotificationShown', 'true');

        setTimeout(() => {
            hideNotification();
        }, 5000);
    }
}

function hideNotification() {
    notificationWrapper.classList.remove('show');
    
    setTimeout(() => {
        notificationWrapper.innerHTML = '';
    }, 500);
}

notificationWrapper.addEventListener('click', hideNotification);

if (switchLink) {
    switchLink.addEventListener('click', (e) => {
        e.preventDefault();
        toggleFormMode();
    });
}

function toggleFormMode() {
    const formElements = [formTitle, loginInput.parentElement, passwordInput.parentElement, actionBtn.parentElement, switchText.parentElement];
    
    formElements.forEach(element => {
        if (element) {
            element.style.opacity = '0';
            element.style.transform = element.style.transform.replace('translateY(0)', 'translateY(20px)');
        }
    });
    

    setTimeout(() => {
        isLoginMode = !isLoginMode;
        
        if (isLoginMode) {
            formTitle.textContent = 'Вход';
            actionBtn.textContent = 'Войти';
            switchText.textContent = 'Нет аккаунта? ';
            switchLink.textContent = 'Зарегистрируйтесь';
        } else {
            formTitle.textContent = 'Регистрация';
            actionBtn.textContent = 'Продолжить';
            switchText.textContent = 'Есть аккаунт? ';
            switchLink.textContent = 'Войдите';
        }
        
        checkFields();
        
        setTimeout(() => {
            formElements.forEach(element => {
                if (element) {
                    element.style.opacity = '1';
                    element.style.transform = element.style.transform.replace('translateY(20px)', 'translateY(0)');
                }
            });
        }, 50);
        
    }, 300);
}

function checkFields() {
    const isLoginValid = loginInput.value.trim() !== '';
    const isPasswordValid = passwordInput.value.trim().length >= 8;
    
    if (isLoginValid && isPasswordValid) {
        actionBtn.classList.add('active');
        actionBtn.disabled = false;
    } else {
        actionBtn.classList.remove('active');
        actionBtn.disabled = true;
    }
}

checkFields();