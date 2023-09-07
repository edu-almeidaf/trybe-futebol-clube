import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILeaderBoardsModel } from '../Interfaces/Leaderboards/ILeaderboardsModel';
import LeaderboardsModel from '../models/LeaderboardsModel';
import { ILeaderBoards } from '../Interfaces/Leaderboards/ILeaderboards';

export default class LeaderboardsService {
  constructor(
    private leaderboardsModel: ILeaderBoardsModel = new LeaderboardsModel(),
  ) {}

  static orderLeaderboards(leaderboards: ILeaderBoards[]): ILeaderBoards[] {
    const orderedLeaderboards = leaderboards.sort((a, b): number => {
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      if (b.totalVictories !== a.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }
      if (b.goalsBalance !== a.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }
      return b.goalsFavor - a.goalsFavor;
    });

    return orderedLeaderboards;
  }

  public async findAll(): Promise<ServiceResponse<ILeaderBoards[]>> {
    const data = await this.leaderboardsModel.findAll();
    return { status: 'SUCCESSFUL', data: LeaderboardsService.orderLeaderboards(data) };
  }
}
