const gif = document.querySelector('.gif-center img');
const liqutglassWrapper = document.querySelector('.liqut_glass');
const loginInput = document.getElementById('login');
const passwordInput = document.getElementById('password');
const actionBtn = document.getElementById('actionBtn');
const formTitle = document.getElementById('formTitle');
const switchText = document.getElementById('switchText');
const switchLink = document.getElementById('switchLink');

let isLoginMode = false;

if (gif && liqutglassWrapper) {
    gif.addEventListener('animationend', () => {
        liqutglassWrapper.classList.add('show');
        // Показываем элементы формы с задержкой
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
    passwordInput.addEventListener('input', checkFields);
}

if (switchLink) {
    switchLink.addEventListener('click', (e) => {
        e.preventDefault();
        toggleFormMode();
    });
}

function toggleFormMode() {
    // Анимация исчезновения текущего содержимого
    const formElements = [formTitle, loginInput.parentElement, passwordInput.parentElement, actionBtn.parentElement, switchText.parentElement];
    
    formElements.forEach(element => {
        if (element) {
            element.style.opacity = '0';
            element.style.transform = element.style.transform.replace('translateY(0)', 'translateY(20px)');
        }
    });
    
    // После завершения анимации исчезновения, меняем форму и показываем новую
    setTimeout(() => {
        isLoginMode = !isLoginMode;
        
        if (isLoginMode) {
            // Переключаемся на форму входа
            formTitle.textContent = 'Вход';
            actionBtn.textContent = 'Войти';
            switchText.textContent = 'Нет аккаунта? ';
            switchLink.textContent = 'Зарегистрируйтесь';
        } else {
            // Переключаемся на форму регистрации
            formTitle.textContent = 'Регистрация';
            actionBtn.textContent = 'Продолжить';
            switchText.textContent = 'Есть аккаунт? ';
            switchLink.textContent = 'Войдите';
        }
        
        // Сбрасываем проверку полей
        checkFields();
        
        // Анимация появления нового содержимого
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