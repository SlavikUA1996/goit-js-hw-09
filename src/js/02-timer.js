// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// all modules
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import Notiflix from 'notiflix';
// import 'notiflix/dist/notiflix-3.2.6.min.css';






let selectTime = null;

const refs = {
    inputDate: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
};


//Готова функція для підрахунку значень
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


function pad(value) {
    return String(value).padStart(2, '0');
}

//Обєкт із завдання
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0] <= new Date()) {
        //   startBtn.disabled = true;
          Notify.failure('Please choose a date in the future');
          selectedDates[0] = new Date();
      } else {
          refs.startBtn.disabled = false;
          selectTime = selectedDates[0];
      }
    // console.log(selectedDates[0]);
  },
};

class Timer {
    constructor() {
        this.timerId = null;
        this.isActive = false;
        refs.startBtn.disabled = true;
    }
    
    startTimer() {
    if (this.isActive) {
        return;
        }

        this.isActive = true;
        this.timerId = setInterval(() => {
            const currentTime = new Date();
            const deltaTime = selectTime - currentTime;
            const componentTimer = convertMs(deltaTime);
            this.updateComponentTimer(componentTimer);
            if (deltaTime <= 0) {
                this.stopTimer();
            }
        }, 1000);
    }    
    
    updateComponentTimer({ days, hours, minutes, seconds }) {
        refs.days.textContent = days;
        refs.hours.textContent = hours;
        refs.minutes.textContent = minutes;
        refs.seconds.textContent = seconds;
        
    }

    stopTimer() {
        clearInterval(this.timerId);
    }
}

const timer = new Timer();
flatpickr(refs.inputDate, options);
refs.startBtn.addEventListener('click', () => timer.startTimer());