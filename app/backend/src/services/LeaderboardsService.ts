import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILeaderBoardsModel } from '../Interfaces/Leaderboards/ILeaderboardsModel';
import LeaderboardsModel from '../models/LeaderboardsModel';
import { ILeaderBoards } from '../Interfaces/Leaderboards/ILeaderboards';

export default class LeaderboardsService {
  constructor(
    private leaderboardsModel: ILeaderBoardsModel = new LeaderboardsModel(),
  ) {}

  public async findAll(): Promise<ServiceResponse<ILeaderBoards[]>> {
    const data = await this.leaderboardsModel.findAll();
    return { status: 'SUCCESSFUL', data };
  }
}
