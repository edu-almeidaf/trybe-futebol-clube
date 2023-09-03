import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeams from '../database/models/SequelizeTeams';

import {
  matches,
  teamInProgress,
  teamFinished,
  teamWithUpdatedPlacar,
  homeTeam,
  awayTeam,
  matchCreated
} from './mocks/matches.mock';
import Jwt from '../utils/jwtUtils';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes das rotas de matches', () => {
  afterEach(sinon.restore);

  it('Lista todas as partidas com sucesso', async function() {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.be.deep.equal(matches);
  });

  it('Lista todas as partidas filtradas pela query com sucesso', async function() {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=false');

    expect(status).to.equal(200);
    expect(body).to.be.deep.equal(matches);
  });

  it('Finaliza uma partida com sucesso', async function() {
    sinon.stub(SequelizeMatches, 'update').resolves([1]);
    sinon.stub(SequelizeMatches, 'findByPk').resolves(teamInProgress as any);
    sinon.stub(Jwt, 'verify').returns({ email: 'user@user.com', iat: 1693668878, exp: 1693672478 });

    const { status, body } = await chai.request(app).patch('/matches/1/finish')
      .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2OTM2Njg4NzgsImV4cCI6MTY5MzY3MjQ3OH0.1-CYqoFBU8Nml6CCGonrs0Nye1Ufcl1bC6MHxjlhFCo');

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: 'Finished' });
  });

  it('Não finaliza uma partida que já foi finalizada', async function() {
    sinon.stub(SequelizeMatches, 'findByPk').resolves(teamFinished as any);
    sinon.stub(Jwt, 'verify').returns({ email: 'user@user.com', iat: 1693668878, exp: 1693672478 });

    const { status, body } = await chai.request(app).patch('/matches/1/finish')
      .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2OTM2Njg4NzgsImV4cCI6MTY5MzY3MjQ3OH0.1-CYqoFBU8Nml6CCGonrs0Nye1Ufcl1bC6MHxjlhFCo');

    expect(status).to.equal(409);
    expect(body).to.deep.equal({ message: 'Match 1 already finished' });
  });

  it('Não finaliza uma partida caso ela não seja encontrada', async function() {
    sinon.stub(SequelizeMatches, 'findByPk').resolves(null);
    sinon.stub(Jwt, 'verify').returns({ email: 'user@user.com', iat: 1693668878, exp: 1693672478 });

    const { status, body } = await chai.request(app).patch('/matches/1/finish')
      .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2OTM2Njg4NzgsImV4cCI6MTY5MzY3MjQ3OH0.1-CYqoFBU8Nml6CCGonrs0Nye1Ufcl1bC6MHxjlhFCo');

    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: 'Match 1 not found' });
  });

  it('Gera um erro ao não atualizar uma partida', async function() {
    sinon.stub(SequelizeMatches, 'update').resolves([0]);
    sinon.stub(SequelizeMatches, 'findByPk').resolves(teamInProgress as any);
    sinon.stub(Jwt, 'verify').returns({ email: 'user@user.com', iat: 1693668878, exp: 1693672478 });

    const { status, body } = await chai.request(app).patch('/matches/1/finish')
      .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2OTM2Njg4NzgsImV4cCI6MTY5MzY3MjQ3OH0.1-CYqoFBU8Nml6CCGonrs0Nye1Ufcl1bC6MHxjlhFCo');

    expect(status).to.equal(500);
    expect(body).to.deep.equal({ message: 'Unable to update match' });
  });

  it('Atualiza o placar da partida com sucesso', async function() {
    sinon.stub(SequelizeMatches, 'findByPk')
      .onFirstCall()  
      .resolves(teamInProgress as any)
      .onSecondCall()
      .resolves(teamWithUpdatedPlacar as any);
    sinon.stub(SequelizeMatches, 'update').resolves([1]);
    sinon.stub(Jwt, 'verify').returns({ email: 'user@user.com', iat: 1693668878, exp: 1693672478 });

    const { status, body } = await chai.request(app).patch('/matches/1')
      .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2OTM2Njg4NzgsImV4cCI6MTY5MzY3MjQ3OH0.1-CYqoFBU8Nml6CCGonrs0Nye1Ufcl1bC6MHxjlhFCo')
      .send({
        homeTeamGoals: 4,
        awayTeamGoals: 2
      });

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamWithUpdatedPlacar);
  });

  it('Não atualiza o placar de uma partida já finalizada', async function() {
    sinon.stub(SequelizeMatches, 'findByPk').resolves(teamFinished as any);
    sinon.stub(Jwt, 'verify').returns({ email: 'user@user.com', iat: 1693668878, exp: 1693672478 });

    const { status, body } = await chai.request(app).patch('/matches/1')
      .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2OTM2Njg4NzgsImV4cCI6MTY5MzY3MjQ3OH0.1-CYqoFBU8Nml6CCGonrs0Nye1Ufcl1bC6MHxjlhFCo')
      .send({
        homeTeamGoals: 4,
        awayTeamGoals: 2
      });

    expect(status).to.equal(409);
    expect(body).to.deep.equal({ message: 'Match 1 already finished' });
  });

  it('Não atualiza o placar da partida com id inexistente', async function() {
    sinon.stub(SequelizeMatches, 'findByPk').resolves(null);
    sinon.stub(Jwt, 'verify').returns({ email: 'user@user.com', iat: 1693668878, exp: 1693672478 });

    const { status, body } = await chai.request(app).patch('/matches/1')
      .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2OTM2Njg4NzgsImV4cCI6MTY5MzY3MjQ3OH0.1-CYqoFBU8Nml6CCGonrs0Nye1Ufcl1bC6MHxjlhFCo')
      .send({
        homeTeamGoals: 4,
        awayTeamGoals: 2
      });

    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: 'Match 1 not found' });
  });

  it('Gera um erro ao não atualizar o placar de uma partida', async function() {
    sinon.stub(SequelizeMatches, 'findByPk').resolves(teamInProgress as any);
    sinon.stub(SequelizeMatches, 'update').resolves([0]);
    sinon.stub(Jwt, 'verify').returns({ email: 'user@user.com', iat: 1693668878, exp: 1693672478 });

    const { status, body } = await chai.request(app).patch('/matches/1')
      .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2OTM2Njg4NzgsImV4cCI6MTY5MzY3MjQ3OH0.1-CYqoFBU8Nml6CCGonrs0Nye1Ufcl1bC6MHxjlhFCo')
      .send({
        homeTeamGoals: 4,
        awayTeamGoals: 2
      });

    expect(status).to.equal(500);
    expect(body).to.deep.equal({ message: 'Unable to update match' });
  });

  it('Cria uma partida com sucesso', async function() {
    sinon.stub(SequelizeTeams, 'findByPk')
      .onFirstCall()
      .resolves(homeTeam as any)
      .onSecondCall()
      .resolves(awayTeam as any);
    sinon.stub(SequelizeMatches, 'create').resolves(matchCreated as any);
    sinon.stub(Jwt, 'verify').returns({ email: 'user@user.com', iat: 1693668878, exp: 1693672478 });

    const { status, body } = await chai.request(app).post('/matches')
      .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2OTM2Njg4NzgsImV4cCI6MTY5MzY3MjQ3OH0.1-CYqoFBU8Nml6CCGonrs0Nye1Ufcl1bC6MHxjlhFCo')
      .send({
        homeTeamId: 16,
        awayTeamId: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2
      });

    expect(status).to.equal(201);
    expect(body).to.deep.equal(matchCreated);
  });

  it('Não cria uma partida com times iguais', async function() {
    sinon.stub(Jwt, 'verify').returns({ email: 'user@user.com', iat: 1693668878, exp: 1693672478 });

    const { status, body } = await chai.request(app).post('/matches')
      .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2OTM2Njg4NzgsImV4cCI6MTY5MzY3MjQ3OH0.1-CYqoFBU8Nml6CCGonrs0Nye1Ufcl1bC6MHxjlhFCo')
      .send({
        homeTeamId:8,
        awayTeamId: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2
      });

    expect(status).to.equal(422);
    expect(body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
  });

  it('Não cria uma partida com um dos times não cadastrados', async function() {
    sinon.stub(SequelizeTeams, 'findByPk')
      .onFirstCall()
      .resolves(homeTeam as any)
      .onSecondCall()
      .resolves(null);
    sinon.stub(Jwt, 'verify').returns({ email: 'user@user.com', iat: 1693668878, exp: 1693672478 });

    const { status, body } = await chai.request(app).post('/matches')
      .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2OTM2Njg4NzgsImV4cCI6MTY5MzY3MjQ3OH0.1-CYqoFBU8Nml6CCGonrs0Nye1Ufcl1bC6MHxjlhFCo')
      .send({
        homeTeamId: 16,
        awayTeamId: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2
      });

    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: 'There is no team with such id!' });
  });
});
