import sinon, { SinonStub } from 'sinon';
import { HeroDatabase } from '../../src/data/hero-interface';
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
  const heroDatabaseStub: HeroDatabase = {
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
