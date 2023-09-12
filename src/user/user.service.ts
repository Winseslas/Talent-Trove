import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schma';
import SignInUserDTO from 'src/dto/user/signInUser.dto';
import SignUpUserDTO from 'src/dto/user/signUpUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: Model<UserDocument>,
  ) {}

  private validateId(id: string): void {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException(`Please provide a valid ID.`);
    }
  }

  private async ensureUserExists(id: string): Promise<User | null> {
    this.validateId(id);
    const user = await this.UserModel.findById(id, [
      '_id',
      'firstName',
      'email',
    ]);

    if (!user) {
      throw new NotFoundException(`User with id '${id}' not found`);
    }
    return user;
  }

  public async findOneByEmail(userData: SignInUserDTO): Promise<User | null> {
    const user = this.UserModel.findOne({ email: userData.email });

    if (!user) {
      throw new NotFoundException(
        `User with email ${userData.email} not found`,
      );
    }

    return user;
  }

  public async create(userData: SignUpUserDTO): Promise<User> {
    const createdUser = new this.UserModel(userData);
    return createdUser.save();
  }

  public async findById(id: string): Promise<User | null> {
    return await this.ensureUserExists(id);
  }
}
