import { Body, Controller, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  signIn(@Body() data: SignInDto) {
    return this.authService.signIn(data.username, data.password);
  }
}
