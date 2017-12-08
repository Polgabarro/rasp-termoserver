import { ReplaySubject } from 'rxjs/ReplaySubject';

class TemperatureProvider {
  constructor() {
    this.interval = null;
    this.tempObserver = null;

    if (!TemperatureProvider.instance) {
      this._data = [];
      TemperatureProvider.instance = this;
    }

    return TemperatureProvider.instance;
  }

  start() {
    this.tempObserver = new ReplaySubject(1);
    this.interval = setInterval(() => {
      this.getDataFromSensor();
    }, process.env.INTERVAL_TIME * 1000);
  }
  stop() {
    clearInterval(this.interval);
  }
  getDataFromSensor() {
    this.tempObserver.next(this.genRandomTemperature());
  }
  isRuning() {
    // TODO: More complex in the future
    return !!this.interval;
  }

  genRandomTemperature() {
    return 15 + (Math.random() * 10);
  }
}

const instance = new TemperatureProvider();

export default instance;
