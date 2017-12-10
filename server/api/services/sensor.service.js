import { ReplaySubject } from 'rxjs/ReplaySubject';
import l from '../../common/logger';

// eslint-disable-next-line import/no-unresolved
const RaspiSensors = require('raspi-sensors');


class SensorService {
  constructor() {
    if (!SensorService.instance) {
      SensorService.instance = this;
      this.init();
    }

    return SensorService.instance;
  }

  init() {
    l.info('Start sensor watching...');
    this.interval = null;
    this.tempObserver = null;
    this.BMP180 = null;
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
    }, process.env.SENSOR_INTERVAL_TIME * 1000);
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
      //  console.error('An error occured!');
        l.error(err.cause);
        this.tempObserver.next(this.genTempData());
        this.pressureObserver.next(this.genPressureData());
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

  genPressureData() {
    return {
      type: 'Pressure',
      unit: 'Pascal',
      unit_display: 'Pa',
      value: 101670,
      date: '2017-12-09T17:26:22.978Z',
      timestamp: 1512840382978,
      sensor_name: 'BMP180',
      sensor_type: 'BMP180',
    };
  }

  genTempData() {
    return {
      type: 'Temperature',
      unit: 'Degree Celsius',
      unit_display: '°C',
      value: 21.299999237060547,
      date: '2017-12-09T17:26:13.971Z',
      timestamp: 1512840373971,
      sensor_name: 'BMP180',
      sensor_type: 'BMP180',
    };
  }
}

const instance = new SensorService();

export default instance;
