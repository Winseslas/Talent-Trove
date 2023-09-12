import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export default class SignInUserDTO {
  @IsNotEmpty({ message: 'The email is required.' })
  @IsString({ message: 'The email must be a string.' })
  readonly email: string;

  @IsNotEmpty({ message: 'The password is required.' })
  @IsString({ message: 'The password must be a string.' })
  @MinLength(5, { message: 'The password must be at least 5 characters long.' })
  readonly password: string;
}
