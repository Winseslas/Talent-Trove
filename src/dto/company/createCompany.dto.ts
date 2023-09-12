import { IsString, IsNotEmpty } from 'class-validator';

export default class CreateCompanyDTO {
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString({ message: 'Name must be a string' })
  readonly name: string;

  @IsNotEmpty({ message: 'Industry should not be empty' })
  @IsString({ message: 'Industry must be a string' })
  readonly industry: string;

  @IsNotEmpty({ message: 'Description should not be empty' })
  @IsString({ message: 'Description must be a string' })
  readonly description: string;
}
