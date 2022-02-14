import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    response.status(200).json({
      status: 'success',
      user,
    });
  } catch (err) {
    return response.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
});

export default usersRouter;
