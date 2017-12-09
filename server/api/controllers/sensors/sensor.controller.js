import 'rxjs/add/operator/first';

import temperatureProvider from '../../provider/sensor.provider';


export class Controller {
  temperature(req, res) {
    temperatureProvider.tempObserver.first().subscribe({
      next: x => {
        res.json(x);
      },
    });
  }
  pressure(req, res) {
    temperatureProvider.pressureObserver.first().subscribe({
      next: x => {
        res.json(x);
      },
    });
  }
}
export default new Controller();
