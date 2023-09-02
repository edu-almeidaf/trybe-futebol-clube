import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import UserValidations from '../middlewares/UserValidations';

const usersController = new UsersController();

const router = Router();

router.post(
  '/login',
  UserValidations.validateLogin,
  (req, res) => usersController.login(req, res),
);

router.get(
  '/login/role',
  UserValidations.validateToken,
  (req, res) => usersController.getRole(req, res),
);

export default router;
