import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

  async findUser(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username: username
      }
    })

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
