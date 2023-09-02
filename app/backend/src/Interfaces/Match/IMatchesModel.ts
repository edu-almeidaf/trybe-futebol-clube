import { IMatches } from './IMatches';

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>;
  findByInProgress(inProgress: boolean): Promise<IMatches[]>;
}
