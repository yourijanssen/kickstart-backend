import sinon, { SinonStub } from 'sinon';
import { HeroDatabase } from '../src/data/hero-interface';
import { HeroService } from '../src/service/hero';
import { expect } from 'chai';
import { Hero } from '../src/model/hero-business';

describe('Integration Tests: HeroService', () => {
  let heroService: HeroService;

  let getHeroesStub: SinonStub;
  let getHeroByIdStub: SinonStub;
  let getHeroesByNameStub: SinonStub;
  let createHeroStub: SinonStub;
  let deleteHeroStub: SinonStub;

  beforeEach(() => {
    const heroDatabaseStub: HeroDatabase = {
      getHeroes: sinon.stub(),
      getHeroById: sinon.stub(),
      getHeroesByName: sinon.stub(),
      setHeroNameById: sinon.stub(),
      createHero: sinon.stub(),
      deleteHero: sinon.stub(),
    };
    getHeroesStub = heroDatabaseStub.getHeroes as SinonStub;
    getHeroByIdStub = heroDatabaseStub.getHeroById as SinonStub;
    getHeroesByNameStub = heroDatabaseStub.getHeroesByName as SinonStub;
    createHeroStub = heroDatabaseStub.createHero as SinonStub;
    deleteHeroStub = heroDatabaseStub.deleteHero as SinonStub;
    heroService = new HeroService(heroDatabaseStub);
  });

  afterEach(() => {
    sinon.restore(); // Restore Sinon stubs after each test case
  });

  /**
   * Test case: should return all heroes.
   */
  it('should return all heroes', async () => {
    const heroes: Hero[] = [
      { id: 1, name: 'Superman' },
      { id: 2, name: 'Batman' },
    ];
    getHeroesStub.resolves(heroes);
    const result = await heroService.getHeroes();
    expect(result).to.deep.equal(heroes);
  });

  /**
   * Test case: should return a hero by ID.
   */
  it('should return a hero by ID', async () => {
    const hero: Hero = { id: 1, name: 'Superman' };
    getHeroByIdStub.resolves(hero);
    const result = await heroService.getHeroById(1);
    expect(result).to.deep.equal(hero);
  });

  /**
   * Test case: should return heroes by name.
   */
  it('should return heroes by name', async () => {
    const heroes: Hero[] = [
      { id: 1, name: 'Superman' },
      { id: 2, name: 'Batman' },
    ];
    getHeroesByNameStub.resolves(heroes);
    const result = await heroService.getHeroesByName('man');
    expect(result).to.deep.equal(heroes);
  });

  /**
   * Test case: should create a hero.
   */
  it('should create a hero', async () => {
    createHeroStub.resolves(1);
    const result = await heroService.createHero('Superman');
    expect(result).to.equal(1);
  });

  /**
   * Test case: should delete a hero by ID.
   */
  it('should delete a hero by ID', async () => {
    deleteHeroStub.resolves();
    await heroService.deleteHero(1);
    expect(deleteHeroStub.calledOnceWith(1)).to.be.true;
  });

  // invalid test cases:

  /**
   * Test case: should throw an error when updating a hero name with an empty name.
   */
  it('should throw an error when updating a hero name with an empty name', async () => {
    const invalidName = '';
    try {
      await heroService.setHeroNameById(1, invalidName);
      // If the promise resolves successfully, fail the test
      expect.fail('Expected an error, but promise resolved successfully.');
    } catch (error: any) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(
        "Invalid 'name' value. The value must have a length of 1 or more."
      );
    }
  });

  /**
   * Test case: should throw an error when creating a hero with a negative ID.
   */
  it('should throw an error when creating a hero with a negative ID', async () => {
    const invalidName = 'Batman';
    try {
      await heroService.setHeroNameById(-1, invalidName);
      // If the promise resolves successfully, fail the test
      expect.fail('Expected an error, but promise resolved successfully.');
    } catch (error: any) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal("Invalid 'id' value. The value must not be negative.");
    }
  });
});
