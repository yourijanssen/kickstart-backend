import { Hero } from '../model/hero-business';

/**
 * Represents a database interface for managing Hero data.
 */
export interface HeroDatabase {
  getHeroes(): Promise<Hero[] | 'no_data' | 'server_error'>;
  getHeroById(id: number): Promise<Hero | 'no_data' | 'server_error'>;
  searchHeroesByName(name: string): Promise<Hero[] | 'no_data' | 'server_error'>;
  updateHeroNameById(id: number, name: string): Promise<boolean>;
  createHero(name: string): Promise<boolean>;
  deleteHero(id: number): Promise<boolean>;
}
