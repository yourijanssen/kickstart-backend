import * as express from 'express';
import { HeroService } from '../service/hero';
import { Hero } from '../model/hero-business';

/**
 * Controller for managing hero-related operations.
 */
export class HeroController {
  /**
   * Creates an instance of the HeroController.
   * @param {HeroService} heroService - The hero service to use.
   */
  constructor(private heroService: HeroService) {}

  /**
   * Get a list of all heroes.
   * @param {express.Request} req - The Express request object.
   * @param {express.Response} res - The Express response object.
   */
  public async getHeroes(req: express.Request, res: express.Response): Promise<void> {
    try {
      const heroes: Hero[] = await this.heroService.getHeroes();
      res.status(200).json(heroes);
    } catch (error) {
      res.status(500).json({ error: 'A server error occurred' });
    }
  }

  /**
   * Get a hero by their ID.
   * @param {express.Request} req - The Express request object with a "id" parameter.
   * @param {express.Response} res - The Express response object.
   */
  public async getHeroById(req: express.Request, res: express.Response): Promise<void> {
    try {
      const heroId = parseInt(req.params.id, 10);
      if (isNaN(heroId)) {
        res.status(400).json({ error: 'Invalid hero ID' });
        return;
      }
      const hero: Hero | null = await this.heroService.getHeroById(heroId);
      if (!hero) {
        res.status(404).json({ error: 'Hero not found' });
        return;
      }
      res.status(200).json(hero);
    } catch (error) {
      res.status(500).json({ error: 'A server error occurred' });
    }
  }

  /**
   * Get heroes by their name.
   * @param {express.Request} req - The Express request object with a "name" parameter.
   * @param {express.Response} res - The Express response object.
   */
  public async getHeroesByName(req: express.Request, res: express.Response): Promise<void> {
    try {
      const heroName: string | undefined = req.params.name;
      if (!heroName) {
        res.status(400).json({ error: 'Invalid hero name' });
        return;
      }
      const heroes: Hero[] = await this.heroService.getHeroesByName(heroName);
      res.status(200).json(heroes);
    } catch (error) {
      res.status(500).json({ error: 'A server error occurred' });
    }
  }

  /**
   * Update a hero's name by their ID.
   * @param {express.Request} req - The Express request object with a "id" parameter and "name" in the request body.
   * @param {express.Response} res - The Express response object.
   */
  public async updateHeroNameById(req: express.Request, res: express.Response): Promise<void> {
    try {
      const heroId = parseInt(req.params.id, 10);
      const { name } = req.body;
      if (isNaN(heroId) || !name) {
        res.status(400).json({ error: 'Invalid hero data' });
        return;
      }
      await this.heroService.updateHeroNameById(heroId, name);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'A server error occurred' });
    }
  }

  /**
   * Create a new hero.
   * @param {express.Request} req - The Express request object with "name" in the request body.
   * @param {express.Response} res - The Express response object.
   */
  public async createHero(req: express.Request, res: express.Response): Promise<void> {
    try {
      const { name } = req.body;
      if (!name) {
        res.status(400).json({ error: 'Invalid hero data' });
        return;
      }
      const newHeroId: number | undefined = await this.heroService.createHero(name);
      if (newHeroId === undefined) {
        res.status(500).json({ error: 'Failed to create hero' });
        return;
      }
      res.status(201).json({ id: newHeroId });
    } catch (error) {
      res.status(500).json({ error: 'A server error occurred' });
    }
  }

  /**
   * Delete a hero by their ID.
   * @param {express.Request} req - The Express request object with a "id" parameter.
   * @param {express.Response} res - The Express response object.
   */
  public async deleteHero(req: express.Request, res: express.Response): Promise<void> {
    try {
      const heroId = parseInt(req.params.id, 10);
      if (isNaN(heroId)) {
        res.status(400).json({ error: 'Invalid hero ID' });
        return;
      }
      await this.heroService.deleteHero(heroId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'A server error occurred' });
    }
  }
}
