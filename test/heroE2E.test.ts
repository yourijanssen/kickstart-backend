import { expect } from 'chai';
import * as sinon from 'sinon';

import request from 'supertest';
import { Express } from 'express';
import { getHeroApp } from './test-helpers/E2EtestHelper';

/**
 * @author Youri Janssen //entire file
 * Test suite for End-to-End tests of the /hero route.
 */
describe('End-to-End Tests: /hero route', () => {
  let app: Express;
  const sandbox: sinon.SinonSandbox = sinon.createSandbox();

  beforeEach(() => {
    app = getHeroApp(sandbox);
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('should return all heroes', async () => {
    const res: request.Response = await request(app).get('/hero/all');
    expect(res.statusCode).equals(200);
    expect(res.body).equals('[{ id: 1, name: "Hero 1" }]');
  });

  it('should return a hero by id', async () => {
    const res: request.Response = await request(app).get('/hero/1');
    expect(res.statusCode).equals(200);
    expect(res.body).equals('{ id: 1, name: "Hero 1" }');
  });
});
