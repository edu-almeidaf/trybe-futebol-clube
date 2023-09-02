import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Jwt from '../../src/utils/jwtUtils';
import { user, users, userWithoutPassword, userRegistered } from './mocks/users.mocks';
import SequelizeUser from '../database/models/SequelizeUsers';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes das rotas de users', () => {
  afterEach(sinon.restore);

  describe('Testes da rota /login:', () => {
    it('Faz o login com sucesso', async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(userRegistered as any);
      sinon.stub(Jwt, 'sign').returns('token valid');
  
      const { status, body } = await chai.request(app).post('/login').send({
        email: 'user@user.com',
        password: 'secret_user'
      })
  
      expect(status).to.equal(200);
      expect(body).to.deep.equal({ token: 'token valid' });
    });
  
    it('Não faz o login com um email não cadastrado no banco de dados', async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(null);
  
      const { status, body } = await chai.request(app).post('/login').send({
        email: 'eduardo@user.com',
        password: 'secret_user'
      })
  
      expect(status).to.equal(401);
      expect(body).to.deep.equal({ message: 'Invalid email or password' });
    });
  
    it('Não faz o login sem um email na requisição', async function() {
      const { status, body } = await chai.request(app).post('/login').send({
        password: 'secret_user'
      })
  
      expect(status).to.equal(400);
      expect(body).to.deep.equal({ message: 'All fields must be filled' });
    });
  
    it('Não faz o login sem um email válido na requisição', async function() {
      const { status, body } = await chai.request(app).post('/login').send({
        email: 'user@.com',
        password: 'secret_user'
      })
  
      expect(status).to.equal(401);
      expect(body).to.deep.equal({ message: 'Invalid email or password' });
    });
  
    it('Não faz o login sem uma senha na requisição', async function() {
      const { status, body } = await chai.request(app).post('/login').send({
        email: 'user@user.com'
      })
  
      expect(status).to.equal(400);
      expect(body).to.deep.equal({ message: 'All fields must be filled' });
    });
  
    it('Não faz o login com uma senha contendo menos do que 6 caracteres', async function() {
      const { status, body } = await chai.request(app).post('/login').send({
        email: 'user@user.com',
        password: 'senha'
      })
  
      expect(status).to.equal(401);
      expect(body).to.deep.equal({ message: 'Invalid email or password' });
    });
  })

  describe('Testes da rota /login/role:', () => {
    it('Traz a role do cliente com sucesso', async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(userRegistered as any);
      sinon.stub(Jwt, 'verify').returns({ email: 'user@user.com', iat: 1693668878, exp: 1693672478 });
  
      const { status, body } = await chai.request(app).get('/login/role')
      .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2OTM2Njg4NzgsImV4cCI6MTY5MzY3MjQ3OH0.1-CYqoFBU8Nml6CCGonrs0Nye1Ufcl1bC6MHxjlhFCo');
  
      expect(status).to.equal(200);
      expect(body).to.deep.equal({ role: 'user' });
    });

    it('Traz a role do cliente com sucesso (Token sem Bearer)', async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(userRegistered as any);
      sinon.stub(Jwt, 'verify').returns({ email: 'user@user.com', iat: 1693668878, exp: 1693672478 });
  
      const { status, body } = await chai.request(app).get('/login/role')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2OTM2Njg4NzgsImV4cCI6MTY5MzY3MjQ3OH0.1-CYqoFBU8Nml6CCGonrs0Nye1Ufcl1bC6MHxjlhFCo');
  
      expect(status).to.equal(200);
      expect(body).to.deep.equal({ role: 'user' });
    });

    it('Não encontra os dados e retorna um erro na service', async function() {
      sinon.stub(SequelizeUser, 'findOne').resolves(null);
      sinon.stub(Jwt, 'verify').returns({ email: 'user@user.com', iat: 1693668878, exp: 1693672478 });
  
      const { status, body } = await chai.request(app).get('/login/role')
      .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2OTM2Njg4NzgsImV4cCI6MTY5MzY3MjQ3OH0.1-CYqoFBU8Nml6CCGonrs0Nye1Ufcl1bC6MHxjlhFCo');
  
      expect(status).to.equal(401);
      expect(body).to.deep.equal({ role: { message: 'Email not found' } });
    });

    it('Não traz as informações passando um token inválido', async function() {
      sinon.stub(Jwt, 'verify').returns('Token must be a valid token');
  
      const { status, body } = await chai.request(app).get('/login/role')
      .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2OTM2Njg4NzgsImV4cCI6MTY5MzY3MjQ3OH0.1-CYqoFBU8Nml6CCGonrs0Nye1Ufcl1bC6MHxjlhFCo');
  
      expect(status).to.equal(401);
      expect(body).to.deep.equal({ message: 'Token must be a valid token' });
    });

    it('Não traz as informações sem um token', async function() {
      sinon.stub(Jwt, 'verify').returns('Token must be a valid token');
  
      const { status, body } = await chai.request(app).get('/login/role');
  
      expect(status).to.equal(401);
      expect(body).to.deep.equal({ message: 'Token not found' });
    });
  })
});
