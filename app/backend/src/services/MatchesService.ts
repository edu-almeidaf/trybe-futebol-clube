import MatchesModel from '../models/MatchesModel';
import TeamsModel from '../models/TeamsModel';
import { IMatches } from '../Interfaces/Match/IMatches';
import { IMatchesModel, updateData } from '../Interfaces/Match/IMatchesModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { NewObject } from '../Interfaces';
import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
    private teamsModel: ITeamsModel = new TeamsModel(),
  ) {}

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

  public async update(id: number, newData: updateData): Promise<ServiceResponse<IMatches>> {
    const data = await this.matchesModel.findById(id);

    if (!data) return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };

    if (!data.inProgress) {
      return { status: 'CONFLICT',
        data: {
          message: `Match ${id} already finished` },
      };
    }

    const updatedData = await this.matchesModel.update(id, newData);

    if (!updatedData) return { status: 'ERROR', data: { message: 'Unable to update match' } };

    return { status: 'SUCCESSFUL', data: updatedData };
  }

  public async create(match: NewObject<IMatches>): Promise<ServiceResponse<IMatches>> {
    const { homeTeamId, awayTeamId } = match;
    if (homeTeamId === awayTeamId) {
      return {
        status: 'UNPROCESSABLE_ENTITY',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }

    const homeTeam = await this.teamsModel.findById(homeTeamId);
    const awayTeam = await this.teamsModel.findById(awayTeamId);

    if (!homeTeam || !awayTeam) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    const data = await this.matchesModel.create({ ...match, inProgress: true });
    return { status: 'CREATED', data };
  }
}
