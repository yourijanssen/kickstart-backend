import express, { Request, Response, Router } from 'express';
import { HeroController } from '../../controller/hero';

/**
 * Class for managing hero-related routes.
 */
export class HeroRoutes {
  private readonly router: Router = express.Router();
  private readonly heroController = new HeroController();

  constructor() {
    this.setupRoutes();
  }

  /**
   * Set up all hero-related routes.
   */
  private setupRoutes(): void {
    this.router.get('/all', this.getAllHeroes);
    this.router.get('/:id', this.getHeroById);
    this.router.get('/name/:name', this.getHeroByName);
    this.router.get('/names/:name', this.getHeroesByName);
    this.router.put('/:id', this.updateHeroNameById);
    this.router.post('/', this.createHero);
    this.router.delete('/:id', this.deleteHero);
  }

  /**
   * Retrieve all heroes.
   */
  private getAllHeroes = (req: Request, res: Response): void => {
    this.heroController.getHeroes(req, res);
  };

  /**
   * Retrieve a hero by ID.
   */
  private getHeroById = async (req: Request, res: Response): Promise<void> => {
    this.heroController.getHeroById(req, res);
  };

  /**
   * Retrieve a hero by name.
   */
  private getHeroByName = async (req: Request, res: Response): Promise<void> => {
    this.heroController.getHeroByName(req, res);
  };

  /**
   * Retrieve heroes by name.
   */
  private getHeroesByName = async (req: Request, res: Response): Promise<void> => {
    this.heroController.getHeroesByName(req, res);
  };

  /**
   * Update a hero's name by ID.
   */
  private updateHeroNameById = async (req: Request, res: Response): Promise<void> => {
    this.heroController.updateHeroNameById(req, res);
  };

  /**
   * Create a new hero.
   */
  private createHero = async (req: Request, res: Response): Promise<void> => {
    this.heroController.createHero(req, res);
  };

  /**
   * Delete a hero by ID.
   * @param {number} id - The ID of the hero
   */
  private deleteHero = async (req: Request, res: Response): Promise<void> => {
    this.heroController.deleteHero(req, res);
  };

  /**
   * Get the router containing hero-related routes.
   * @returns {Router} The router with hero routes.
   */
  public getRouter(): Router {
    return this.router;
  }
}
