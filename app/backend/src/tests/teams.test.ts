import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';
import SequelizeTeams from '../../src/database/models/SequelizeTeams';

// import { Response } from 'superagent';
import { team, teams } from './mocks/teams.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes das rotas de teams', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  afterEach(sinon.restore);

  it('Lista todos os times com sucesso', async function() {
    sinon.stub(SequelizeTeams, 'findAll').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.be.deep.equal(teams);
  });

  it('Lista o time por id com sucesso', async function() {
    sinon.stub(SequelizeTeams, 'findByPk').resolves(team as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(team);
  })

  it('Retorna uma mensagem de erro ao não encontrar o time correspondente', async function() {
    sinon.stub(SequelizeTeams, 'findByPk').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/999');

    expect(status).to.equal(404);
    expect(body.message).to.deep.equal('Team 999 not found');
  });
});
