import sinon, { SinonStub } from 'sinon';
import { HeroService } from '../src/service/hero';
import { expect } from 'chai';
import { Hero } from '../src/model/hero-business';
import { createHeroServiceWithStubs } from './test-helpers/IntegrationTestHelper';

describe('Integration Tests: HeroService', () => {
  let heroService: HeroService;
  let getHeroesStub: SinonStub;
  let getHeroByIdStub: SinonStub;
  let searchHeroesByNameStub: SinonStub;
  let createHeroStub: SinonStub;
  let deleteHeroStub: SinonStub;

  beforeEach(() => {
    const stubs = createHeroServiceWithStubs();
    heroService = stubs.heroService;
    getHeroesStub = stubs.getHeroesStub;
    getHeroByIdStub = stubs.getHeroByIdStub;
    searchHeroesByNameStub = stubs.searchHeroesByNameStub;
    createHeroStub = stubs.createHeroStub;
    deleteHeroStub = stubs.deleteHeroStub;
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return all heroes', async () => {
    const heroes: Hero[] = [
      Hero.createWithIdAndName(1, 'Superman'),
      Hero.createWithIdAndName(2, 'Batman'),
    ];
    getHeroesStub.resolves(heroes);
    const result = await heroService.getHeroes();
    expect(result).to.deep.equal(heroes);
  });

  it('should return no data, when no heroes are returned', async () => {
    getHeroesStub.resolves('no_data');
    const result = await heroService.getHeroes();
    expect(result).to.equal('no_data');
  });

  it('should return a hero by ID', async () => {
    const hero = Hero.createWithIdAndName(1, 'Superman');
    getHeroByIdStub.resolves(hero);
    const result = await heroService.getHeroById(1);
    expect(result).to.deep.equal(hero);
  });

  it('should return heroes by name', async () => {
    const heroes: Hero[] = [
      Hero.createWithIdAndName(1, 'Superman'),
      Hero.createWithIdAndName(2, 'Batman'),
    ];
    searchHeroesByNameStub.resolves(heroes);
    const result = await heroService.searchHeroesByName('man');
    expect(result).to.deep.equal(heroes);
  });

  it('should create a hero', async () => {
    createHeroStub.resolves(1);
    const result = await heroService.createHero('Superman');
    expect(result).to.equal(1);
  });

  it('should delete a hero by ID', async () => {
    deleteHeroStub.resolves();
    await heroService.deleteHero(1);
    expect(deleteHeroStub.calledOnceWith(1)).to.be.true;
  });
});
