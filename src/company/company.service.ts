import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Company, CompanyDocument } from '../schemas/company.schema';
import CreateCompanyDTO from '../dto/company/createCompany.dto';
import SearchCompanyDTO from '../dto/company/searchCompany.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name)
    private readonly CompanyModel: Model<CompanyDocument>,
  ) {}

  private validateId(id: string): void {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException(`Please provide a valid ID.`);
    }
  }

  private async ensureCompanyExists(idOrName: string): Promise<Company | null> {
    this.validateId(idOrName);
    const company = await this.CompanyModel.findOne({
      $or: [{ _id: idOrName }, { name: idOrName }],
    }).exec();

    if (!company) {
      throw new NotFoundException(
        `Company with id or name '${idOrName}' not found`,
      );
    }
    return company;
  }

  public async findAll(
    query: SearchCompanyDTO,
  ): Promise<{ companies: Company[]; total: number }> {
    try {
      const keyword = query.keyword || '';
      const page = query.page ? Number(query.page) : 1;
      const pageSize = 5;

      const companies = await this.CompanyModel.find({
        name: { $regex: keyword, $options: 'i' },
      })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec();

      const total = await this.CompanyModel.countDocuments({
        name: { $regex: keyword, $options: 'i' },
      });

      return { companies, total };
    } catch (error) {
      throw new Error('An error occurred while fetching companies.');
    }
  }

  public async findById(id: string): Promise<Company | null> {
    const company = await this.ensureCompanyExists(id);
    return company;
  }

  public async findByName(name: string): Promise<Company | null> {
    const company = await this.ensureCompanyExists(name);
    return company;
  }

  public async create(companyData: CreateCompanyDTO): Promise<Company> {
    const createdCompany = new this.CompanyModel(companyData);
    return createdCompany.save();
  }

  public async update(
    id: string,
    companyData: Company,
  ): Promise<Company | null> {
    this.validateId(id);
    const existingCompany = await this.CompanyModel.findByIdAndUpdate(
      id,
      companyData,
      { new: true }, // Pour renvoyer le document mis à jour
    ).exec();

    if (!existingCompany) {
      throw new NotFoundException(`Company with ID ${id} not found.`);
    }

    return existingCompany;
  }

  public async delete(id: string): Promise<Company | null> {
    this.validateId(id);
    const deletedCompany = await this.CompanyModel.findByIdAndDelete(id).exec();

    if (!deletedCompany) {
      throw new NotFoundException(`Company with ID ${id} not found.`);
    }

    return deletedCompany;
  }
}
