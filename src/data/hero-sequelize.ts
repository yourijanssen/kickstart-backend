import { Op } from 'sequelize';
import { Hero } from '../model/hero-business';
import { HeroModel } from '../util/sequelize-typescript/models';
import { HeroDatabase } from './hero-interface';

export class HeroSequelizeDatabase implements HeroDatabase {
  /**
   * Retrieves a list of heroes from the database.
   * @returns A Promise that resolves to an array of Hero objects.
   * @throws Error if there are issues with the database query or if no heroes are found.
   */
  public async getHeroes(): Promise<Hero[]> {
    try {
      const heroes = await HeroModel.findAll();
      return heroes.map(hero => new Hero(hero.id, hero.name));
    } catch (error) {
      console.error('Error in getHeroes:', error);
      throw error; // Re-throw the error to be handled by the calling function or middleware
    }
  }

  /**
   * Retrieves a hero by their ID from the database.
   * @param id - The ID of the hero to retrieve.
   * @returns A Promise that resolves to a Hero object if found, or null if not found.
   * @throws Error if there are issues with the database query.
   */
  public async getHeroById(id: number): Promise<Hero | null> {
    try {
      const hero = await HeroModel.findByPk(id);
      if (hero) {
        return new Hero(hero.id, hero.name);
      } else {
        return null; // Hero with the given ID not found
      }
    } catch (error) {
      console.error('Error in getHeroById:', error);
      throw error;
    }
  }

  /**
   * Retrieves a hero by their name from the database.
   * @param name - The name of the hero to retrieve.
   * @returns A Promise that resolves to a Hero object if found, or null if not found.
   * @throws Error if there are issues with the database query.
   */
  public async getHeroByName(name: string): Promise<Hero | null> {
    try {
      const hero = await HeroModel.findOne({
        where: { name },
      });
      if (hero) {
        return new Hero(hero.id, hero.name);
      } else {
        return null; // Hero with the given name not found
      }
    } catch (error) {
      console.error('Error in getHeroByName:', error);
      throw error;
    }
  }

  /**
   * Retrieves a list of heroes with a specific name from the database.
   * @param name - The name of the heroes to retrieve.
   * @returns A Promise that resolves to an array of Hero objects with the specified name.
   * @throws Error if there are issues with the database query.
   */
  public async getHeroesByName(name: string): Promise<Hero[]> {
    try {
      const heroes = await HeroModel.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`, // Use Sequelize's Op.like operator for partial name matching
          },
        },
      });
      return heroes.map(hero => new Hero(hero.id, hero.name));
    } catch (error) {
      console.error('Error in getHeroesByName:', error);
      throw error;
    }
  }

  /**
   * Updates the name of a hero by their ID in the database.
   * @param hero - The Hero object with the updated name and ID.
   * @throws Error if there are issues with the database query.
   */
  public async setHeroNameById(hero: Hero): Promise<void> {
    try {
      await HeroModel.update(
        { name: hero.name },
        {
          where: {
            id: hero.id,
          },
        }
      );
    } catch (error) {
      console.error('Error in setHeroNameById:', error);
      throw error;
    }
  }

  /**
   * Creates a new hero with the given name in the database.
   * @param name - The name of the new hero.
   * @returns A Promise that resolves to the ID of the newly created hero, or undefined if the creation fails.
   * @throws Error if there are issues with the database query.
   */
  public async createHero(name: string): Promise<number | undefined> {
    try {
      // Create an instance of HeroModel
      const newHero = HeroModel.build({ name } as HeroModel);

      // Save the instance to the database
      await newHero.save();

      // Return the ID of the newly created hero
      return newHero.id;
    } catch (error) {
      console.error('Error in createHero:', error);
      throw error;
    }
  }

  /**
   * Deletes a hero by their ID from the database.
   * @param id - The ID of the hero to delete.
   * @throws Error if there are issues with the database query.
   */
  public async deleteHero(id: number): Promise<void> {
    try {
      await HeroModel.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error('Error in deleteHero:', error);
      throw error;
    }
  }
}
