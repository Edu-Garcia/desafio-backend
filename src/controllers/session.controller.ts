import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateSessionInput } from '../schemas/session.schema';
import { createSession } from '../services/session.service';

export async function createSessionHandler(
  req: Request<{}, {}, CreateSessionInput['body']>,
  res: Response
) {
  const { body } = req;

  const session = await createSession({ ...body });

  res.status(StatusCodes.CREATED).json(session);
}
