import { OkPacket, Pool, ResultSetHeader, RowDataPacket } from 'mysql2';
import { Hero } from '../model/hero-business';
import { HeroDatabase } from './hero-interface';
import { RelationalDatabase } from '../util/mysql/database-config';

/**
 * Repository class for managing Hero data in the database.
 */
export class HeroMysqlDatabase implements HeroDatabase {
  /**
   * Retrieves a list of heroes from the database.
   * @returns A Promise that resolves to an array of Hero objects.
   * @throws Error if there are issues with the database query or if no heroes are found.
   */
  public async getHeroes(): Promise<Hero[]> {
    try {
      const pool: Pool | null = RelationalDatabase.getPool();
      let results: RowDataPacket[] | null = null;

      if (pool != null) {
        [results] = await pool.promise().execute<RowDataPacket[]>('SELECT * FROM `hero`');
      }

      if (results != null) {
        return results.map(row => new Hero(row.id, row.name));
      } else {
        throw new Error('No heroes found in the database.');
      }
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
    const pool: Pool | null = RelationalDatabase.getPool();
    let result: RowDataPacket[] | null = null;

    if (pool != null) {
      [result] = await pool
        .promise()
        .execute<RowDataPacket[]>('SELECT * FROM `hero` WHERE `id` = ?', [id]);
    }

    if (result != null && result.length > 0) {
      const row = result[0];
      return new Hero(row.id, row.name);
    } else {
      return null; // Hero with the given ID not found
    }
  }

  /**
   * Retrieves a list of heroes with a specific name from the database.
   * @param name - The name of the heroes to retrieve.
   * @returns A Promise that resolves to an array of Hero objects with the specified name.
   * @throws Error if there are issues with the database query.
   */
  public async getHeroesByName(name: string): Promise<Hero[]> {
    const pool: Pool | null = RelationalDatabase.getPool();
    let results: RowDataPacket[] | null = null;

    if (pool != null) {
      [results] = await pool
        .promise()
        .execute<RowDataPacket[]>('SELECT * FROM `hero` WHERE `name` = ?', [name]);
    }

    const heroArray: Hero[] = [];

    if (results != null) {
      for (const row of results) {
        const hero = new Hero(row.id, row.name);
        heroArray.push(hero);
      }
    }

    return heroArray;
  }

  /**
   * Updates the name of a hero by their ID in the database.
   * @param hero - The Hero object with the updated name and ID.
   * @throws Error if there are issues with the database query.
   */
  public async setHeroNameById(hero: Hero): Promise<void> {
    const pool: Pool | null = RelationalDatabase.getPool();

    if (pool != null) {
      await pool
        .promise()
        .execute<OkPacket>('UPDATE `hero` SET `name` = ? WHERE `id` = ?', [hero.name, hero.id]);
    }
  }

  /**
   * Creates a new hero with the given name in the database.
   * @param name - The name of the new hero.
   * @returns A Promise that resolves to the ID of the newly created hero, or undefined if the creation fails.
   * @throws Error if there are issues with the database query.
   */
  public async createHero(name: string): Promise<number | undefined> {
    const pool: Pool | null = RelationalDatabase.getPool();
    let result: ResultSetHeader | null = null;

    if (pool != null) {
      [result] = await pool
        .promise()
        .execute<ResultSetHeader>('INSERT INTO `hero` (`name`) VALUES (?)', [name]);
    }

    if (result != null) {
      return result.insertId; // Return the ID of the newly created hero
    } else {
      return undefined; // Return undefined if the hero creation failed
    }
  }

  /**
   * Deletes a hero by their ID from the database.
   * @param id - The ID of the hero to delete.
   * @throws Error if there are issues with the database query.
   */
  public async deleteHero(id: number): Promise<void> {
    const pool: Pool | null = RelationalDatabase.getPool();

    if (pool != null) {
      await pool.promise().execute<OkPacket>('DELETE FROM `hero` WHERE `id` = ?', [id]);
    }
  }
}
