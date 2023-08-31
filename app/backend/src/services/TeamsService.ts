import TeamsModel from '../models/TeamsModel';
import { ITeams } from '../Interfaces/ITeams';
import { ITeamsModel } from '../Interfaces/ITeamsModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamsService {
  constructor(private teamsModel: ITeamsModel = new TeamsModel()) {}

  public async findAll(): Promise<ServiceResponse<ITeams[]>> {
    const data = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data };
  }

  public async findById(id: number): Promise<ServiceResponse<ITeams>> {
    const data = await this.teamsModel.findById(id);

    if (!data) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };

    return { status: 'SUCCESSFUL', data };
  }
}
