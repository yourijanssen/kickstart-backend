import express from 'express';
import config from 'dotenv';
import { HeroRoutes } from './util/routes/heroRoutes';

/**
 * The main server class responsible for setting up and starting the Express server.
 */
class Server {
  private app: express.Application;
  private port: number;
  private heroRoutes: HeroRoutes;

  /**
   * Create an instance of the Server class.
   */
  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || '3002', 10);
    this.heroRoutes = new HeroRoutes();

    this.configureMiddleware();
    this.configureRoutes();
  }

  /**
   * Configure middleware for the Express application.
   * Middleware includes JSON and URL-encoded request body parsers.
   */
  private configureMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    // Set specific CORS headers
    this.app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      next();
    });
  }

  /**
   * Configure routes for the Express application.
   * Mounts the HeroRoutes under the '/hero' path.
   */
  private configureRoutes() {
    this.app.use('/hero', this.heroRoutes.getRouter());
  }

  /**
   * Start the Express server on the specified port.
   */
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
