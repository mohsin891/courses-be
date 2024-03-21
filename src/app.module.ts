import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionModule } from './question/question.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    QuestionModule,
    AuthModule,
    PassportModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true
    }),
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING, {
    }),
    CategoriesModule,
  ],
  controllers: [],
  // providers: [],
})
export class AppModule { }
