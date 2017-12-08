import 'rxjs/add/operator/first';
import temperatureProvider from '../../provider/temperatureprovider';


export class Controller {
  temperature(req, res) {
    temperatureProvider.tempObserver.first().subscribe({
      next: x => {
        res.json({ temperature: x });
      },
    });
  }
}
export default new Controller();
