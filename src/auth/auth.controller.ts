import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshDto } from './dto/auth.dto';
import { LocalAuthGuard } from './auth-guards/local.guard';
import { IRequest } from './interfaces/IRequest.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtAuthGuard } from './auth-guards/jwt.guard';
import { VerifyDto } from './dto/verify.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: VerifyDto) {
    return await this.authService.registerUser(dto);
  }

  @Post('/verify')
  async verifyUserToken(@Body() token: VerifyDto) {
    return await this.authService.validateToken(token);
  }

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: IRequest) {
    return this.authService.signin(req.user);
  }

  @Post('refresh')
  refresh(@Body() dto: RefreshDto) {
    return this.authService.refresh(dto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const url = await this.authService.uploadImage(file);
    return { imageUrl: url };
  }

  @Get('/test')
  test() {
    return this.authService.signUp();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getProfile(@Req() request: IRequest) {
    return request.user;
  }
}
