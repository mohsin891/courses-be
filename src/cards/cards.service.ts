import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { BusinessCard } from 'src/entities/cards.entity';
import { ICardModel } from 'src/interfaces/cards.interface';

@Injectable()
export class CardsService {
  constructor(
    @InjectModel(BusinessCard.name) private readonly cardsModel: ICardModel,
  ) {}
  async create(createCardDto: CreateCardDto) {
    const cards = await this.cardsModel.create(createCardDto);
    return cards;
  }

  async findAll() {
    return await this.cardsModel.find();
  }

  async findOne(id: string) {
    return this.cardsModel.findById(id);
  }

  async update(id: string, updateCardDto: UpdateCardDto) {
    const cards = await this.cardsModel.findByIdAndUpdate(id, updateCardDto);
    return cards;
  }

  remove(id: number) {
    return `This action removes but not remove`;
  }
}
