import { Router } from 'express';
import {
  createUserHandler,
  deleteUserHandler,
  getUsersHandler,
  updateUserHandler,
} from '../../controllers/user.controller';
import validateResource from '../../middlewares/validateResource';

import {
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
  updateUserSchema,
} from '../../schemas/user.schema';

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
  .get(getUsersHandler)
  .post([validateResource(createUserSchema)], createUserHandler);

routes
  .route('/:userId')
  .get([validateResource(getUserSchema)], deleteUserHandler)
  .delete([validateResource(deleteUserSchema)], deleteUserHandler)
  .put([validateResource(updateUserSchema)], updateUserHandler);

export default routes;
