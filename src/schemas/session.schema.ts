import { object, string, InferType } from 'yup';

/**
 * @openapi
 * components:
 *   schemas:
 *     Session:
 *       type: object
 *       required:
 *        - cpf
 *        - password
 *       properties:
 *         cpf:
 *           type: string
 *         password:
 *           type: string
 */

const payload = {
  body: object({
    cpf: string()
      .defined('CPF is required')
      .length(11, 'CPF must be 11 characters'),
    password: string().defined('Password is required'),
  }).defined(),
};

export const createSessionSchema = object({
  ...payload,
});

export type CreateSessionInput = InferType<typeof createSessionSchema>;
