import express, { Request, Response, Router } from 'express';
import { HeroController } from '../../controller/hero';

/**
 * Class for managing hero-related routes.
 */
export class HeroRoutes {
  private readonly router: Router = express.Router();

  constructor(private heroController: HeroController) {
    this.setupRoutes();
  }

  /**
   * Set up all hero-related routes.
   */
  private setupRoutes(): void {
    this.router.get('/all', this.getAllHeroes);
    this.router.get('/:id', this.getHeroById);
    this.router.get('/names/:name', this.searchHeroesByName);
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
   * Retrieve heroes by name.
   */
  private searchHeroesByName = async (req: Request, res: Response): Promise<void> => {
    this.heroController.searchHeroesByName(req, res);
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
   */
  private deleteHero = async (req: Request, res: Response): Promise<void> => {
    this.heroController.deleteHero(req, res);
  };

  /**
   * Get the router containing hero-related routes.
   * @returns {Router} The router with hero routes.
   */
  public getHeroRouter(): Router {
    return this.router;
  }
}
