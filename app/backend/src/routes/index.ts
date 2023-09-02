import { Router } from 'express';
import teamsRoutes from './TeamsRoutes';
import loginRoutes from './LoginRoutes';

const router = Router();

router.use('/teams', teamsRoutes);
router.use(loginRoutes);

export default router;
