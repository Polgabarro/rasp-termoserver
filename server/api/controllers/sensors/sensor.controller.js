import 'rxjs/add/operator/first';

import sensorService from '../../services/sensor.service';


export class Controller {
  temperature(req, res) {
    sensorService.tempObserver.first().subscribe({
      next: x => {
        res.json(x);
      },
    });
  }
  pressure(req, res) {
    sensorService.pressureObserver.first().subscribe({
      next: x => {
        res.json(x);
      },
    });
  }
}
export default new Controller();
