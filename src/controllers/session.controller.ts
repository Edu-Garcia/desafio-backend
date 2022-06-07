import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateSessionInput } from '../schemas/session.schema';
import { createSession } from '../services/session.service';
import ApiError from '../utils/apiError.utils';

export async function createSessionHandler(
  req: Request<{}, {}, CreateSessionInput['body']>,
  res: Response
) {
  const { body } = req;

  try {
    const session = await createSession({ ...body });
    res.status(StatusCodes.CREATED).json(session);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json(error.message);
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  }
}
