import 'reflect-metadata';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';
import {
  CreateUserInput,
  DeleteUserInput,
  ReadUserInput,
  UpdateUserInput,
} from '../schemas/user.schema';

import { UserService } from '../services/user.service';
import ApiError from '../utils/apiError.utils';

export async function getUsersHandler(req: Request, res: Response) {
  const userService = container.resolve(UserService);

  const users = await userService.getUsers();

  res.status(StatusCodes.OK).json(users);
}

export async function getUserHandler(
  req: Request<ReadUserInput['params']>,
  res: Response
) {
  const { params } = req;
  const { userId: id } = params;

  const userService = container.resolve(UserService);

  const user = await userService.getUser(id);

  res.status(StatusCodes.OK).json(user);
}

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response
) {
  const { body } = req;
  const { sub: requesterId } = res.locals.user;

  const userService = container.resolve(UserService);

  try {
    const user = await userService.createUser(requesterId, { ...body });

    res.status(StatusCodes.CREATED).json(user);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json(error.message);
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  }
}

export async function updateUserHandler(
  req: Request<UpdateUserInput['params']>,
  res: Response
) {
  const { body, params } = req;
  const { userId: id } = params;
  const { sub: requesterId } = res.locals.user;

  const userService = container.resolve(UserService);

  try {
    const user = await userService.updateUser(requesterId, { id, ...body });

    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json(error.message);
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  }
}

export async function deleteUserHandler(
  req: Request<DeleteUserInput['params']>,
  res: Response
) {
  const { userId } = req.params;
  const { sub: requesterId } = res.locals.user;

  const userService = container.resolve(UserService);

  try {
    await userService.deleteUser(requesterId, userId);

    res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json(error.message);
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  }
}
