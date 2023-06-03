import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

  async createUser(user: User, data: CreateUserDto) {
    if(user.role !== "admin"){
      throw new HttpException("Don't have permission", HttpStatus.BAD_REQUEST);
    }

    const newUser = new User();
    
    newUser.id = data.id;
    newUser.name = data.name;
    newUser.email = data.email;
    newUser.faculty = data.faculty;
    newUser.class = data.class;
    newUser.role = data.role;
    newUser.bookBorrowed = 10;
    newUser.username = newUser.id;
    newUser.password = newUser.id;

    await this.userRepository.save(newUser);

    return newUser;
  }

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

  async getListUser(){
    const users = await this.userRepository.find();
    return users;
  }

  async getInfoUser(user: User){
    return user;
  }
  
}
