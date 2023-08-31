import { Router } from 'express';
import teamsRoutes from './TeamsRoutes';

const router = Router();

router.use('/teams', teamsRoutes);

export default router;
