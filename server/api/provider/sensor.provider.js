import { ReplaySubject } from 'rxjs/ReplaySubject';

// eslint-disable-next-line import/no-unresolved
const RaspiSensors = require('raspi-sensors');


class SensorProvider {
  constructor() {
    this.interval = null;
    this.tempObserver = null;
    this.BMP180 = null;

    if (!SensorProvider.instance) {
      SensorProvider.instance = this;
      this.init();
    }

    return SensorProvider.instance;
  }

  init() {
    this.initBMP180();
  }

  startSensor() {
    if (this.isRuning()) {
      return;
    }

    this.tempObserver = new ReplaySubject(1);
    this.pressureObserver = new ReplaySubject(1);
    this.interval = setInterval(() => {
      this.getDataFromSensor();
    }, process.env.INTERVAL_TIME * 1000);
  }
  stopSensor() {
    clearInterval(this.interval);
  }
  getDataFromSensor() {
    this.getDataFromBMP180();
  }
  isRuning() {
    // TODO: More complex in the future
    return !!this.interval;
  }
  /**
   * SENSORS
   */

  initBMP180() {
    this.BMP180 = new RaspiSensors.Sensor({
      type: 'BMP180',
      address: 0x77,
    }, 'BMP180');
  }

  getDataFromBMP180() {
    this.BMP180.fetch((err, data) => {
      if (err) {
        console.error('An error occured!');
        console.error(err.cause);
        return;
      }
      // Log the values
      if (data.type === 'Temperature') {
        this.tempObserver.next(data);
      } else {
        this.pressureObserver.next(data);
      }
    });
  }
}

const instance = new SensorProvider();

export default instance;
