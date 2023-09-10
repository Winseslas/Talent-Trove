import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from './schemas/company.schema';
import { Query } from 'express-serve-static-core';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name)
    private readonly CompanyModel: Model<CompanyDocument>,
  ) {}

  async findAll(
    query: Query,
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

  async findById(id: string): Promise<Company | null> {
    const company = this.CompanyModel.findById(id).exec();
    if (!company) {
      throw new NotFoundException(`Company with id ${id} not found`);
    }
    return company;
  }

  async findByName(name: string): Promise<Company | null> {
    const company = this.CompanyModel.findOne({ name }).exec();
    if (!company) {
      throw new NotFoundException(`Company with name ${name} not found`);
    }
    return company;
  }

  async create(companyData: Company): Promise<Company> {
    const createdCompany = new this.CompanyModel(companyData);
    return createdCompany.save();
  }

  async update(id: string, companyData: Company): Promise<Company | null> {
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

  async delete(id: string): Promise<Company | null> {
    const deletedCompany = await this.CompanyModel.findByIdAndDelete(id).exec();

    if (!deletedCompany) {
      throw new NotFoundException(`Company with ID ${id} not found.`);
    }

    return deletedCompany;
  }
}
