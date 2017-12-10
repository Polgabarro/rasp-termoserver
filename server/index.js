import './common/env';
import Server from './common/server';
import routes from './routes';
import sensorProvider from './api/services/sensor.service';

export default new Server()
  .router(routes)
  .listen(process.env.PORT);

sensorProvider.startSensor();
