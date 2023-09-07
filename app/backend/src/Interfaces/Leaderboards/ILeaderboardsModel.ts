import { ILeaderBoards } from './ILeaderboards';

export interface ILeaderBoardsModel {
  findAll(): Promise<ILeaderBoards[]>;
}
