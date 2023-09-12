import { IsArray } from 'class-validator';
import CreateCompanyDTO from './createCompany.dto';

interface IJob {
  title: string;
  description: string;
  requirements: string[];
  location: string;
}

export class UpdateCompanyDTO extends CreateCompanyDTO {
  readonly id: string;

  @IsArray({ message: 'Jobs must be an array' })
  readonly jobs: Array<IJob>;
}
