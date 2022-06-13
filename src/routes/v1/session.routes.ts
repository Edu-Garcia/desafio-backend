import { Router } from 'express';
import { createSessionHandler } from '../../controllers/session.controller';
import validateResource from '../../middlewares/validateResource';

import { createSessionSchema } from '../../schemas/session.schema';

const routes = Router();

/**
 * @openapi
 * '/api/v1/sessions':
 *  post:
 *     tags:
 *     - Sessions
 *     summary: Create a session
 *     description: Authenticates the user and returns a valid token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSessionInput'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateSessionResponse'
 *       401:
 *         description: Unhautorized
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             code: 404
 *             message: Invalid cpf or password
 */

routes
  .route('/')
  .post([validateResource(createSessionSchema)], createSessionHandler);

export default routes;
