import { QueryTypes } from 'sequelize';
import db from '../database/models';
import { sqlQuery, convertData } from '../utils/leaderboardsUtils';
import { ILeaderBoards, ILeaderBoardsQueryResult } from '../Interfaces/Leaderboards/ILeaderboards';
import { ILeaderBoardsModel } from '../Interfaces/Leaderboards/ILeaderboardsModel';

export default class LeaderboardsModel implements ILeaderBoardsModel {
  private leaderBoardsSqlQuery = sqlQuery;

  async findAll(): Promise<ILeaderBoards[]> {
    const data: ILeaderBoardsQueryResult[] = await db.query(this.leaderBoardsSqlQuery, {
      type: QueryTypes.SELECT,
    });

    const dataFiltered = convertData(data);
    return dataFiltered;
  }
}
