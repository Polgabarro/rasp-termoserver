import l from '../../common/logger';
import TermoConfigModel from './../../common/database';


class ConfigService {
  constructor() {
    if (!ConfigService.instance) {
      ConfigService.instance = this;
      this.init();
    }

    return ConfigService.instance;
  }
  init() {
    l.info('LoadConfig');
    this.loadConfig();
  }
  loadConfig() {
    TermoConfigModel.findOne(err, config => {
      if (err) {
        this.insertDefaultConf();
      } else {
        l.info(config);
      }
    });
  }
  insertDefaultConf() {
    const termoConfig = new TermoConfigModel({
      state: false,
      freezeeTemp: 10,
    });
    termoConfig.save().then(() => {
      l.info('Config saved');
    });
  }
}

const instance = new ConfigService();

export default instance;
