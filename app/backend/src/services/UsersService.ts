import * as bcrypt from 'bcryptjs';
import { IToken } from '../Interfaces/IToken';
import { Ilogin } from '../Interfaces/Users/IUsers';
import UsersModel from '../models/UsersModel';
import { ServiceResponse, ServiceMessage } from '../Interfaces/ServiceResponse';
import Jwt from '../utils/jwtUtils';
import { IUsersModel } from '../Interfaces/Users/IUsersModel';

export default class UsersService {
  constructor(
    private userModel: IUsersModel = new UsersModel(),
  ) {}

  public async login({ email, password }: Ilogin): Promise<ServiceResponse<
  IToken | ServiceMessage>> {
    const data = await this.userModel.findByEmail(email);

    if (!data || !bcrypt.compareSync(password, data.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const token = Jwt.sign({ email });
    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async findByEmail(email: string): Promise<ServiceResponse<string>> {
    const data = await this.userModel.findByEmail(email);

    if (!data) {
      return { status: 'UNAUTHORIZED', data: { message: 'Email not found' } };
    }

    return { status: 'SUCCESSFUL', data: data.role };
  }
}
