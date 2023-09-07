import { Router } from 'express';
import LeaderboardsController from '../controllers/LeaderboardsController';

const leaderboardsController = new LeaderboardsController();

const router = Router();

router.get(
  '/home',
  (req, res) => leaderboardsController.findAll(req, res),
);

export default router;
