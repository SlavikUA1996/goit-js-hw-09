function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}


const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
};

function backgroundColor(color) {
    document.body.style.backgroundColor = color;
};


class ColorSwitcher {
    constructor(backgroundColor) {
        this.intervalId = null;
        this.isActive = false;
        this.backgroundColor = true;
    }


startChangeColor() {
    if (this.isActive) {
        return;   
    }
    
    refs.startBtn.disabled = true;
    refs.stoptBtn.disabled = false;

    this.isActive = true;
    this.intervalId = setInterval (() => backgroundColor(getRandomHexColor()), 1000)
}

stopChangeColor() {
    refs.startBtn.disabled = false;
    refs.stoptBtn.disabled = true;

    clearInterval(this.intervalId);
    this.isActive = false;
}
}


const colorSwitcher = new ColorSwitcher();

refs.startBtn.addEventListener('click', () => colorSwitcher.startChangeColor());
refs.stopBtn.addEventListener('click', () => colorSwitcher.stopChangeColor());