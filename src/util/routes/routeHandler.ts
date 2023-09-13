import express, { Router } from 'express';
import { HeroService } from '../../service/hero';
import { HeroMysqlDatabase } from '../../data/hero-sql';
import { HeroController } from '../../controller/hero';
import { HeroRoutes } from './heroRoutes';
import { HeroSequelizeDatabase } from '../../data/hero-sequelize';

/**
 * Handles the initialization and assignment of routes for the Express application.
 */
export class RouteHandler {
  public router: Router = express.Router();

  /**
   * Creates a new instance of the RouteHandler class
   */
  constructor() {
    this.initializeControllers();
  }

  /**
   * Initializes controllers based on the database type and loads routes.
   */
  private initializeControllers(): void {
    if (process.env.DB_TYPE === 'sql') {
      const heroService = new HeroService(new HeroMysqlDatabase());
      const heroController = new HeroController(heroService);
      this.loadRoutes(heroController);
    } else if (process.env.DB_TYPE === 'sequelize') {
      const heroService = new HeroService(new HeroSequelizeDatabase());
      const heroController = new HeroController(heroService);
      this.loadRoutes(heroController);
    }
  }

  /**
   * Loads routes for a specific controller.
   * @param {HeroController} heroController - The HeroController instance.
   */
  private loadRoutes(heroController: HeroController): void {
    this.router.use('/hero', new HeroRoutes(heroController).getHeroRouter());
  }

  /**
   * Gets the Express Router instance with the application's routes loaded.
   * @returns {Router} The Express Router instance.
   */
  public assignRouteHandler(): Router {
    return this.router;
  }
}
