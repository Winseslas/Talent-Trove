import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../schemas/user.schma';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import SignInUserDTO from '../dto/user/signInUser.dto';
import SignUpUserDTO from '../dto/user/signUpUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async signIn(
    userData: SignInUserDTO,
  ): Promise<{ token: string } | null> {
    const user = await this.userService.findOneByEmail(userData);

    if (!user) {
      throw new UnauthorizedException('User not found.');
    }

    const passwordMatch = await bcrypt.compare(
      userData.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }

  public async signUp(userData: SignUpUserDTO): Promise<User | null> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    const existingUser = await this.userService.findOneByEmail(userData);

    if (existingUser) {
      throw new ConflictException('Email already exists.');
    }

    return await this.userService.create({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: hashedPassword,
      birthDate: userData.birthDate,
    });
  }
}
