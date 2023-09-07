import { ILeaderBoardsQueryResult, ILeaderBoards } from '../Interfaces/Leaderboards/ILeaderboards';

const sqlQuery = `
SELECT t.team_name AS name,
  SUM(
    CASE
      WHEN m.home_team_goals > m.away_team_goals THEN 3
      WHEN m.home_team_goals = m.away_team_goals THEN 1
      ELSE 0
    END
  ) AS totalPoints,
  COUNT(m.id) AS totalGames,
  SUM(
    CASE
      WHEN m.home_team_goals > m.away_team_goals THEN 1
      ELSE 0
    END
  ) AS totalVictories,
  SUM(
    CASE
      WHEN m.home_team_goals = m.away_team_goals THEN 1
      ELSE 0
    END
  ) AS totalDraws,
  SUM(
    CASE
      WHEN m.home_team_goals < m.away_team_goals THEN 1
      ELSE 0
    END
  ) AS totalLosses,
  SUM(m.home_team_goals) AS goalsFavor,
  SUM(m.away_team_goals) AS goalsOwn
  FROM teams AS t
  INNER JOIN matches AS m
  ON t.id = m.home_team_id
  WHERE m.in_progress = 0
  GROUP BY t.id;
`;

const checkEfficiency = (P: number, J: number): string => {
  const efficiency = ((P / (J * 3)) * 100).toFixed(2);
  return efficiency.toString();
};

const convertData = (data: ILeaderBoardsQueryResult[]): ILeaderBoards[] => {
  const dataFiltered = data.map((info) => ({
    ...info,
    totalPoints: Number(info.totalPoints),
    totalGames: Number(info.totalGames),
    totalVictories: Number(info.totalVictories),
    totalDraws: Number(info.totalDraws),
    totalLosses: Number(info.totalLosses),
    goalsFavor: Number(info.goalsFavor),
    goalsOwn: Number(info.goalsOwn),
    goalsBalance: Number(info.goalsFavor) - Number(info.goalsOwn),
    efficiency: checkEfficiency(Number(info.totalPoints), Number(info.totalGames)),
  }));

  return dataFiltered;
};

export {
  sqlQuery,
  convertData,
};
