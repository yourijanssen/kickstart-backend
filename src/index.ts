import express from 'express';
import config from 'dotenv';
import { HeroRoutes } from './util/routes/heroRoutes';

/**  add a database choosing option HERE, based on the db_type instead of waiting for instanciation at the service level.
 * Make it look something like this:
 *
          if (process.env!.DB_SELECT == 'SEQUELIZE') {
        runSequelize();
        function runSequelize(): void {
    let sequelDatabase: SequelizeInit = SequelizeInit.getInstance();
    sequelDatabase.initTables();
    sequelDatabase.initRelations();
    let seeder: SequelizeSeeder = new SequelizeSeeder();
    sequelize
        //.sync({ force: true })
        .sync()
        .catch((error: any) => {
            console.error(`Error occured: ${error}`);
        });
}
    } else {
        runMysql();
        let createInstance = MysqlConfig.getInstance();
 */
class Server {
  private app: express.Application;
  private port: number;
  private heroRoutes: HeroRoutes;

  constructor() {
    this.app = express();
    this.port = this.parsePort(process.env.PORT);
    this.heroRoutes = new HeroRoutes();
    this.configureMiddleware();
    this.configureRoutes();
  }

  private parsePort(portString: string | undefined): number {
    // Parse the port from the environment variable or use a default value
    return parseInt(portString || '3002', 10);
  }

  private configureMiddleware() {
    // Middleware for parsing JSON and URL-encoded request bodies
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // CORS headers configuration
    this.app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      next();
    });
  }

  private configureRoutes() {
    // Mount HeroRoutes under the '/hero' path
    this.app.use('/hero', this.heroRoutes.getRouter());
  }

  public start() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on localhost:${this.port}`);
    });
  }
}

// Initialize environment variables from a .env file.
config.config();

// Create an instance of the Server class and start the server.
const server = new Server();
server.start();
