import { Op } from 'sequelize';
import { Hero } from '../model/hero-business';
import { HeroModel } from '../util/models';
import { HeroDatabase } from './hero-interface';

/**
 * A class that interacts with the database to perform CRUD operations on heroes using Sequelize.
 */
export class HeroSequelizeDatabase implements HeroDatabase {
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

  public async createHero(name: string): Promise<boolean | 'validation_error'> {
    try {
      const newHero = HeroModel.build({ name } as HeroModel);
      await newHero.save();
      return true;
    } catch (error) {
      return false;
    }
  }

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
