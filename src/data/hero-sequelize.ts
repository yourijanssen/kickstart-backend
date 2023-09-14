import { Op } from 'sequelize';
import { Hero } from '../model/hero-business';
import { HeroModel } from '../util/models';
import { HeroDatabase } from './hero-interface';

/**
 * A class that interacts with the database to perform CRUD operations on heroes using Sequelize.
 */
export class HeroSequelizeDatabase implements HeroDatabase {
  /**
   * Retrieves all heroes from the database.
   *
   * @returns {Promise<Hero[] | 'no_data' | 'server_error'>} A promise that resolves to an array of Hero objects if successful,
   * or an error code if unsuccessful.
   */
  public async getHeroes(): Promise<Hero[] | 'no_data' | 'server_error'> {
    try {
      const heroes: Hero[] = await HeroModel.findAll();
      if (heroes.length === 0) {
        return 'no_data';
      }
      return heroes.map(hero => new Hero(hero.id, hero.name));
    } catch (error) {
      return 'server_error';
    }
  }

  /**
   * Retrieves a hero by their ID from the database.
   *
   * @param {number} id - The ID of the hero to retrieve.
   * @returns {Promise<Hero | 'no_data' | 'server_error'>} A promise that resolves to a Hero object if found,
   * or an error code if not found or an error occurs.
   */
  public async getHeroById(id: number): Promise<Hero | 'no_data' | 'server_error'> {
    try {
      const hero: Hero | null = await HeroModel.findByPk(id);
      if (hero === null) {
        return 'no_data';
      }
      return hero;
    } catch (error) {
      return 'server_error';
    }
  }

  /**
   * Retrieves heroes by their name (partial match) from the database.
   *
   * @param {string} name - The name (or part of the name) of the heroes to retrieve.
   * @returns {Promise<Hero[] | 'no_data' | 'server_error'>} A promise that resolves to an array of Hero objects if found,
   * or an error code if not found or an error occurs.
   */
  public async getHeroesByName(name: string): Promise<Hero[] | 'no_data' | 'server_error'> {
    try {
      const heroes: Hero[] = await HeroModel.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`, // Use Sequelize's Op.like operator for partial name matching
          },
        },
      });
      if (heroes.length === 0) {
        return 'no_data';
      }
      return heroes.map(hero => new Hero(hero.id, hero.name));
    } catch (error) {
      return 'server_error';
    }
  }

  /**
   * Updates the name of a hero in the database by their ID.
   *
   * @param {Hero} hero - The Hero object containing the new name and ID.
   * @returns {Promise<boolean | 'validation_error'>} A promise that resolves to true if the update is successful,
   * 'validation_error' if the hero is not found, or false if an error occurs.
   */
  public async setHeroNameById(hero: Hero): Promise<boolean | 'validation_error'> {
    try {
      const [affectedRows] = await HeroModel.update(
        { name: hero.name },
        {
          where: {
            id: hero.id,
          },
        }
      );

      if (affectedRows === 0) {
        return 'validation_error';
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Creates a new hero in the database with the given name.
   *
   * @param {string} name - The name of the hero to create.
   * @returns {Promise<boolean>} A promise that resolves to true if the hero is created successfully,
   * or false if an error occurs.
   */
  public async createHero(name: string): Promise<boolean> {
    try {
      const newHero = HeroModel.build({ name } as HeroModel);
      await newHero.save();
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Deletes a hero from the database by their ID.
   *
   * @param {number} id - The ID of the hero to delete.
   * @returns {Promise<boolean | 'validation_error'>} A promise that resolves to true if the hero is deleted successfully,
   * 'validation_error' if the hero is not found, or false if an error occurs.
   */
  public async deleteHero(id: number): Promise<boolean | 'validation_error'> {
    try {
      const affectedRows: number = await HeroModel.destroy({
        where: {
          id,
        },
      });
      if (affectedRows === 0) {
        return 'validation_error';
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}
