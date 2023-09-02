import MatchesModel from '../models/MatchesModel';
import { IMatches } from '../Interfaces/Match/IMatches';
import { IMatchesModel } from '../Interfaces/Match/IMatchesModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchesService {
  constructor(private matchesModel: IMatchesModel = new MatchesModel()) {}

  public async findAll(inProgress: string): Promise<ServiceResponse<IMatches[]>> {
    let data;
    if (inProgress) {
      data = await this.matchesModel.findByInProgress(inProgress === 'true');
    } else {
      data = await this.matchesModel.findAll();
    }
    return { status: 'SUCCESSFUL', data };
  }
}
