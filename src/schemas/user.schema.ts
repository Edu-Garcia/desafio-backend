import { object, string, InferType, date } from 'yup';

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *        - name
 *        - password
 *        - birth_date
 *        - cpf
 *        - observations
 *        - permission
 *       properties:
 *         name:
 *           type: string
 *         password:
 *           type: string
 *         birth_date:
 *           type: Date
 *           format: date
 *         cpf:
 *           type: string
 *         observations:
 *           type: string
 *         permission:
 *           type: string
 *           enum:
 *             - admin
 *             - user
 */

const payload = {
  body: object({
    name: string()
      .defined('Name is required')
      .max(120, 'Name must be less than 120 characters'),
    password: string().defined('Password is required'),
    birth_date: date().defined('Birth date is required'),
    cpf: string()
      .defined('CPF is required')
      .length(11, 'CPF must be 11 characters'),
    observations: string().max(
      500,
      'Observations must be less than 500 characters'
    ),
    permission: string()
      .defined('Permission is required')
      .oneOf(
        ['admin', 'colaborator'],
        'Permission must be admin or colaborator'
      ),
  }).defined(),
};

const updatePayload = {
  body: object({
    observations: string().max(
      500,
      'Observations must be less than 500 characters'
    ),
    permission: string().oneOf(
      ['admin', 'colaborator'],
      'Permission must be admin or colaborator'
    ),
  }).defined(),
};

const params = {
  params: object({ userId: string().defined('userId is required') }),
};

export const createUserSchema = object({
  ...payload,
});

export const updateUserSchema = object({
  ...updatePayload,
  ...params,
});

export const deleteUserSchema = object({
  ...params,
});

export const getUserSchema = object({
  ...params,
});

export type CreateUserInput = InferType<typeof createUserSchema>;
export type UpdateUserInput = InferType<typeof updateUserSchema>;
export type ReadUserInput = InferType<typeof getUserSchema>;
export type DeleteUserInput = InferType<typeof deleteUserSchema>;
