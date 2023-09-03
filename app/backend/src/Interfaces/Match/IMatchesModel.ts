import { NewObject } from '..';
import { IMatches } from './IMatches';

export interface updateData {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>;
  findByInProgress(inProgress: boolean): Promise<IMatches[]>;
  finishMatch(id: IMatches['id']): Promise<boolean>;
  findById(id: IMatches['id']): Promise<IMatches | null>;
  update(id: IMatches['id'], newData: updateData): Promise<IMatches | null>;
  create(match: NewObject<IMatches>): Promise<IMatches>;
}
