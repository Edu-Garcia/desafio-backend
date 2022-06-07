import { Router } from 'express';
import { createSessionHandler } from '../../controllers/session.controller';
import validateResource from '../../middlewares/validateResource';

import { createSessionSchema } from '../../schemas/session.schema';

const routes = Router();

/**
 * @openapi
 * '/api/users/{userId}':
 *  get:
 *     tags:
 *     - Users
 *     summary: Get a single product by the userId
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: The id of the product
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/User'
 *       404:
 *         description: Product not found
 */

routes
  .route('/')
  .post([validateResource(createSessionSchema)], createSessionHandler);

export default routes;
