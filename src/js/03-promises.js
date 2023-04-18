import { Notify } from 'notiflix/build/notiflix-notify-aio';


const form = document.querySelector('.form');
form.addEventListener('submit', submitFormPromises);

const firstDelayMs = document.querySelector('[name="delay"]');
const delayStepMs = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');
function submitFormPromises(e) {
  e.preventDefault();

  let delay = firstDelayMs.valueAsNumber;
  const delayStepMsVal = delayStepMs.valueAsNumber;
  const amountVal = amount.valueAsNumber;
  

  for (let i = 1; i <= amountVal; i++) {
    createPromise(i, delay).then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    
    delay += delayStepMsVal;
  }
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

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
