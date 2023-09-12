import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinDate,
} from 'class-validator';
import SignInUserDTO from './signInUser.dto';

export default class SignUpUserDTO extends SignInUserDTO {
  @IsNotEmpty({ message: 'The first name is required.' })
  @IsString({ message: 'The first name must be a string.' })
  readonly firstName: string;

  @IsNotEmpty({ message: 'The last name is required.' })
  @IsString({ message: 'The last name must be a string.' })
  @IsOptional()
  readonly lastName: string;

  @IsDateString()
  @IsOptional()
  @MinDate(new Date(new Date().getFullYear() - 18, 0, 1), {
    message: 'You must be at least 18 years old to register.',
  })
  @IsOptional()
  readonly birthDate: Date;
}
