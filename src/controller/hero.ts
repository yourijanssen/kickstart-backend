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

  public async getHeroes(req: express.Request, res: express.Response): Promise<void> {
    const heroesDataOrError: Hero[] | 'no_data' | 'server_error' =
      await this.heroService.getHeroes();

    switch (heroesDataOrError) {
      case 'no_data':
        res.status(404).json({ error: 'No heroes found' });
        break;
      case 'server_error':
        res.status(500).json({ error: 'A server error occurred' });
        break;
      default:
        res.status(200).json(heroesDataOrError);
    }
  }

  public async getHeroById(req: express.Request, res: express.Response): Promise<void> {
    const heroId = parseInt(req.params.id, 10);
    if (isNaN(heroId)) {
      res.status(400).json({ error: 'Invalid hero ID' });
      return;
    }
    const heroDataOrError = await this.heroService.getHeroById(heroId);
    switch (heroDataOrError) {
      case 'server_error':
        res.status(500).json({ error: 'A server error occurred' });
        break;
      case 'no_data':
        res.status(404).json({ error: 'No hero found' });
        break;
      default:
        res.status(200).json(heroDataOrError);
    }
  }

  public async getHeroesByName(req: express.Request, res: express.Response): Promise<void> {
    const heroName: string | undefined = req.params.name;
    if (!heroName) {
      res.status(400).json({ error: 'Invalid hero name' });
      return;
    }

    const heroDataOrError: Hero[] | 'no_data' | 'server_error' =
      await this.heroService.getHeroesByName(heroName);
    switch (heroDataOrError) {
      case 'no_data':
        res.status(404).json({ error: 'No heroes found' });
        break;
      case 'server_error':
        res.status(500).json({ error: 'A server error occurred' });
        break;
      default:
        res.status(200).json(heroDataOrError);
    }
  }

  public async updateHeroNameById(req: express.Request, res: express.Response): Promise<void> {
    const heroId = parseInt(req.params.id, 10);
    const name = req.body.name;
    if (isNaN(heroId) || !name) {
      res.status(400).json({ error: 'Invalid hero data' });
      return;
    }

    const heroUpdateResult: boolean | 'validation_error' =
      await this.heroService.updateHeroNameById(heroId, name);
    switch (heroUpdateResult) {
      case 'validation_error':
        res.status(400).json({ error: 'Invalid hero data' });
        break;
      case false:
        res.status(500).json({ error: 'A server error occurred' });
        break;
      default:
        res.status(200).json({ message: 'Hero updated' });
    }
  }

  public async createHero(req: express.Request, res: express.Response): Promise<void> {
    const name = req.body.name;
    if (!name) {
      res.status(400).json({ error: 'Invalid hero data' });
      return;
    }

    const heroCreationResult: boolean | 'validation_error' = await this.heroService.createHero(
      name
    );
    switch (heroCreationResult) {
      case 'validation_error':
        res.status(400).json({ error: 'Invalid hero data' });
        break;
      case false:
        res.status(500).json({ error: 'A server error occurred' });
        break;
      default:
        res.status(201).json({ message: 'Hero created' });
    }
  }

  public async deleteHero(req: express.Request, res: express.Response): Promise<void> {
    const heroId = parseInt(req.params.id, 10);
    if (isNaN(heroId)) {
      res.status(400).json({ error: 'Invalid hero ID' });
      return;
    }

    const heroDeletionResult: boolean | 'validation_error' = await this.heroService.deleteHero(
      heroId
    );
    switch (heroDeletionResult) {
      case 'validation_error':
        res.status(400).json({ error: 'Invalid hero ID, the ID does not exist' });
        break;
      case false:
        res.status(500).json({ error: 'A server error occurred' });
        break;
      default:
        res.status(200).json({ message: 'Hero deleted' });
    }
  }
}
