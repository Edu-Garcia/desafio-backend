import { compare } from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'tsyringe';
import { ISession, ISessionResponse } from '../models/session.model';
import { IUsersRepository } from '../models/user.model';
import { signJwt } from '../utils/jwt.utils';
import ApiError from '../utils/apiError.utils';

@injectable()
export class SessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {
    //
  }

  public async createSession({
    cpf,
    password,
  }: ISession): Promise<ISessionResponse> {
    const userSession = await this.usersRepository.findByCpf(cpf);

    if (!userSession) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        true,
        'Invalid cpf or password'
      );
    }

    const passwordConfirmed = await compare(password, userSession.password);

    if (!passwordConfirmed) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        true,
        'Invalid cpf or password'
      );
    }

    const user = {
      id: userSession.id,
      permission: userSession.permission,
    };

    const token = signJwt({}, { subject: userSession.id });

    return { token, user };
  }
}
