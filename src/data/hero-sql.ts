import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2';
import { Hero } from '../model/hero-business';
import { HeroDatabase } from './hero-interface';
import { DatabaseConfig } from '../util/database-config';

/**
 * A class that interacts with the database to perform CRUD operations on heroes using SQL.
 */
export class HeroMysqlDatabase implements HeroDatabase {
  /**
   * Retrieves a list of heroes from the database.
   * @returns A Promise that resolves to an array of Hero objects.
   * @throws Error if there are issues with the database query or if no heroes are found.
   */
  public async getHeroes(): Promise<Hero[]> {
    const pool: Pool | null = DatabaseConfig.pool;
    let results: RowDataPacket[] | null = null;

    if (pool != null) {
      [results] = await pool.promise().execute<RowDataPacket[]>('SELECT * FROM `hero`');
    }
    if (results != null) {
      return results.map(hero => new Hero(hero.id, hero.name));
    } else {
      throw new Error('No heroes found in the database.');
    }
  }

  /**
   * Retrieves a hero by their ID from the database.
   * @param id - The ID of the hero to retrieve.
   * @returns A Promise that resolves to a Hero object if found, or null if not found.
   * @throws Error if there are issues with the database query.
   */
  public async getHeroById(id: number): Promise<Hero | null> {
    const pool: Pool | null = DatabaseConfig.pool;
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
      throw new Error('Hero with the given ID not found in the database.');
    }
  }

  /**
   * Retrieves a list of heroes with a specific name from the database.
   * @param name - The name of the heroes to retrieve.
   * @returns A Promise that resolves to an array of Hero objects with the specified name.
   * @throws Error if there are issues with the database query.
   */
  public async getHeroesByName(name: string): Promise<Hero[]> {
    const pool: Pool | null = DatabaseConfig.pool;
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
      return heroArray;
    } else {
      throw new Error('No heroes found in the database with the specified name.');
    }
  }

  /**
   * Updates the name of a hero by their ID in the database.
   * @param hero - The Hero object with the updated name and ID.
   * @throws Error if there are issues with the database query.
   */
  public async setHeroNameById(hero: Hero): Promise<void> {
    const pool: Pool | null = DatabaseConfig.pool;

    if (pool != null) {
      const [result] = await pool
        .promise()
        .execute<ResultSetHeader>('UPDATE `hero` SET `name` = ? WHERE `id` = ?', [
          hero.name,
          hero.id,
        ]);
      if (result.affectedRows === 0) {
        throw new Error('Hero with the given ID not found in the database.');
      }
    }
  }

  /**
   * Creates a new hero with the given name in the database.
   * @param name - The name of the new hero.
   * @returns A Promise that resolves to the ID of the newly created hero, or undefined if the creation fails.
   * @throws Error if there are issues with the database query.
   */
  public async createHero(name: string): Promise<number | undefined> {
    const pool: Pool | null = DatabaseConfig.pool;
    let result: ResultSetHeader | null = null;

    if (pool != null) {
      [result] = await pool
        .promise()
        .execute<ResultSetHeader>(
          'INSERT INTO `hero` (`name`, `createdAt`, `updatedAt`) VALUES (?, NOW(), NOW())',
          [name]
        );
      if (result.insertId) {
        return result.insertId;
      } else {
        throw new Error('Failed to create a new hero in the database.');
      }
    }
  }

  /**
   * Deletes a hero by their ID from the database.
   * @param id - The ID of the hero to delete.
   * @throws Error if there are issues with the database query.
   */
  public async deleteHero(id: number): Promise<void> {
    const pool: Pool | null = DatabaseConfig.pool;

    if (pool != null) {
      const [result] = await pool
        .promise()
        .execute<ResultSetHeader>('DELETE FROM `hero` WHERE `id` = ?', [id]);
      if (result.affectedRows === 0) {
        throw new Error('Hero with the given ID not found in the database.');
      }
    }
  }
}
