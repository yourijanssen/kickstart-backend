import { expect } from 'chai';
import express, { Application } from 'express';
import supertest, { SuperTest, Test } from 'supertest';
import sinon, { SinonStub } from 'sinon';
import { HeroService } from '../src/service/hero';
import { HeroController } from '../src/controller/hero';
import { HeroDatabase } from '../src/data/hero-interface';
import { HeroRoutes } from '../src/util/routes/heroRoutes';

/**
 * @author Youri Janssen //entire file
 * Test suite for End-to-End tests of the /hero route.
 */
describe('End-to-End Tests: /hero route', () => {
  let request: SuperTest<Test>;
  let getHeroesStub: SinonStub;

  /**
   * Set up before each test case.
   */
  beforeEach(() => {
    const app: Application = express();

    // Stub for the HeroDatabase
    const HeroDatabaseStub: HeroDatabase = {
      getHeroes: sinon.stub(),
      getHeroById: sinon.stub(),
      getHeroesByName: sinon.stub(),
      setHeroNameById: sinon.stub(),
      createHero: sinon.stub(),
      deleteHero: sinon.stub(),
    };

    // Stub for the BikesService using the repository stub
    const heroServiceStub: HeroService = {
      getHeroes: HeroDatabaseStub.getHeroes,
    } as HeroService;

    // Create BikesController and BikesRouter instances
    const heroController = new HeroController(heroServiceStub);
    const heroRoutes = new HeroRoutes(heroController);
    app.use('/hero', heroRoutes.getHeroRouter());

    // Set up supertest request object
    request = supertest(app);
    // Set /hero API stubs
    getHeroesStub = HeroDatabaseStub.getHeroes as SinonStub;
  });

  afterEach(() => {
    sinon.restore(); // Restore Sinon stubs after each test case
  });
  describe('Test cases for the /hero/all route', () => {
    it('should return all heroes', async () => {
      // Arrange
      const heroesData = [
        { id: 1, name: 'Hero 1' },
        { id: 2, name: 'Hero 2' },
      ];
      getHeroesStub.resolves(heroesData);

      // Act
      const response = await request.get('/hero/all');

      // Assert
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(heroesData);
    });

    it('should handle no heroes found', async () => {
      // Arrange
      getHeroesStub.resolves('no_data');

      // Act
      const response = await request.get('/hero/all');

      // Assert
      expect(response.status).to.equal(404);
      expect(response.body).to.deep.equal({ error: 'No heroes found' });
    });

    it('should handle a server error', async () => {
      // Arrange
      getHeroesStub.resolves('server_error');

      // Act
      const response = await request.get('/hero/all');

      // Assert
      expect(response.status).to.equal(500);
      expect(response.body).to.deep.equal({ error: 'A server error occurred' });
    });
  });
});
