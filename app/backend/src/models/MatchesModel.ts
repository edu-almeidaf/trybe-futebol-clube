import { NewObject } from '../Interfaces';
import SequelizeTeams from '../database/models/SequelizeTeams';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { IMatches } from '../Interfaces/Match/IMatches';
import { IMatchesModel, updateData } from '../Interfaces/Match/IMatchesModel';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;

  async findAll(): Promise<IMatches[]> {
    const data = await this.model.findAll({
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return data;
  }

  async findByInProgress(inProgress: boolean): Promise<IMatches[]> {
    const data = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return data;
  }

  async finishMatch(id: IMatches['id']): Promise<boolean> {
    const data = await this.model.update({ inProgress: false }, { where: { id } });

    const [affectedRows] = data;

    if (affectedRows === 0) return false;

    return true;
  }

  async findById(id: IMatches['id']): Promise<IMatches | null> {
    const data = await this.model.findByPk(id);
    if (!data) return null;

    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }: IMatches = data;
    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }

  async update(id: number, newData: updateData): Promise<IMatches | null> {
    console.log('id: ', id);
    console.log('data: ', newData);

    const data = await this.model.update(newData, { where: { id } });
    console.log(data);

    const [affectedRows] = data;

    if (affectedRows === 0) return null;

    return this.findById(id);
  }

  async create(match: NewObject<IMatches>): Promise<IMatches> {
    const data = await this.model.create(match);

    const { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }: IMatches = data;
    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }
}
