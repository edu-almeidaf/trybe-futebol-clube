import { Request, Response } from 'express';
import UsersService from '../services/UsersService';
import mapHTTPStatus from '../utils/mapHTTPStatus';

export default class UsersController {
  constructor(
    private usersService = new UsersService(),
  ) {}

  public async login(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.usersService.login(req.body);
    return res.status(mapHTTPStatus(status)).json(data);
  }
}
