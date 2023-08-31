import SequelizeUser from '../database/models/SequelizeUsers';
import { IUsers } from '../Interfaces/Users/IUsers';
import { IUsersModel } from '../Interfaces/Users/IUsersModel';

export default class UsersModel implements IUsersModel {
  private model = SequelizeUser;

  async findByEmail(email: string): Promise<IUsers | null> {
    const data = await this.model.findOne({ where: { email } });
    if (!data) return null;

    const { id, username, role, password } = data;
    return { id, username, email, role, password };
  }
}
