import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
  Put,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import * as admin from 'firebase-admin';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { isValidObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/auth-guards/jwt.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('check')
  check() {
    return this.usersService.check();
  }

  @Get('send-verification-email/:email')
  async sendVerificationEmail(@Param('email') email: string) {
    try {
      const link = await admin.auth().generateEmailVerificationLink(email);
      //   // Action code settings. See documentation for available options.
      //   url: '',
      //   android: {
      //     packageName: 'com.os.razaacademy'
      //   }
      // });

      // Optionally, you can send a custom verification email
      // using a service like nodemailer or Firebase Cloud Functions.
      // Handle the email sending logic here.

      return { success: true, message: 'Verification email sent' };
    } catch (error) {
      console.error('Error sending verification email:', error);
      return { success: false, error: 'Failed to send verification email' };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Roles('owner', 'member')
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (isValidObjectId(id)) {
      return this.usersService.findById(id);
    } else {
      throw new BadRequestException('Invalid user id');
    }
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Req() req,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (isValidObjectId(id)) {
      return this.usersService.update(id, req, updateUserDto);
    } else {
      throw new BadRequestException('Invalid user id');
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if (isValidObjectId(id)) {
      return this.usersService.remove(id);
    } else {
      throw new BadRequestException('Invalid user id');
    }
  }
}
