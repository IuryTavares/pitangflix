/* eslint-disable import/extensions */
import Joi from 'joi';
import Controller from './Controller.js';

class MovieController extends Controller {
  constructor() {
    super('movie');
  }

  store(request, response) {
    const schema = Joi.object(
      {
        name: Joi.string().required().min(3).max(50),
        description: Joi.string().required().max(5000),
        duration: Joi.number().positive().max(500),
        classification: Joi.string(),
      },
    );

    const schemaValidation = schema.validate(request.body, { abortEarly: false });

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
}

export default MovieController;
