import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  CreateUserInput,
  DeleteUserInput,
  UpdateUserInput,
} from '../schemas/user.schema';

import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from '../services/user.service';

export async function getUsersHandler(req: Request, res: Response) {
  const users = await getUsers();

  res.status(StatusCodes.OK).json(users);
}

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response
) {
  const { body } = req;

  const user = await createUser({ ...body });

  res.status(StatusCodes.CREATED).json(user);
}

export async function deleteUserHandler(
  req: Request<DeleteUserInput['params']>,
  res: Response
) {
  const { userId } = req.params;

  await deleteUser(userId);

  res.sendStatus(StatusCodes.NO_CONTENT);
}

export async function updateUserHandler(
  req: Request<UpdateUserInput['params']>,
  res: Response
) {
  const { body, params } = req;

  const { userId: id } = params;

  const user = await updateUser({ id, ...body });

  res.status(StatusCodes.OK).json(user);
}
