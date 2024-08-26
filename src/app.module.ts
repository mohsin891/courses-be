import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { CategoriesModule } from './categories/categories.module';
import { CardsModule } from './cards/cards.module';
import { AssetsModule } from './assets/assets.module';

@Module({
  imports: [
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
    CardsModule,
    AssetsModule,
  ],
  controllers: [],
  // providers: [],
})
export class AppModule { }
