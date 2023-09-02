import MatchesModel from '../models/MatchesModel';
import { IMatches } from '../Interfaces/Match/IMatches';
import { IMatchesModel } from '../Interfaces/Match/IMatchesModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';

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

  public async finishMatch(id: number): Promise<ServiceResponse<ServiceMessage>> {
    const data = await this.matchesModel.findById(id);

    if (!data) return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };
    if (!data.inProgress) {
      return { status: 'CONFLICT',
        data: {
          message: `Match ${id} already finished` },
      };
    }

    const verifyFinish = await this.matchesModel.finishMatch(id);

    if (!verifyFinish) return { status: 'ERROR', data: { message: 'Unable to update match' } };

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }
}
