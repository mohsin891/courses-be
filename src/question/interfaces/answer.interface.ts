import { Document, Model } from 'mongoose';
import { Answer } from '../entities/answer.entity';

type IAnswerDocument = Document & Answer;

type IAnswerModel = Model<IAnswerDocument>;
export { IAnswerDocument, IAnswerModel };
