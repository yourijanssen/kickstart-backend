import { HeroDatabaseInterface } from '../../src/data/hero-interface';
import * as tssinon from 'ts-sinon';
import { Hero } from '../../src/model/hero-business';
import { HeroSequelizeDatabase } from '../../src/data/hero-sequelize';

export function initDatabaseStub(): tssinon.StubbedInstance<HeroDatabaseInterface> {
  const heroDatabase: HeroDatabaseInterface = new HeroSequelizeDatabase();
  const HeroDatabaseStub = tssinon.stubObject<HeroDatabaseInterface>(heroDatabase);

  HeroDatabaseStub.getHeroes.returns(Promise.resolve([Hero.createWithIdAndName(1, 'test')]));
  HeroDatabaseStub.getHeroById.returns(Promise.resolve(Hero.createWithIdAndName(1, 'test')));
  HeroDatabaseStub.searchHeroesByName.returns(
    Promise.resolve([Hero.createWithIdAndName(1, 'test')])
  );
  HeroDatabaseStub.updateHeroNameById.returns(Promise.resolve(true));
  HeroDatabaseStub.createHero.returns(Promise.resolve(1));
  HeroDatabaseStub.deleteHero.returns(Promise.resolve(true));
  return HeroDatabaseStub;
}

import sinon, { SinonStub } from 'sinon';
import { HeroService } from '../../src/service/hero';

export function createHeroServiceWithStubs(): {
  heroService: HeroService;
  getHeroesStub: SinonStub;
  getHeroByIdStub: SinonStub;
  searchHeroesByNameStub: SinonStub;
  updateHeroNameByIdStub: SinonStub;
  createHeroStub: SinonStub;
  deleteHeroStub: SinonStub;
} {
  const heroDatabaseStub: HeroDatabaseInterface = {
    getHeroes: sinon.stub(),
    getHeroById: sinon.stub(),
    searchHeroesByName: sinon.stub(),
    updateHeroNameById: sinon.stub(),
    createHero: sinon.stub(),
    deleteHero: sinon.stub(),
  };

  const heroService = new HeroService(heroDatabaseStub);

  const getHeroesStub = heroDatabaseStub.getHeroes as SinonStub;
  const getHeroByIdStub = heroDatabaseStub.getHeroById as SinonStub;
  const searchHeroesByNameStub = heroDatabaseStub.searchHeroesByName as SinonStub;
  const updateHeroNameByIdStub = heroDatabaseStub.updateHeroNameById as SinonStub;
  const createHeroStub = heroDatabaseStub.createHero as SinonStub;
  const deleteHeroStub = heroDatabaseStub.deleteHero as SinonStub;

  return {
    heroService,
    getHeroesStub,
    getHeroByIdStub,
    searchHeroesByNameStub,
    updateHeroNameByIdStub,
    createHeroStub,
    deleteHeroStub,
  };
}
