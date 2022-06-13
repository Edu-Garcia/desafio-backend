import { Router } from 'express';
import {
  createUserHandler,
  deleteUserHandler,
  getUserHandler,
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
 * '/api/v1/users':
 *  get:
 *     tags:
 *     - Users
 *     summary: Get all registered users
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/CreateUserInput'
 *  post:
 *     tags:
 *     - Users
 *     summary: Create a user
 *     description: Only admins can create other users.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *       401:
 *         description: Unhautorized
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             code: 401
 *             message: Only admins can create users
 *       409:
 *         description: Conflict
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             code: 409
 *             message: Cpf already exists
 * '/api/v1/users/{userId}':
 *  get:
 *     tags:
 *     - Users
 *     summary: Get a single user by the userId
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: The id of the user
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *       404:
 *         description: Not Found
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             code: 404
 *             message: User not found
 *  delete:
 *     tags:
 *     - Users
 *     summary: Delete user by the userId
 *     description: Only admins can delete other users.
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: The id of the user
 *        required: true
 *     responses:
 *       204:
 *         description: No Content
 *       401:
 *         description: Unhautorized
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             code: 404
 *             message: Only admins can delete users
 *       404:
 *         description: Not Found
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             code: 404
 *             message: User not found
 *  put:
 *     tags:
 *     - Users
 *     summary: Update user by the userId
 *     description: Only admins can update other users.
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: The id of the user
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *       401:
 *         description: Unhautorized
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             code: 404
 *             message: Only admins can delete users
 *       404:
 *         description: Not Found
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *           example:
 *             code: 404
 *             message: User not found
 */

routes
  .route('/')
  .get(getUsersHandler)
  .post([validateResource(createUserSchema)], createUserHandler);

routes
  .route('/:userId')
  .get([validateResource(getUserSchema)], getUserHandler)
  .delete([validateResource(deleteUserSchema)], deleteUserHandler)
  .put([validateResource(updateUserSchema)], updateUserHandler);

export default routes;
