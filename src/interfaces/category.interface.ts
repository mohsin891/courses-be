import { Document, Model } from 'mongoose';
import { Category } from '../entities/categories.entity';

type ICategoryDocument = Document & Category;

type ICategoryModel = Model<ICategoryDocument>;
export { ICategoryDocument, ICategoryModel };
