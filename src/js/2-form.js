const refs = {
  feedbackForm: document.querySelector('.feedback-form'),
};

const STORAGE_KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

function debounce(fn, wait = 300) {
  let timer;
  return function debounced(...args) {
    const ctx = this;
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(ctx, args), wait);
  };
}

const loadStateFromLS = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved === null) return;

    refs.feedbackForm.elements.email.value = saved.email ?? '';
    refs.feedbackForm.elements.message.value = saved.message ?? '';

    formData = saved;
  } catch (err) {
    console.log(err.message);
  }
};

loadStateFromLS();

const onFeedbackFormInputRaw = () => {
  const { email, message } = refs.feedbackForm.elements;

  formData.email = email.value.trim();
  formData.message = message.value.trim();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

const onFeedbackFormInput = debounce(onFeedbackFormInputRaw, 300);

const onFeedbackFormSubmit = e => {
  e.preventDefault();
  const valueFormData = Object.values(formData);
  if (valueFormData.includes('')) {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);
  formData.email = '';
  formData.message = '';
  refs.feedbackForm.reset();
  localStorage.removeItem(STORAGE_KEY);
};

refs.feedbackForm.addEventListener('input', onFeedbackFormInput);
refs.feedbackForm.addEventListener('submit', onFeedbackFormSubmit);
