import {
  Body,
  Controller,
  Post,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import SignUpUserDTO from 'src/dto/user/signUpUser.dto';
import SignInUserDTO from 'src/dto/user/signInUser.dto';
import { AuthService } from './auth.service';
import { User } from '../schemas/user.schma';
import { AuthGuard } from '../utils/auth/auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() userData: SignInUserDTO): Promise<{ token: string } | null> {
    return this.authService.signIn(userData);
  }

  @Post('signup')
  signUp(@Body() userData: SignUpUserDTO): Promise<User> {
    return this.authService.signUp(userData);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() request): Promise<User> {
    const { id } = request.user;
    return this.userService.findById(id);
  }
}
