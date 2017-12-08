import './common/env';
import Server from './common/server';
import routes from './routes';
import temperatureProvider from './api/provider/temperatureprovider';

export default new Server()
  .router(routes)
  .listen(process.env.PORT);

console.log('Start sensor watching...');
temperatureProvider.start();
temperatureProvider.tempObserver.subscribe({
  next: x => console.log(`got value ${x}`),
  error: err => console.error(`something wrong occurred: ${err}`),
  complete: () => console.log('done'),
});
