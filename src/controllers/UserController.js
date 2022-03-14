/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import Joi from 'joi';
import prismaClient from '../prisma/index.js';

import Controller from './Controller.js';

dotenv.config();

const { JWT_SECRET } = process.env;

const schema = Joi.object({
  name: Joi.string().required().min(3).max(50),
  email: Joi.string().required().max(100),
  password: Joi.string().required().min(6).max(100),
  birthDate: Joi.date().required().max(new Date()),
  reviewer: Joi.boolean(),
});

class UserController extends Controller {
  constructor() {
    super('user');
  }

  async store(request, response) {
    const schemaValidation = schema.validate(request.body, {
      abortEarly: false,
    });

    if (schemaValidation.error) {
      return response.status(400).json(
        {
          error: schemaValidation.error.details.map(({ message }) => message),
          message: 'Invalid data',
        },
      );
    }

    return super.store(request, response);
  }

  async update(request, response) {
    const schemaValidation = schema.validate(request.body, {
      abortEarly: false,
    });

    if (schemaValidation.error) {
      return response.status(400).json(
        {
          error: schemaValidation.error.details.map(({ message }) => message),
          message: 'Invalid data',
        },
      );
    }

    request.body.password = await this.hashPassword(request.body.password);
    request.body.birthDate = new Date(request.body.birthDate);

    return super.update(request, response);
  }

  // Implementar Login
  async hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
  }

  async login(request, response) {
    const { email, password } = request.body;
    const user = await prismaClient.user.findFirst({ where: { email } });

    if (!user) {
      return response.status(404).send({ message: 'User not found' });
    }

    if (bcrypt.compareSync(password, user.password)) {
      delete user.password;

      const token = jsonwebtoken.sign(user, JWT_SECRET);

      return response.send({ token });
    }

    return response.status(404).send({ message: 'Password Invalid' });
  }
}

export default UserController;
