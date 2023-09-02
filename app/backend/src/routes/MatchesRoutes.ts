import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import UserValidations from '../middlewares/UserValidations';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.findAll(req, res));
router.patch(
  '/:id/finish',
  UserValidations.validateToken,
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);

export default router;