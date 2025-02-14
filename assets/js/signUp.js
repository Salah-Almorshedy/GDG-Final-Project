document.querySelector("form").addEventListener("submit" , async function (event) {
    event.preventDefault();

    const fName = document.querySelector(".reg-first-name").value; 
    const lName = document.querySelector(".reg-last-name").value; 
    const email = document.querySelector(".reg-email").value; 
    const gender = document.querySelector(".reg-gender").value; 
    const password = document.querySelector(".reg-password").value; 
    const password_confirmation = document.querySelector(".reg-password-confirmation").value; 


    if(password !== password_confirmation) {
        alert("Passwords do not match!");
        return;
    }

    console.log("Sending Data:" , {fName, lName, email , gender});

    try{
        const response = await fetch("http://127.0.0.1:8000/api/register",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({fName , lName , email , gender , password , password_confirmation})    
        });

        const data = await response.json();

        if(response.ok) {
            console.log("Registration Successful:", data);
            alert("Registration Successful: " + data.message)
        } else{
            console.log("Registration Failed:" , data);
            alert("Registration Failed: " + data.message)
        }
    } catch (error) {
        console.error("Network Error:", error)
        alert("Network Error: Could not connect to the server.");
    }
});




// ملف signUp.js

// تحديد العناصر في النموذج
const form = document.querySelector('form'); // النموذج بأكمله
const firstNameInput = document.querySelector('.reg-first-name'); // حقل الاسم الأول
const lastNameInput = document.querySelector('.reg-last-name'); // حقل الاسم الأخير
const emailInput = document.querySelector('.reg-email'); // حقل البريد الإلكتروني
const genderInput = document.querySelector('.reg-gender'); // حقل الجنس
const passwordInput = document.querySelector('.reg-password'); // حقل كلمة المرور
const confirmPasswordInput = document.querySelector('.reg-password-confirmation'); // حقل تأكيد كلمة المرور
const errorMessages = document.querySelectorAll('.error-message'); // عناصر عرض رسائل الخطأ
const loadingSpinner = document.createElement('div'); // مؤشر التحميل

// إضافة مؤشر التحميل إلى النموذج
loadingSpinner.classList.add('loading-spinner');
form.appendChild(loadingSpinner);
loadingSpinner.style.display = 'none'; // إخفاء المؤشر في البداية

// دالة لإظهار رسائل الخطأ
function showError(input, message) {
    const errorElement = input.nextElementSibling; // العنصر التالي لعرض الخطأ
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    input.classList.add('error');
}

// دالة لإخفاء رسائل الخطأ
function hideError(input) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = '';
    errorElement.style.display = 'none';
    input.classList.remove('error');
}

// دالة للتحقق من صحة البريد الإلكتروني
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// دالة للتحقق من صحة النموذج
function validateForm() {
    let isValid = true;

    // التحقق من الاسم الأول
    if (firstNameInput.value.trim() === '') {
        showError(firstNameInput, 'الاسم الأول مطلوب');
        isValid = false;
    } else {
        hideError(firstNameInput);
    }

    // التحقق من الاسم الأخير
    if (lastNameInput.value.trim() === '') {
        showError(lastNameInput, 'الاسم الأخير مطلوب');
        isValid = false;
    } else {
        hideError(lastNameInput);
    }

    // التحقق من البريد الإلكتروني
    if (emailInput.value.trim() === '') {
        showError(emailInput, 'البريد الإلكتروني مطلوب');
        isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
        showError(emailInput, 'البريد الإلكتروني غير صحيح');
        isValid = false;
    } else {
        hideError(emailInput);
    }

    // التحقق من كلمة المرور
    if (passwordInput.value.trim() === '') {
        showError(passwordInput, 'كلمة المرور مطلوبة');
        isValid = false;
    } else if (passwordInput.value.length < 8) {
        showError(passwordInput, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل');
        isValid = false;
    } else {
        hideError(passwordInput);
    }

    // التحقق من تأكيد كلمة المرور
    if (confirmPasswordInput.value.trim() === '') {
        showError(confirmPasswordInput, 'تأكيد كلمة المرور مطلوب');
        isValid = false;
    } else if (confirmPasswordInput.value !== passwordInput.value) {
        showError(confirmPasswordInput, 'كلمة المرور غير متطابقة');
        isValid = false;
    } else {
        hideError(confirmPasswordInput);
    }

    return isValid;
}

// دالة لإرسال البيانات إلى API
async function registerUser(userData) {
    try {
        loadingSpinner.style.display = 'block'; // إظهار مؤشر التحميل

        const response = await fetch('http://127.0.0.1:8000/api/register', {
            method: 'POST', // طريقة الطلب
            headers: {
                'Content-Type': 'application/json', // نوع المحتوى المرسل
            },
            body: JSON.stringify(userData), // تحويل البيانات إلى JSON
        });

        // تحقق من نجاح الطلب
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Network response was not ok');
        }

        const data = await response.json(); // تحويل الرد إلى JSON
        console.log('Success:', data); // عرض الرد في الكونسول
        alert('تم التسجيل بنجاح!'); // إشعار للمستخدم

        // إعادة توجيه المستخدم إلى صفحة أخرى (مثل صفحة تسجيل الدخول)
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Error:', error); // عرض الخطأ في الكونسول
        alert(`حدث خطأ أثناء التسجيل: ${error.message}`); // إشعار للمستخدم
    } finally {
        loadingSpinner.style.display = 'none'; // إخفاء مؤشر التحميل
    }
}

// دالة لجمع بيانات النموذج وإرسالها
function handleFormSubmit(event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة

    // التحقق من صحة النموذج قبل الإرسال
    if (validateForm()) {
        // جمع بيانات النموذج
        const userData = {
            name: `${firstNameInput.value.trim()} ${lastNameInput.value.trim()}`, // الاسم الكامل
            email: emailInput.value.trim(), // البريد الإلكتروني
            password: passwordInput.value.trim(), // كلمة المرور
            password_confirmation: confirmPasswordInput.value.trim(), // تأكيد كلمة المرور
            address: "ZAG", // العنوان (يمكنك إضافة حقل له في النموذج إذا لزم الأمر)
            gender: genderInput.value.trim(), // الجنس
        };

        // إرسال البيانات إلى API
        registerUser(userData);
    }
}

// إضافة مستمع حدث للنموذج عند الإرسال
form.addEventListener('submit', handleFormSubmit);

// إضافة وظيفة إظهار/إخفاء كلمة المرور
const togglePasswordButtons = document.querySelectorAll('.eye');
togglePasswordButtons.forEach(button => {
    button.addEventListener('click', () => {
        const passwordField = button.previousElementSibling;
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            button.src = './assets/images/eye-slash.png'; // تغيير الأيقونة
        } else {
            passwordField.type = 'password';
            button.src = './assets/images/eye.png'; // تغيير الأيقونة
        }
    });
});
