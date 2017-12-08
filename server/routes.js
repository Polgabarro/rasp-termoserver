import examplesRouter from './api/controllers/examples/router';
import sensorRouter from './api/controllers/sensors/sensors.router';


export default function routes(app) {
  app.use('/api/v1/examples', examplesRouter);
  app.use('/api/v1/sensors', sensorRouter);
}
