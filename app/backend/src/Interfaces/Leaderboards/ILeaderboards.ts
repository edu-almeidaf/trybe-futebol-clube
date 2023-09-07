export interface ILeaderBoardsQueryResult {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
}

export interface ILeaderBoards extends ILeaderBoardsQueryResult {
  goalsBalance: number;
  efficiency: string;
}
