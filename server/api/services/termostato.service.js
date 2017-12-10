import l from '../../common/logger';
import termoService from './termo.service';
import sensorService from './sensor.service';

class TermoStatoService {
  constructor() {
    if (!TermoStatoService.instance) {
      this.interval = null;
      this.maxTemperature = process.env.DEFAULT_MAX_TEMP;
      TermoStatoService.instance = this;
      this.init();
    }

    return TermoStatoService.instance;
  }
  init() {
    this.working = false;
  }
  start() {
    this.working = true;
    l.info('Activate termostato');
    sensorService.tempObserver.subscribe({
      next: data => {
        this.checkTemperature(data.value);
      },
    });
  }
  stop() {
    if (!this.working) {
      return;
    }
    this.working = false;
    clearInterval(this.interval);
    l.info('Desactivate termostato');
  }
  isRuning() {
    // TODO: More complex in the future
    return !!this.working;
  }

  checkTemperature(value) {
    if (value > this.maxTemperature) {
      termoService.stop();
    } else {
      termoService.start();
    }
  }
  setTemperature(val) {
    this.maxTemperature = val;
  }
}

const instance = new TermoStatoService();

export default instance;
