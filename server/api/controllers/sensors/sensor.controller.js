import 'rxjs/add/operator/first';

import sensorProvider from '../../provider/sensor.provider';


export class Controller {
  temperature(req, res) {
    sensorProvider.tempObserver.first().subscribe({
      next: x => {
        res.json(x);
      },
    });
  }
  pressure(req, res) {
    sensorProvider.pressureObserver.first().subscribe({
      next: x => {
        res.json(x);
      },
    });
  }
}
export default new Controller();
