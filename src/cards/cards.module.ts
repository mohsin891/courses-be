import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BusinessCard, CardSchema } from 'src/entities/cards.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: BusinessCard.name,
        useFactory: () => {
          return CardSchema
        }
      }
    ])
  ],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
