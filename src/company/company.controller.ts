import { CompanyService } from './company.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Company } from './schemas/company.schema';

@Controller('companies')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get()
  async getAllCompanies(): Promise<Company[]> {
    return this.companyService.findAll();
  }

  @Get(':id')
  async getCompanyById(@Param('id') id: string): Promise<Company | null> {
    return this.companyService.findById(id);
  }

  @Post()
  async createCompany(@Body() company): Promise<Company> {
    return this.companyService.create(company);
  }

  @Put(':id')
  async updateCompany(
    @Param('id') id: string,
    @Body() company,
  ): Promise<Company | null> {
    return this.companyService.update(id, company);
  }

  @Delete(':id')
  async deleteCompany(@Param('id') id: string): Promise<Company | null> {
    return this.companyService.delete(id);
  }
}
