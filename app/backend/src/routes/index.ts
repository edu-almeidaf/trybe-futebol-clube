import { Router } from 'express';
import teamsRoutes from './TeamsRoutes';
import loginRoutes from './LoginRoutes';
import matchesRoutes from './MatchesRoutes';
import leaderBoardsRoutes from './LeaderboardsRoutes';

const router = Router();

router.use('/teams', teamsRoutes);
router.use(loginRoutes);
router.use('/matches', matchesRoutes);
router.use('/leaderboard', leaderBoardsRoutes);

export default router;
