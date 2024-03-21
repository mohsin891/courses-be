import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import * as admin from 'firebase-admin';
import { RefreshDto } from './dto/auth.dto';
import { IUserDocument } from 'src/users/interfaces/user.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { VerifyDto } from './dto/verify.dto';
import { HttpService } from '@nestjs/axios';
import { EmailService } from 'src/email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
    private readonly emailService: EmailService,
  ) { }

  async validateUser(
    email: string,
    password: string,
  ): Promise<IUserDocument | null> {
    const user = await this.userService.findOne(email);
    if (user) {
      // TODO: check email verified
      return user;
    }
    return null;
  }

  async validateToken(token: VerifyDto) {
    const decoded = await admin.auth().verifyIdToken(token.token);
    const user = await this.userService.findOne(decoded.email);
    if (!user) {
      throw new UnauthorizedException("User is not register")
    }
    const payload = user.toJSON();
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '24h' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '15d' }),
      user: { ...payload },
    };
  }

  async registerUser(token: VerifyDto) {
    const decoded = await admin.auth().verifyIdToken(token.token);
    const createdUser = await this.userService.create({ ...decoded, role: 'user' } as any);

    if (!decoded.email_verified) {
      const link = await admin.auth().generateEmailVerificationLink(decoded.email)
      const response = await this.httpService.get('https://firebasestorage.googleapis.com/v0/b/raza-academy-mobile.appspot.com/o/html%2Ftemp.html?alt=media&token=931e6691-6401-46dc-be9d-5be244b223a6').toPromise()
      const htmlContent = response.data.replace("{{VERIFICATION_LINK}}", `"${link}"`)
      await this.emailService.sendEmail("nazimraza350@gmail.com", "Raza Academy Email Verification", htmlContent)
      return { ...decoded }
    }

    const payload = createdUser.toJSON();
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '24h' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '15d' }),
      user: { ...payload },
    };
  }

  async signin(user: IUserDocument) {
    const payload = user.toJSON();
    delete payload.password;
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '24h' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '15d' }),
      user: { ...payload },
    };
  }

  async signUp() {
    const link = await admin.auth().generateEmailVerificationLink("nazimraza350@gmail.com")
    const response = await this.httpService.get('https://firebasestorage.googleapis.com/v0/b/raza-academy-mobile.appspot.com/o/html%2Ftemp.html?alt=media&token=931e6691-6401-46dc-be9d-5be244b223a6').toPromise()
    const htmlContent = response.data.replace("{{VERIFICATION_LINK}}", `"${link}"`)
    await this.emailService.sendEmail("nazimraza350@gmail.com", "Raza Academy Email Verification", htmlContent)
  }

  async refresh(dto: RefreshDto) {
    try {
      var decodedToken = await this.jwtService.verifyAsync(dto.refreshToken);
      const user = await this.userService.findById(decodedToken._id);
      if (user === null) {
        throw new UnauthorizedException('Invalid token');
      }
      return {
        access_token: this.jwtService.sign(user.toJSON(), { expiresIn: '24h' }),
        refresh_token: this.jwtService.sign(user.toJSON(), { expiresIn: '15d' }),
      };
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
