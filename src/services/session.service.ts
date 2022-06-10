import { compare } from 'bcrypt';
import { getRepository } from 'typeorm';
import { StatusCodes } from 'http-status-codes';
import { Session, SessionResponse } from '../models/session.model';
import UserEntity from '../database/entities/User.Entity';
import { signJwt } from '../utils/jwt.utils';
import ApiError from '../utils/apiError.utils';

export async function createSession({
  cpf,
  password,
}: Session): Promise<SessionResponse> {
  const repository = getRepository(UserEntity);
  const userSession = await repository.findOne({ cpf });

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
