import { CompanyService } from './company.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { Company } from '../schemas/company.schema';
import { UpdateCompanyDTO } from '../dto/company/updateCompany.dto';
import CreateCompanyDTO from '../dto/company/createCompany.dto';
import SearchCompanyDTO from '../dto/company/searchCompany.dto';

@Controller('companies')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get('read-all')
  async getAllCompanies(
    @Query() query: SearchCompanyDTO,
  ): Promise<{ companies: Company[]; total: number }> {
    return this.companyService.findAll(query);
  }

  @Get('read-one/:id')
  async getCompanyById(@Param('id') id: string): Promise<Company | null> {
    return this.companyService.findById(id);
  }

  @Post('create')
  async createCompany(@Body() company: CreateCompanyDTO): Promise<Company> {
    return this.companyService.create(company);
  }

  @Put('update/:id')
  async updateCompany(
    @Param('id') id: string,
    @Body() company: UpdateCompanyDTO,
  ): Promise<Company | null> {
    return this.companyService.update(id, company);
  }

  @Delete('delete/:id')
  async deleteCompany(@Param('id') id: string): Promise<Company | null> {
    return this.companyService.delete(id);
  }
}
