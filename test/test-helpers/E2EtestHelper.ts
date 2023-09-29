import Sinon = require('sinon');
import express from 'express';
import { HeroController } from '../../src/controller/hero';
import { HeroMysqlDatabase } from '../../src/data/hero-sql';
import { HeroService } from '../../src/service/hero';

export function getHeroServiceStub(sandbox: Sinon.SinonSandbox): HeroService {
  const heroDatabaseStub: HeroMysqlDatabase = new HeroMysqlDatabase();
  // Stub the getHeroes method
  const getHeroesStub: Sinon.SinonStub = sandbox.stub(heroDatabaseStub, 'getHeroes');
  getHeroesStub.returns('[{ id: 1, name: "Hero 1" }]');
  // Stub the getHeroById method
  const getHeroByIdStub: Sinon.SinonStub = sandbox.stub(heroDatabaseStub, 'getHeroById');
  getHeroByIdStub.returns('{ id: 1, name: "Hero 1" }');
  return new HeroService(heroDatabaseStub);
}

export function getHeroApp(sandbox: Sinon.SinonSandbox): express.Express {
  const app: express.Express = express();
  const heroController: HeroController = new HeroController(getHeroServiceStub(sandbox));
  // Set up /hero/all route
  app.get('/hero/all', (request: express.Request, response: express.Response) => {
    heroController.getHeroes(request, response);
  });
  // Set up /hero/:id route
  app.get('/hero/:id', (request: express.Request, response: express.Response) => {
    heroController.getHeroById(request, response);
  });
  return app;
}
