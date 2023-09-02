import { Router } from 'express';
import teamsRoutes from './TeamsRoutes';
import loginRoutes from './LoginRoutes';
import matchesRoutes from './MatchesRoutes';

const router = Router();

router.use('/teams', teamsRoutes);
router.use(loginRoutes);
router.use('/matches', matchesRoutes);

export default router;
