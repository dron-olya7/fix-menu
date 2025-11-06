document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menuButton");
  const menuPanel = document.getElementById("menuPanel");
  const offerButton = document.getElementById("offerButton");
  const modalOverlay = document.getElementById("modalOverlay");
  const modalClose = document.getElementById("modalClose");
  const contactOptions = document.querySelectorAll(".contact-option");
  const submitBtn = document.getElementById("submit_btn");
  const phoneInput = document.getElementById("user_phone");
  const phoneError = document.getElementById("phone-error");
  const contactForm = document.querySelector('.contact-form');
  const thankYouBlock = document.getElementById("thankYouBlock");

  let currentContactMethod = 'email';

  // Открытие/закрытие меню
  menuButton.addEventListener("click", function () {
    menuPanel.classList.toggle("show");
    menuButton.classList.toggle("open");
  });

  // Закрытие меню при клике вне его
  document.addEventListener("click", function (event) {
    if (
      !menuButton.contains(event.target) &&
      !menuPanel.contains(event.target)
    ) {
      menuPanel.classList.remove("show");
      menuButton.classList.remove("open");
    }
  });

  // Открытие попапа при нажатии на кнопку предложения
  offerButton.addEventListener("click", function () {
    modalOverlay.classList.add("active");
    menuPanel.classList.remove("show");
    menuButton.classList.remove("open");
    showForm();
  });

  // Закрытие попапа по кнопке
  modalClose.addEventListener("click", function () {
    modalOverlay.classList.remove("active");
    showForm();
  });

  // Закрытие попапа по клику вне его
  modalOverlay.addEventListener("click", function (event) {
    if (event.target === modalOverlay) {
      modalOverlay.classList.remove("active");
      showForm();
    }
  });

  // Функция для показа формы
  function showForm() {
    if (contactForm) contactForm.style.display = 'block';
    if (thankYouBlock) thankYouBlock.style.display = 'none';
  }

  // Функция для показа блока спасибо
  function showThankYou(methodName) {
    if (contactForm) contactForm.style.display = 'none';
    if (thankYouBlock) {
      thankYouBlock.style.display = 'block';
      const thankYouText = thankYouBlock.querySelector('p');
      if (thankYouText) {
        thankYouText.textContent = `Спасибо! Мы свяжемся с вами через ${methodName} в ближайшее время.`;
      }
    }
  }

  // Маска для телефона и ограничения для email
  function initInputHandlers() {
    phoneInput.addEventListener('input', function (e) {
      if (currentContactMethod === 'email') {
        let value = e.target.value.replace(/[а-яА-ЯёЁ]/g, '');
        if (value !== e.target.value) {
          e.target.value = value;
        }
        return;
      }
      
      let value = e.target.value.replace(/\D/g, '');
      
      if (value.length === 0) {
        e.target.value = '';
        return;
      }
      
      if (value.length > 11) {
        value = value.substring(0, 11);
      }
      
      let formattedValue = '';
      
      if (value.length <= 1) {
        formattedValue = value;
      } else if (value.length <= 4) {
        formattedValue = '+7 (' + value.substring(1);
      } else if (value.length <= 7) {
        formattedValue = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4);
      } else if (value.length <= 9) {
        formattedValue = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7);
      } else {
        formattedValue = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7, 9) + '-' + value.substring(9, 11);
      }
      
      e.target.value = formattedValue;
    });

    phoneInput.addEventListener('keydown', function (e) {
      if (currentContactMethod !== 'email' && e.key === 'Backspace' && phoneInput.value.length <= 4) {
        phoneInput.value = '';
      }
    });
  }

  // Преобразуем checkbox в radio логику через JavaScript
  function initContactOptions() {
    contactOptions.forEach(option => {
      option.style.borderColor = "transparent";
      const checkbox = option.querySelector('input[type="checkbox"]');
      checkbox.checked = false;
    });

    const emailOption = contactOptions[0];
    emailOption.style.borderColor = "#e41820";
    emailOption.querySelector('input[type="checkbox"]').checked = true;
    
    phoneInput.placeholder = "Ваш email";
    phoneInput.type = "text";
    currentContactMethod = 'email';
    updateErrorMessage('email');
    
    phoneInput.value = "";
  }

  // Функция для обновления сообщения об ошибке
  function updateErrorMessage(contactMethod) {
    const errorSvg = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M9 6.75V9.5625M15.75 9C15.75 12.7279 12.7279 15.75 9 15.75C5.27208 15.75 2.25 12.7279 2.25 9C2.25 5.27208 5.27208 2.25 9 2.25C12.7279 2.25 15.75 5.27208 15.75 9ZM9 11.8125H9.00563V11.8181H9V11.8125Z"
        stroke="#E11D48"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>`;
    
    if (contactMethod === 'email') {
      phoneError.innerHTML = errorSvg + 'Укажите email';
    } else {
      phoneError.innerHTML = errorSvg + 'Укажите телефон';
    }
  }

  // Функция для проверки, является ли способ связи телефонным
  function isPhoneMethod(method) {
    return method === 'whatsapp' || method === 'telegram' || method === 'max';
  }

  // Обработчик выбора способа связи
  contactOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const checkbox = this.querySelector('input[type="checkbox"]');
      const newContactMethod = checkbox.value;
      
      if (checkbox.checked) return;
      
      const wasEmail = currentContactMethod === 'email';
      const isEmail = newContactMethod === 'email';
      const wasPhone = isPhoneMethod(currentContactMethod);
      const isPhone = isPhoneMethod(newContactMethod);
      
      if ((wasEmail && isPhone) || (wasPhone && isEmail)) {
        phoneInput.value = "";
      }
      
      contactOptions.forEach(opt => {
        opt.style.borderColor = "transparent";
        opt.querySelector('input[type="checkbox"]').checked = false;
      });
      
      this.style.borderColor = "#e41820";
      checkbox.checked = true;
      
      currentContactMethod = newContactMethod;
      
      updatePhonePlaceholder(newContactMethod);
      updateErrorMessage(newContactMethod);
      
      phoneInput.classList.remove("error");
      phoneError.classList.remove("show");
    });
  });

  // Функция для обновления placeholder в зависимости от выбранного способа связи
  function updatePhonePlaceholder(contactMethod) {
    switch(contactMethod) {
      case 'email':
        phoneInput.placeholder = "Ваш email";
        phoneInput.type = "text";
        break;
      case 'whatsapp':
      case 'telegram':
      case 'max':
        phoneInput.placeholder = "Ваш номер телефона";
        phoneInput.type = "tel";
        break;
      default:
        phoneInput.placeholder = "Ваш номер телефона";
        phoneInput.type = "tel";
    }
  }

  // Функция для получения выбранного способа связи
  function getSelectedContactMethod() {
    for (let option of contactOptions) {
      const checkbox = option.querySelector('input[type="checkbox"]');
      if (checkbox.checked) {
        return checkbox.value;
      }
    }
    return null;
  }

  // Функция для валидации телефона
  function validatePhone(phone) {
    const phoneDigits = phone.replace(/\D/g, '');
    return phoneDigits.length === 11 && phoneDigits.startsWith('7');
  }

  // Функция для валидации email
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Функция для проверки на русские символы в email
  function hasRussianChars(text) {
    return /[а-яА-ЯёЁ]/.test(text);
  }

  // Отправка формы
  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const contactValue = phoneInput.value.trim();
    const selectedMethod = getSelectedContactMethod();
    const privacyCheckbox = document.querySelector('.privacy-checkbox input[type="checkbox"]');

    if (!selectedMethod) {
      alert("Пожалуйста, выберите способ связи");
      return;
    }

    let isValid = true;
    let errorMessage = "";

    if (!contactValue) {
      isValid = false;
      errorMessage = selectedMethod === 'email' ? "Укажите email" : "Укажите телефон";
    } else if (selectedMethod === 'email') {
      if (hasRussianChars(contactValue)) {
        isValid = false;
        errorMessage = "Email не должен содержать русские буквы";
      } else if (!validateEmail(contactValue)) {
        isValid = false;
        errorMessage = "Укажите корректный email";
      }
    } else if (selectedMethod !== 'email' && !validatePhone(contactValue)) {
      isValid = false;
      errorMessage = "Укажите корректный номер телефона";
    }

    if (!isValid) {
      phoneInput.classList.add("error");
      phoneError.classList.add("show");
      
      phoneError.innerHTML = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M9 6.75V9.5625M15.75 9C15.75 12.7279 12.7279 15.75 9 15.75C5.27208 15.75 2.25 12.7279 2.25 9C2.25 5.27208 5.27208 2.25 9 2.25C12.7279 2.25 15.75 5.27208 15.75 9ZM9 11.8125H9.00563V11.8181H9V11.8125Z"
          stroke="#E11D48"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>${errorMessage}`;
      
      return;
    }

    if (!privacyCheckbox.checked) {
      alert("Пожалуйста, согласитесь с политикой конфиденциальности");
      return;
    }

    // Вывод данных в консоль в формате JSON
    const formData = {
      contactData: contactValue,
      contactMethod: selectedMethod,
      timestamp: new Date().toLocaleString('ru-RU'),
      date: new Date().toISOString()
    };
    
    console.log('Форма отправлена:', formData);

    // Показываем сообщение об успехе
    let methodName = '';
    switch(selectedMethod) {
      case 'email': methodName = 'Email'; break;
      case 'whatsapp': methodName = 'WhatsApp'; break;
      case 'telegram': methodName = 'Telegram'; break;
      case 'max': methodName = 'MAX'; break;
    }
    
    showThankYou(methodName);
    
    // Очищаем форму
    phoneInput.value = "";
    document.querySelector('.privacy-checkbox input[type="checkbox"]').checked = false;
    
    // Возвращаем начальное состояние через 3 секунды
    setTimeout(() => {
      modalOverlay.classList.remove("active");
      showForm();
      initContactOptions();
    }, 3000);
  });

  // Сброс ошибки при вводе в поле
  phoneInput.addEventListener("input", function() {
    if (this.value.trim()) {
      this.classList.remove("error");
      phoneError.classList.remove("show");
    }
  });

  // Инициализация начального состояния
  initContactOptions();
  initInputHandlers();
});