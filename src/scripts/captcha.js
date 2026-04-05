// Хранилище для экземпляров капч
  const captchaInstances = {};

  // Общая функция callback для любой капчи
  function callback(captchaId, token) {
    console.log(`Капча ${captchaId} получила токен:`, token);
    
    const submitBtn = document.getElementById(captchaId === 'modal' ? 'modalSubmitBtn' : 'submitBtn');
    if (submitBtn) {
      if (token) {
        submitBtn.removeAttribute('disabled');
        // Можно сохранить токен в скрытое поле
        const tokenInput = document.getElementById(`${captchaId}_token`);
        if (tokenInput) tokenInput.value = token;
      } else {
        submitBtn.setAttribute('disabled', '1');
      }
    }
  }

  // Функция рендеринга капчи по ID контейнера
  function renderCaptcha(containerId, captchaId, sitekey) {
    if (!window.smartCaptcha || !document.getElementById(containerId)) {
      console.warn(`SmartCaptcha не загружен или контейнер ${containerId} не найден`);
      return null;
    }

    const instance = window.smartCaptcha.render(containerId, {
      sitekey: sitekey,
      callback: (token) => callback(captchaId, token),
    });
    
    return instance;
  }

  // Инициализация всех капч на странице
  function smartCaptchaInit() {
    if (!window.smartCaptcha) {
      console.warn('SmartCaptcha не загружен');
      return;
    }

    // Пример: основная капча на странице
    if (document.getElementById('captcha-container')) {
      captchaInstances.main = renderCaptcha('captcha-container', 'main', 'ysc1_o5DotQ7iADow6sUyTpI2f1spq65AHrRqQRf1cOy4f7383e73');
    }

    // Пример: капча в модалке
    if (document.getElementById('modal-captcha-container')) {
      captchaInstances.modal = renderCaptcha('modal-captcha-container', 'modal', 'ysc1_o5DotQ7iADow6sUyTpI2f1spq65AHrRqQRf1cOy4f7383e73');
    }

    // Можно добавить сколько угодно капч
    // if (document.getElementById('another-captcha-container')) {
    //   captchaInstances.another = renderCaptcha('another-captcha-container', 'another', 'ДРУГОЙ_SITEKEY');
    // }
  }

  // Сброс конкретной капчи
  function smartCaptchaReset(captchaId = null) {
    if (!window.smartCaptcha) return;
    
    if (captchaId && captchaInstances[captchaId]) {
      window.smartCaptcha.reset(captchaInstances[captchaId]);
      console.log(`Капча ${captchaId} сброшена`);
    } else if (captchaId === null) {
      // Сброс всех капч
      Object.keys(captchaInstances).forEach(id => {
        if (captchaInstances[id]) {
          window.smartCaptcha.reset(captchaInstances[id]);
        }
      });
      console.log('Все капчи сброшены');
    }
  }

  // Получение ответа конкретной капчи
  function smartCaptchaGetResponse(captchaId) {
    if (!window.smartCaptcha || !captchaInstances[captchaId]) {
      console.warn(`Капча ${captchaId} не найдена`);
      return null;
    }
    
    const response = window.smartCaptcha.getResponse(captchaInstances[captchaId]);
    console.log(`Ответ капчи ${captchaId}:`, response);
    return response;
  }

  // Функция для проверки всех капч перед отправкой формы
  function areAllCaptchasValid() {
    let allValid = true;
    const results = {};
    
    Object.keys(captchaInstances).forEach(id => {
      const response = smartCaptchaGetResponse(id);
      results[id] = !!response;
      if (!response) allValid = false;
    });
    
    console.log('Статус всех капч:', results);
    return allValid;
  }

  // Пример: отправка формы с проверкой всех капч
  function submitWithCaptchas(formId) {
    if (!areAllCaptchasValid()) {
      alert('Пожалуйста, подтвердите все капчи');
      return false;
    }
    
    const form = document.getElementById(formId);
    if (form) {
      // Собираем токены всех капч
      Object.keys(captchaInstances).forEach(id => {
        const token = smartCaptchaGetResponse(id);
        const hiddenField = document.createElement('input');
        hiddenField.type = 'hidden';
        hiddenField.name = `captcha_${id}_token`;
        hiddenField.value = token;
        form.appendChild(hiddenField);
      });
      
      form.submit();
    }
    return true;
  }

  // При открытии модалки — пересоздаём капчу (если нужно)
  function onModalOpen() {
    // Сбрасываем старую капчу в модалке
    if (captchaInstances.modal) {
      smartCaptchaReset('modal');
    } else {
      // Если капча не была инициализирована из-за того, что модалка была скрыта
      if (document.getElementById('modal-captcha-container') && window.smartCaptcha) {
        captchaInstances.modal = renderCaptcha('modal-captcha-container', 'modal', 'ysc1_o5DotQ7iADow6sUyTpI2f1spq65AHrRqQRf1cOy4f7383e73');
      }
    }
  }