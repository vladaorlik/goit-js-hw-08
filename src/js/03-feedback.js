import throttle from 'lodash.throttle';

const formEl = document.querySelector(".feedback-form");
const mailInput = document.querySelector('.feedback-form input');
const messageInput = document.querySelector('.feedback-form textarea');
const STORAGE_FORM_VALUE = "feedback-form-state";
const formData = { 
    email: "",
    message: "",
};

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onTextInput, 500));

getStorageData();

  function onTextInput() {
    if (mailInput.value || messageInput.value) {
      formData.email = mailInput.value;
      formData.message = messageInput.value;
      localStorage.setItem(STORAGE_FORM_VALUE, JSON.stringify(formData));
    }
  }

  function getStorageData() {
    const storageData = localStorage.getItem(STORAGE_FORM_VALUE);
    if (storageData) {
      const parsedData = JSON.parse(storageData);
      mailInput.value = parsedData.email ?? "";
      messageInput.value = parsedData.message ?? "";
    }
  }
  
  function onFormSubmit(evt) {
    evt.preventDefault();
    const {
        elements: { email, message }
    } = evt.target;

    if (!email.value.trim() || !message.value.trim()) {
      alert('Всі поля мають бути заповнені!');
    } else {
      formData.email = email.value.trim();
      formData.message = message.value.trim();
      console.log(formData);
  
      evt.currentTarget.reset();
      localStorage.removeItem(STORAGE_FORM_VALUE);
    }
  
  }