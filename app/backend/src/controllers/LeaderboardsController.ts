import { Request, Response } from 'express';
import mapHTTPStatus from '../utils/mapHTTPStatus';
import LeaderboardsService from '../services/LeaderboardsService';

export default class LeaderboardsController {
  constructor(private leaderboardsService = new LeaderboardsService()) {}

  public async findAll(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.leaderboardsService.findAll();
    return res.status(mapHTTPStatus(status)).json(data);
  }
}
