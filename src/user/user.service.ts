import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schma';
import SignInUserDTO from 'src/dto/user/signInUser.dto';
import SignUpUserDTO from 'src/dto/user/signUpUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: Model<UserDocument>,
  ) {}

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
}
