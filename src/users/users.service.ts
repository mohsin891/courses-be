import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model, mongo } from 'mongoose';
import { User } from './schemas/user.entity';
import { IUserDocument } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<IUserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const exists = await this.findOne(createUserDto.email);
    if (exists) {
      return exists;
    }
    const user = new this.userModel({ ...createUserDto, role: 'user' });
    await user.save();
    return user;
  }

  findAll() {
    return this.userModel.find({ isActive: true });
  }

  async findOne(email: string) {
    return await this.userModel.findOne({ email });
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  update(id: string, req: any, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, {
      $set: {
        name: updateUserDto.name,
        imageUrl: updateUserDto.imageUrl,
        designation: updateUserDto.designation,
        modifiedBy: req.user.email,
        modifiedOn: Date.now(),
      },
    });
  }

  check() {
    return 'This is just check endpoint';
  }

  remove(id: string) {
    return this.userModel.findByIdAndUpdate(id, {
      $set: {
        isActive: false,
      },
    });
  }
}
