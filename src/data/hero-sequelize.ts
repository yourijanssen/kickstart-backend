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
      const heroes = await HeroModel.findAll();
      if (heroes.length === 0) {
        return 'no_data';
      }
      return heroes.map(hero => Hero.createWithIdAndName(hero.id, hero.name));
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
      const hero = await HeroModel.findByPk(id);
      if (!hero) {
        return 'no_data';
      }
      return Hero.createWithIdAndName(hero.id, hero.name);
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
  public async searchHeroesByName(name: string): Promise<Hero[] | 'no_data' | 'server_error'> {
    try {
      const heroes = await HeroModel.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`, // Use Sequelize's Op.like operator for partial name matching
          },
        },
      });
      if (heroes.length === 0) {
        return 'no_data';
      }
      return heroes.map(hero => Hero.createWithIdAndName(hero.id, hero.name));
    } catch (error) {
      return 'server_error';
    }
  }

  /**
   * Updates the name of a hero in the database by their ID.
   *
   * @param {number} id - The ID of the hero to update.
   * @param {string} name - The new name for the hero.
   * @returns {Promise<boolean>} A promise that resolves to true if the update is successful, or false if an error occurs.
   */
  public async updateHeroNameById(id: number, name: string): Promise<boolean> {
    try {
      await HeroModel.update(
        { name: name },
        {
          where: {
            id: id,
          },
        }
      );
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
      const hero = HeroModel.build({ name } as HeroModel);
      await hero.save();
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Deletes a hero from the database by their ID.
   *
   * @param {number} id - The ID of the hero to delete.
   * @returns {Promise<boolean>} A promise that resolves to true if the hero is deleted successfully
   */
  public async deleteHero(id: number): Promise<boolean> {
    try {
      await HeroModel.destroy({
        where: {
          id,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
