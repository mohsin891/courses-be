import { Document, Model } from 'mongoose';
import { BusinessCard } from 'src/entities/cards.entity';

type ICardDocument = Document & BusinessCard;

type ICardModel = Model<ICardDocument>;
export { ICardDocument, ICardModel };
