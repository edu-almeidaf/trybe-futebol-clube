import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';
import mapHTTPStatus from '../utils/mapHTTPStatus';

export default class TeamsController {
  constructor(private teamsService = new TeamsService()) {}

  public async findAll(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.teamsService.findAll();
    return res.status(mapHTTPStatus(status)).json(data);
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, data } = await this.teamsService.findById(Number(id));
    return res.status(mapHTTPStatus(status)).json(data);
  }
}
