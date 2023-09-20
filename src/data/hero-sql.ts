import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2';
import { Hero } from '../model/hero-business';
import { HeroDatabase } from './hero-interface';
import { DatabaseConfig } from '../util/database-config';

/**
 * A class that interacts with the database to perform CRUD operations on heroes using SQL.
 */
export class HeroMysqlDatabase implements HeroDatabase {
  /**
   * Retrieves all heroes from the database.
   *
   * @returns {Promise<Hero[] | 'no_data' | 'server_error'>} A promise that resolves to an array of Hero objects if successful,
   * or an error code if unsuccessful.
   */
  public async getHeroes(): Promise<Hero[] | 'no_data' | 'server_error'> {
    const pool: Pool | null = DatabaseConfig.pool;

    try {
      if (pool !== null) {
        const [results] = await pool.promise().execute<RowDataPacket[]>('SELECT * FROM `hero`');
        if (results != null) {
          return results.map(hero => Hero.createWithIdAndName(hero.id, hero.name));
        }
      }
      return 'no_data';
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
    const pool: Pool | null = DatabaseConfig.pool;

    try {
      if (pool !== null) {
        const [result] = await pool
          .promise()
          .execute<RowDataPacket[]>('SELECT * FROM `hero` WHERE `id` = ?', [id]);

        if (result !== null && result.length > 0) {
          const row = result[0];
          return Hero.createWithIdAndName(row.id, row.name);
        }
      }
      return 'no_data';
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
    const pool: Pool | null = DatabaseConfig.pool;

    try {
      if (pool !== null) {
        const [results] = await pool
          .promise()
          .execute<RowDataPacket[]>('SELECT * FROM `hero` WHERE `name` LIKE ?', [`%${name}%`]);

        if (results != null) {
          const heroArray: Hero[] = [];
          for (const row of results) {
            const hero = Hero.createWithIdAndName(row.id, row.name);
            heroArray.push(hero);
          }
          return heroArray;
        }
      }
      return 'no_data';
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
    const pool: Pool | null = DatabaseConfig.pool;

    try {
      if (pool != null) {
        await pool
          .promise()
          .execute<ResultSetHeader>('UPDATE `hero` SET `name` = ? WHERE `id` = ?', [name, id]);
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
   * @returns {Promise<boolean>} A promise that resolves to true if the hero is created successfully, or false if an error occurs.
   */
  public async createHero(name: string): Promise<boolean> {
    const pool: Pool | null = DatabaseConfig.pool;

    try {
      if (pool != null) {
        await pool
          .promise()
          .execute<ResultSetHeader>(
            'INSERT INTO `hero` (`name`, `createdAt`, `updatedAt`) VALUES (?, NOW(), NOW())',
            [name]
          );
      }
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
    const pool: Pool | null = DatabaseConfig.pool;

    try {
      if (pool != null) {
        await pool.promise().execute<ResultSetHeader>('DELETE FROM `hero` WHERE `id` = ?', [id]);
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}
