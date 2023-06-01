import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {

  event.preventDefault();
  const { delay, step, amount } = event.target;


  let delMs = parseInt(delay.value);
  let stepMs = parseInt(step.value);
  const countPosition = parseInt(amount.value);
  let position = 0;

  if (stepMs < 0 || delMs < 0 || countPosition <= 0) {
    Notify.failure('Invalid input values');
    return;
  }

  const timerId = setInterval(() => {
    position += 1;
    if (position > countPosition) {
      clearInterval(timerId);

      return;
    }
    createPromise(position, delMs)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delMs += stepMs;
  }, stepMs);
  event.target.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
