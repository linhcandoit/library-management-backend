import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async signIn(usrname: string, pass: string) {
    const user = await this.usersService.findUser(usrname);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const {username, password, ...payload} = {...user};

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
