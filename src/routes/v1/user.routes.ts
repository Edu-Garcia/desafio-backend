import { Router } from 'express';
import {
  createUserHandler,
  deleteUserHandler,
  getUsersHandler,
  updateUserHandler,
} from '../../controllers/user.controller';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import requireUser from '../../middlewares/requireUser';
import validateResource from '../../middlewares/validateResource';

import {
  createUserSchema,
  deleteUserSchema,
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
  .post(
    // [requireUser, validateResource(createUserSchema)],
    [validateResource(createUserSchema)],
    createUserHandler
  );

routes
  .route('/:userId')
  .delete([validateResource(deleteUserSchema)], deleteUserHandler)
  .put([validateResource(updateUserSchema)], updateUserHandler);

export default routes;
