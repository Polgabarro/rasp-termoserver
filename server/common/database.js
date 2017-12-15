import mongoose from 'mongoose';
import l from './logger';


class Database {
  constructor() {
    if (!Database.instance) {
      Database.instance = this;
    }

    return Database.instance;
  }
  init() {
    mongoose.connect('mongodb://localhost/termodb');
    const db = mongoose.connection;
    db.on('error', l.error.bind(console, 'Database connection error:'));
    db.once('open', () => {
      l.info('Database connection successfull!');
    });
  }
}

const instance = new Database();

export default instance;


/*
  SCHEMAS
 */

const termoConfigSchema = mongoose.Schema({
  state: Boolean,
  freezeeTemp: Number,
});

const scheludeSchema = mongoose.Schema({
  priority: Number,
  initDate: Date,
  finalDate: Date,
  repeat: Boolean,
  repeat_config: String,
});

const TermoConfigModel = mongoose.model('TermoConfig', termoConfigSchema);
const ScheludeModel = mongoose.model('Schelude', scheludeSchema);

export { TermoConfigModel, ScheludeModel };

