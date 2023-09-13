import { HeroDatabase } from '../data/hero-interface';
import { Hero } from '../model/hero-business';

/**
 * Service class for managing hero-related operations.
 */
export class HeroService {
  /**
   * Creates an instance of the HeroService.
   * @param {HeroDatabase} heroDatabase - The database implementation to use.
   */
  public constructor(private heroDatabase: HeroDatabase) {}

  public async getHeroes(): Promise<Hero[] | 'no_data' | 'server_error'> {
    return await this.heroDatabase.getHeroes();
  }

  public async getHeroById(id: number): Promise<Hero | 'no_data' | 'server_error'> {
    return await this.heroDatabase.getHeroById(id);
  }

  public async getHeroesByName(name: string): Promise<Hero[] | 'no_data' | 'server_error'> {
    return await this.heroDatabase.getHeroesByName(name);
  }

  public async updateHeroNameById(
    id: number,
    newName: string
  ): Promise<boolean | 'validation_error'> {
    const hero = new Hero(id, newName);
    if (hero === undefined) {
      return 'validation_error';
    }
    const updateSucces = await this.heroDatabase.setHeroNameById(hero);
    return updateSucces;
  }

  public async createHero(name: string): Promise<boolean | 'validation_error'> {
    if (name.length <= 1) {
      return 'validation_error';
    }
    const creationSucces = await this.heroDatabase.createHero(name);
    return creationSucces;
  }

  public async deleteHero(id: number): Promise<boolean | 'validation_error'> {
    if (id <= 0) {
      return 'validation_error';
    }
    const deletionSucces = await this.heroDatabase.deleteHero(id);
    return deletionSucces;
  }
}
