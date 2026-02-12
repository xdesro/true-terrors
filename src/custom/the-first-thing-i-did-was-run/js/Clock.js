import gsap from 'gsap';

export default class Clock {
  constructor({ el }) {
    this.el = el;
    this.currentTime = 0; // in milliseconds since midnight
    this.isRunning = false;
    this.interval = null;
    this.tweenObj = { value: 0 };
    this.tween = null;
    this.el.textContent = this.msToTime(this.currentTime);
  }

  dateToMs(date) {
    // Convert a Date to milliseconds elapsed since midnight
    return (
      date.getHours() * 3600000 +
      date.getMinutes() * 60000 +
      date.getSeconds() * 1000 +
      date.getMilliseconds()
    );
  }

  msToTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600) + 12;
    const centiseconds = Math.floor((ms % 1000) / 10);

    const pad = (num) => String(num).padStart(2, '0');
    return `${pad(hours % 24)}:${pad(minutes)}:${pad(seconds)}.${pad(
      centiseconds,
    )}`;
  }

  setTime(newTime, duration = 0.5) {
    const targetMs = this.dateToMs(newTime);
    const currentMs = this.currentTime;

    let targetValue = targetMs;
    if (targetMs <= currentMs) {
      targetValue += 86400000; // Add 24 hours if target is earlier in the day
    }

    if (this.tween) {
      this.tween.kill();
    }

    this.tweenObj.value = this.currentTime;

    this.tween = gsap.to(this.tweenObj, {
      value: targetValue,
      duration: duration,
      onUpdate: () => {
        this.currentTime = this.tweenObj.value % 86400000;
        this.el.textContent = this.msToTime(this.currentTime);
      },
    });
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;

    this.interval = setInterval(() => {
      this.currentTime += 100;
      if (this.currentTime >= 86400000) {
        this.currentTime -= 86400000;
      }

      this.el.textContent = this.msToTime(this.currentTime);
    }, 100);
  }

  stop() {
    if (!this.isRunning) return;
    this.isRunning = false;
    clearInterval(this.interval);
  }

  toggle() {
    this.isRunning ? this.stop() : this.start();
  }
}
