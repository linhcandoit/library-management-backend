import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  signIn(@Body() data: SignInDto) {
    return this.authService.signIn(data.username, data.password);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get("user")
  hello(@Req() request) {
    return "hello";
  }
}
