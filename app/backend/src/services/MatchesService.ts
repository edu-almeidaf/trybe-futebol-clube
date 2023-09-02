import MatchesModel from '../models/MatchesModel';
import { IMatches } from '../Interfaces/Match/IMatches';
import { IMatchesModel } from '../Interfaces/Match/IMatchesModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchesService {
  constructor(private matchesModel: IMatchesModel = new MatchesModel()) {}

  public async findAll(): Promise<ServiceResponse<IMatches[]>> {
    const data = await this.matchesModel.findAll();
    return { status: 'SUCCESSFUL', data };
  }
}
