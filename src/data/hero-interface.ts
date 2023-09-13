import { Hero } from '../model/hero-business';

/**
 * Represents a database interface for managing Hero data.
 */
export interface HeroDatabase {
  getHeroes(): Promise<Hero[] | 'no_data' | 'server_error'>;
  getHeroById(id: number): Promise<Hero | 'no_data' | 'server_error'>;
  getHeroesByName(name: string): Promise<Hero[] | 'no_data' | 'server_error'>;
  setHeroNameById(hero: Hero): Promise<boolean | 'validation_error'>;
  createHero(name: string): Promise<boolean | 'validation_error'>;
  deleteHero(id: number): Promise<boolean | 'validation_error'>;
}
