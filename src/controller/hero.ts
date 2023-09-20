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
    const heroes: Hero[] | 'no_data' | 'server_error' = await this.heroService.getHeroes();

    switch (heroes) {
      case 'no_data':
        res.status(404).json({ error: 'No heroes found' });
        break;
      case 'server_error':
        res.status(500).json({ error: 'A server error occurred' });
        break;
      default:
        res.status(200).json(heroes);
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
    const id = parseInt(req.params.id, 10);

    const hero = await this.heroService.getHeroById(id);
    switch (hero) {
      case 'server_error':
        res.status(500).json({ error: 'A server error occurred' });
        break;
      case 'no_data':
        res.status(404).json({ error: 'No hero found' });
        break;
      default:
        res.status(200).json(hero);
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
  public async searchHeroesByName(req: express.Request, res: express.Response): Promise<void> {
    const name: string | undefined = req.params.name;

    const heroes: Hero[] | 'no_data' | 'server_error' = await this.heroService.searchHeroesByName(
      name
    );
    switch (heroes) {
      case 'no_data':
        res.status(404).json({ error: 'No heroes found' });
        break;
      case 'server_error':
        res.status(500).json({ error: 'A server error occurred' });
        break;
      default:
        res.status(200).json(heroes);
    }
  }

  /**
   * Updates the name of a hero in the database by their ID.
   *
   * @param {express.Request} req - The request object containing the hero ID and new name.
   * @param {express.Response} res - The response object.
   * @returns {Promise<void>} A promise that handles the response based on the result of the operation.
   */
  public async updateHeroNameById(req: express.Request, res: express.Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    const name = req.body.name;

    const heroUpdateResult: boolean | string[] = await this.heroService.updateHeroNameById(
      id,
      name
    );

    if (typeof heroUpdateResult === 'boolean') {
      if (heroUpdateResult) {
        res.status(200).json({ message: 'Hero updated' });
      } else {
        res.status(500).json({ error: 'A server error occurred' });
      }
    } else {
      res.status(400).json({ error: heroUpdateResult });
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

    const heroCreationResult: boolean | string[] = await this.heroService.createHero(name);
    if (typeof heroCreationResult === 'boolean') {
      if (heroCreationResult) {
        res.status(201).json({ message: 'Hero created' });
      } else {
        res.status(500).json({ error: 'A server error occurred' });
      }
    } else {
      res.status(400).json({ error: heroCreationResult });
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
    const id = parseInt(req.params.id, 10);

    const heroDeletionResult: boolean = await this.heroService.deleteHero(id);
    if (heroDeletionResult) {
      res.status(200).json({ message: 'Hero deleted' });
    } else {
      res.status(500).json({ error: 'A server error occurred' });
    }
  }
}
