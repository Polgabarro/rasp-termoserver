import './common/env';
import Server from './common/server';
import routes from './routes';
import temperatureProvider from './api/provider/sensor.provider';

export default new Server()
  .router(routes)
  .listen(process.env.PORT);

console.log('Start sensor watching...');
temperatureProvider.startSensor();
