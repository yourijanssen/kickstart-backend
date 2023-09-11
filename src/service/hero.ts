import { HeroMysqlDatabase } from '../data/hero-sql';
import { HeroDatabase } from '../data/hero-interface';
import { Hero } from '../model/hero-business';

/**
 * Service class for managing hero-related operations.
 */
export class HeroService {
  /**
   * Creates an instance of the HeroService.
   * @param {HeroDatabase} database - The hero database to use.
   */
  // public constructor(private database: HeroDatabase) {}
  public constructor(private database: HeroDatabase = new HeroMysqlDatabase()) {}

  /**
   * Get a list of all heroes.
   * @returns {Promise<Hero[]>} A promise that resolves to an array of Hero objects.
   */
  public async getHeroes(): Promise<Hero[]> {
    const heroesFromDB: Hero[] = await this.database.getHeroes();
    return heroesFromDB;
  }

  /**
   * Get a hero by their ID.
   * @param {number} id - The ID of the hero to retrieve.
   * @returns {Promise<Hero | null>} A promise that resolves to a Hero object if found, or null if not found.
   */
  public async getHeroById(id: number): Promise<Hero | null> {
    const hero: Hero | null = await this.database.getHeroById(id);
    return hero;
  }

  /**
   * Get heroes with a specific name.
   * @param {string} name - The name of the heroes to retrieve.
   * @returns {Promise<Hero[]>} A promise that resolves to an array of Hero objects with the specified name.
   */
  public async getHeroesByName(name: string): Promise<Hero[]> {
    const heroes: Hero[] = await this.database.getHeroesByName(name);
    return heroes;
  }

  /**
   * Update a hero's name by their ID.
   * @param {number} id - The ID of the hero to update.
   * @param {string} newName - The new name for the hero.
   * @returns {Promise<void>} A promise that resolves when the update is complete.
   */
  public async updateHeroNameById(id: number, newName: string): Promise<void> {
    const hero: Hero = new Hero(id, newName);
    this.database.setHeroNameById(hero);
  }

  /**
   * Create a new hero.
   * @param {string} name - The name of the new hero.
   * @returns {Promise<number | undefined>} A promise that resolves to the ID of the newly created hero, or undefined if the creation fails.
   */
  public async createHero(name: string): Promise<number | undefined> {
    const newHeroId: number | undefined = await this.database.createHero(name);
    return newHeroId;
  }

  /**
   * Delete a hero by their ID.
   * @param {number} id - The ID of the hero to delete.
   * @returns {Promise<void>} A promise that resolves when the deletion is complete.
   */
  public async deleteHero(id: number): Promise<void> {
    await this.database.deleteHero(id);
  }
}
