export default class Clock {
  constructor(el) {
    this.el = el;
    this.init();
  }
  init() {
    this.updateTime.bind(this);
    setInterval(this.updateTime.bind(this), 20000);
  }
  updateTime() {
    const time = this.time;
    this.el.innerHTML = time;
  }
  get time() {
    return new Date().toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  }
}
