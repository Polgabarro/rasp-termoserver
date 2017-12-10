import l from '../../common/logger';

class TermoService {
  constructor() {
    if (!TermoService.instance) {
      TermoService.instance = this;
      this.init();
    }

    return TermoService.instance;
  }
  init() {
    this.working = false;
  }
  start() {
    this.working = true;
    l.info('Activate termo');
  }

  stop() {
    if (!this.working) {
      return;
    }
    this.working = false;
    l.info('Desactivate termo');
  }
  isRuning() {
    // TODO: More complex in the future
    return !!this.working;
  }
}

const instance = new TermoService();

export default instance;
