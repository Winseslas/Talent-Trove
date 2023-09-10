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
import { Company } from './schemas/company.schema';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('companies')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get()
  async getAllCompanies(
    @Query() query: ExpressQuery,
  ): Promise<{ companies: Company[]; total: number }> {
    return this.companyService.findAll(query);
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
