import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2';
import { Hero } from '../model/hero-business';
import { HeroDatabase } from './hero-interface';
import { DatabaseConfig } from '../util/database-config';

/**
 * A class that interacts with the database to perform CRUD operations on heroes using SQL.
 */
export class HeroMysqlDatabase implements HeroDatabase {
  public async getHeroes(): Promise<Hero[] | 'no_data' | 'server_error'> {
    const pool: Pool | null = DatabaseConfig.pool;

    try {
      if (pool !== null) {
        const [results] = await pool.promise().execute<RowDataPacket[]>('SELECT * FROM `hero`');
        if (results != null) {
          return results.map(hero => new Hero(hero.id, hero.name));
        }
      }
      return 'no_data';
    } catch (error) {
      return 'server_error';
    }
  }

  public async getHeroById(id: number): Promise<Hero | 'no_data' | 'server_error'> {
    const pool: Pool | null = DatabaseConfig.pool;

    try {
      if (pool !== null) {
        const [result] = await pool
          .promise()
          .execute<RowDataPacket[]>('SELECT * FROM `hero` WHERE `id` = ?', [id]);

        if (result !== null && result.length > 0) {
          const row = result[0];
          return new Hero(row.id, row.name);
        }
      }
      return 'no_data';
    } catch (error) {
      return 'server_error';
    }
  }
  public async getHeroesByName(name: string): Promise<Hero[] | 'no_data' | 'server_error'> {
    const pool: Pool | null = DatabaseConfig.pool;

    try {
      if (pool !== null) {
        const [results] = await pool
          .promise()
          .execute<RowDataPacket[]>('SELECT * FROM `hero` WHERE `name` LIKE ?', [`%${name}%`]);

        if (results != null) {
          const heroArray: Hero[] = [];
          for (const row of results) {
            const hero = new Hero(row.id, row.name);
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

  public async setHeroNameById(hero: Hero): Promise<boolean | 'not_found'> {
    const pool: Pool | null = DatabaseConfig.pool;

    try {
      if (pool !== null) {
        const [result] = await pool
          .promise()
          .execute<ResultSetHeader>('UPDATE `hero` SET `name` = ? WHERE `id` = ?', [
            hero.name,
            hero.id,
          ]);
        if (result.affectedRows === 0) {
          return 'not_found';
        }
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  public async createHero(name: string): Promise<boolean> {
    const pool: Pool | null = DatabaseConfig.pool;

    try {
      if (pool !== null) {
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

  public async deleteHero(id: number): Promise<boolean | 'not_found'> {
    const pool: Pool | null = DatabaseConfig.pool;

    try {
      if (pool != null) {
        const [result] = await pool
          .promise()
          .execute<ResultSetHeader>('DELETE FROM `hero` WHERE `id` = ?', [id]);
        if (result.affectedRows === 0) {
          return 'not_found';
        }
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}
