import { HeroDatabase } from '../data/hero-interface';
import { Hero } from '../model/hero-business';

/**
 * Service class for managing hero-related operations.
 */
export class HeroService {
  /**
   * Creates an instance of the HeroService.
   *
   * @param {HeroDatabase} heroDatabase - The database implementation to use.
   */
  public constructor(private heroDatabase: HeroDatabase) {}

  /**
   * Retrieves all heroes from the database.
   *
   * @returns {Promise<Hero[] | 'no_data' | 'server_error'>} A promise that resolves to an array of Hero objects if successful,
   * or an error code if unsuccessful.
   */
  public async getHeroes(): Promise<Hero[] | 'no_data' | 'server_error'> {
    return await this.heroDatabase.getHeroes();
  }

  /**
   * Retrieves a hero by their ID from the database.
   *
   * @param {number} id - The ID of the hero to retrieve.
   * @returns {Promise<Hero | 'no_data' | 'server_error'>} A promise that resolves to a Hero object if found,
   * or an error code if not found or an error occurs.
   */
  public async getHeroById(id: number): Promise<Hero | 'no_data' | 'server_error'> {
    return await this.heroDatabase.getHeroById(id);
  }

  /**
   * Retrieves heroes by their name (partial match) from the database.
   *
   * @param {string} name - The name (or part of the name) of the heroes to retrieve.
   * @returns {Promise<Hero[] | 'no_data' | 'server_error'>} A promise that resolves to an array of Hero objects if found,
   * or an error code if not found or an error occurs.
   */
  public async getHeroesByName(name: string): Promise<Hero[] | 'no_data' | 'server_error'> {
    return await this.heroDatabase.getHeroesByName(name);
  }

  /**
   * Updates the name of a hero in the database by their ID.
   *
   * @param {number} id - The ID of the hero to update.
   * @param {string} newName - The new name for the hero.
   * @returns {Promise<boolean | 'validation_error'>} A promise that resolves to true if the update is successful,
   * 'validation_error' if the hero is not found, or false if an error occurs.
   */
  public async setHeroNameById(id: number, newName: string): Promise<boolean | 'validation_error'> {
    const hero = new Hero(id, newName);
    if (hero === undefined) {
      return 'validation_error';
    }
    const updateSucces = await this.heroDatabase.setHeroNameById(hero);
    return updateSucces;
  }

  /**
   * Creates a new hero in the database with the given name.
   *
   * @param {string} name - The name of the hero to create.
   * @returns {Promise<boolean | 'validation_error'>} A promise that resolves to true if the hero is created successfully,
   * 'validation_error' if the name is too short, or false if an error occurs.
   */
  public async createHero(name: string): Promise<boolean | 'validation_error'> {
    if (name.length <= 1) {
      return 'validation_error';
    }
    const creationSucces = await this.heroDatabase.createHero(name);
    return creationSucces;
  }

  /**
   * Deletes a hero from the database by their ID.
   *
   * @param {number} id - The ID of the hero to delete.
   * @returns {Promise<boolean | 'validation_error'>} A promise that resolves to true if the hero is deleted successfully,
   * 'validation_error' if the ID is invalid, or false if an error occurs.
   */
  public async deleteHero(id: number): Promise<boolean | 'validation_error'> {
    if (id <= 0) {
      return 'validation_error';
    }
    const deletionSucces = await this.heroDatabase.deleteHero(id);
    return deletionSucces;
  }
}
