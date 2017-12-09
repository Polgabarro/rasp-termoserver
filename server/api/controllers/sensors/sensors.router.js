import * as express from 'express';
import controller from './sensor.controller';

export default express
  .Router()
  .get('/temperature', controller.temperature)
  .get('/pressure', controller.pressure());

