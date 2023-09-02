import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import mapHTTPStatus from '../utils/mapHTTPStatus';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public async findAll(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.matchesService.findAll();
    return res.status(mapHTTPStatus(status)).json(data);
  }
}
