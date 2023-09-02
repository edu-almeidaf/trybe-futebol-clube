import { IMatches } from './IMatches';

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>;
  findByInProgress(inProgress: boolean): Promise<IMatches[]>;
  finishMatch(id: IMatches['id']): Promise<boolean>;
  findById(id: IMatches['id']): Promise<IMatches | null>;
}
