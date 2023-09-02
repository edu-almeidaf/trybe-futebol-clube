import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import mapHTTPStatus from '../utils/mapHTTPStatus';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public async findAll(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.matchesService.findAll(req.query.inProgress as string);
    return res.status(mapHTTPStatus(status)).json(data);
  }
}
