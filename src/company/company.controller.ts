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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../utils/auth/auth.guard';
import { Company } from '../schemas/company.schema';
import { UpdateCompanyDTO } from '../dto/company/updateCompany.dto';
import CreateCompanyDTO from '../dto/company/createCompany.dto';
import SearchCompanyDTO from '../dto/company/searchCompany.dto';

@Controller('companies')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @UseGuards(AuthGuard)
  @Get('read-all')
  async getAllCompanies(
    @Query() query: SearchCompanyDTO,
  ): Promise<{ companies: Company[]; total: number }> {
    return this.companyService.findAll(query);
  }

  @UseGuards(AuthGuard)
  @Get('read-one/:id')
  async getCompanyById(@Param('id') id: string): Promise<Company | null> {
    return this.companyService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Post('create')
  async createCompany(@Body() company: CreateCompanyDTO): Promise<Company> {
    return this.companyService.create(company);
  }

  @UseGuards(AuthGuard)
  @Put('update/:id')
  async updateCompany(
    @Param('id') id: string,
    @Body() company: UpdateCompanyDTO,
  ): Promise<Company | null> {
    return this.companyService.update(id, company);
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  async deleteCompany(@Param('id') id: string): Promise<Company | null> {
    return this.companyService.delete(id);
  }
}
