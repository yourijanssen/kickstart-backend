import { Hero } from '../model/hero-business';

/**
 * Represents a database interface for managing Hero data.
 */
export interface HeroDatabase {
  getHeroes(): Promise<Hero[]>;
  getHeroById(id: number): Promise<Hero | null>;
  getHeroesByName(name: string): Promise<Hero[]>;
  setHeroNameById(hero: Hero): void;
  createHero(name: string): Promise<number | undefined>;
  deleteHero(id: number): Promise<void>;
}
