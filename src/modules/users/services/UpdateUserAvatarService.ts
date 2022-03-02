import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '@modules/users/infra/typeorm/entities/User';
import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';

interface Request {
  user_id: string;
  avatarFilename: string;
}

export default class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError(`Only authenticated users can change avatar`, 401);
    }

    if (user.avatar) {
      // verificar se um arquivo existe. Caso não exista retorna vazio
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarExists = await fs.promises.stat(userAvatarFilePath);

      // Deletar avatar anterior
      if (userAvatarExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}