document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menuButton");
  const menuPanel = document.getElementById("menuPanel");
  const offerButton = document.getElementById("offerButton");
  const modalOverlay = document.getElementById("modalOverlay");
  const modalClose = document.getElementById("modalClose");
  const contactOptions = document.querySelectorAll(".contact-option");
  const submitBtn = document.getElementById("submit_btn");
  const phoneInput = document.getElementById("user_phone");

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
  });

  // Закрытие попапа по кнопке
  modalClose.addEventListener("click", function () {
    modalOverlay.classList.remove("active");
  });

  // Закрытие попапа по клику вне его
  modalOverlay.addEventListener("click", function (event) {
    if (event.target === modalOverlay) {
      modalOverlay.classList.remove("active");
    }
  });

  // Преобразуем checkbox в radio логику через JavaScript
  function initContactOptions() {
    // Сначала снимаем все выделения
    contactOptions.forEach(option => {
      option.style.borderColor = "transparent";
      const checkbox = option.querySelector('input[type="checkbox"]');
      checkbox.checked = false;
    });

    // Выбираем email по умолчанию
    const emailOption = contactOptions[0];
    emailOption.style.borderColor = "#e41820";
    emailOption.querySelector('input[type="checkbox"]').checked = true;
    
    // Устанавливаем placeholder для email
    phoneInput.placeholder = "Ваш email";
    phoneInput.type = "email";
  }

  // Обработчик выбора способа связи
  contactOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const checkbox = this.querySelector('input[type="checkbox"]');
      
      // Если уже выбран - ничего не делаем
      if (checkbox.checked) return;
      
      // Снимаем выделение со всех опций
      contactOptions.forEach(opt => {
        opt.style.borderColor = "transparent";
        opt.querySelector('input[type="checkbox"]').checked = false;
      });
      
      // Выделяем выбранную опцию
      this.style.borderColor = "#e41820";
      checkbox.checked = true;
      
      // Меняем placeholder в зависимости от выбранного способа
      updatePhonePlaceholder(checkbox.value);
    });
  });

  // Функция для обновления placeholder в зависимости от выбранного способа связи
  function updatePhonePlaceholder(contactMethod) {
    switch(contactMethod) {
      case 'email':
        phoneInput.placeholder = "Ваш email";
        phoneInput.type = "email";
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

  // Отправка формы
  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const contactValue = phoneInput.value;
    const selectedMethod = getSelectedContactMethod();
    const privacyCheckbox = document.querySelector('.privacy-checkbox input[type="checkbox"]');

    // Валидация поля ввода
    if (!contactValue) {
      phoneInput.classList.add("error");
      document.getElementById("phone-error").classList.add("show");
      document.getElementById("phone-error").textContent = "Укажите контактные данные";
      return;
    }

    // Валидация email
    if (selectedMethod === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactValue)) {
        phoneInput.classList.add("error");
        document.getElementById("phone-error").classList.add("show");
        document.getElementById("phone-error").textContent = "Укажите корректный email";
        return;
      }
    }

    // Проверка выбора способа связи
    if (!selectedMethod) {
      alert("Пожалуйста, выберите способ связи");
      return;
    }

    // Проверка согласия с политикой
    if (!privacyCheckbox.checked) {
      alert("Пожалуйста, согласитесь с политикой конфиденциальности");
      return;
    }

    // Здесь должна быть логика отправки формы на сервер
    console.log("Данные формы:");
    console.log("Контакт:", contactValue);
    console.log("Способ связи:", selectedMethod);

    // Показываем сообщение об успехе
    let methodName = '';
    switch(selectedMethod) {
      case 'email': methodName = 'Email'; break;
      case 'whatsapp': methodName = 'WhatsApp'; break;
      case 'telegram': methodName = 'Telegram'; break;
      case 'max': methodName = 'MAX'; break;
    }
    
    alert(`Спасибо! Мы свяжемся с вами через ${methodName} в ближайшее время.`);
    
    // Закрываем попап
    modalOverlay.classList.remove("active");
    
    // Очищаем форму
    phoneInput.value = "";
    document.querySelector('.privacy-checkbox input[type="checkbox"]').checked = false;
    
    // Возвращаем начальное состояние
    initContactOptions();
  });

  // Сброс ошибки при вводе в поле
  phoneInput.addEventListener("input", function() {
    if (this.value.trim()) {
      this.classList.remove("error");
      document.getElementById("phone-error").classList.remove("show");
    }
  });

  // Инициализация начального состояния
  initContactOptions();
});