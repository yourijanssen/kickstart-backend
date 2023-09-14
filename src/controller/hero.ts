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
   * Retrieves all heroes from the database.
   *
   * @param {express.Request} req - The request object.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>} A promise that handles the response based on the result of the operation.
   */
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

  /**
   * Retrieves a hero by their ID from the database.
   *
   * @param {express.Request} req - The request object containing the hero ID.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>} A promise that handles the response based on the result of the operation.
   */
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

  // functie die the 3 get request consolideert. covert http response

  /**
   * Retrieves heroes by their name (partial match) from the database.
   *
   * @param {express.Request} req - The request object containing the hero name.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>} A promise that handles the response based on the result of the operation.
   */
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

  /**
   * Updates the name of a hero in the database by their ID.
   *
   * @param {express.Request} req - The request object containing the hero ID and new name.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>} A promise that handles the response based on the result of the operation.
   */
  public async setHeroNameById(req: express.Request, res: express.Response): Promise<void> {
    const heroId = parseInt(req.params.id, 10);
    const name = req.body.name;
    if (isNaN(heroId) || !name) {
      res.status(400).json({ error: 'Invalid hero data' });
      return;
    }

    const heroUpdateResult: boolean | 'validation_error' = await this.heroService.setHeroNameById(
      heroId,
      name
    );
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

  /**
   * Creates a new hero in the database.
   *
   * @param {express.Request} req - The request object containing the new hero's name.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>} A promise that handles the response based on the result of the operation.
   */
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

  /**
   * Deletes a hero from the database by their ID.
   *
   * @param {express.Request} req - The request object containing the hero ID.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>} A promise that handles the response based on the result of the operation.
   */
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
