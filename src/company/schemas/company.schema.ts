import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

interface IJob {
  title: string;
  description: string;
  requirements: string[];
  location: string;
}

@Schema({ timestamps: true })
export class Company {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  industry: string;

  @Prop({ required: true })
  description: string;

  @Prop([
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      requirements: [{ type: String, required: true }],
      location: { type: String, required: true },
    },
  ])
  jobs: IJob[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);
