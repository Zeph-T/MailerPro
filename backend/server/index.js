import Server from './common/server';
import routes from './routes';
import env from './config/env'
export default new Server()
  .router(routes)
  .listen(env.PORT);
