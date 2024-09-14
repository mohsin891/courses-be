import { Document, Model } from 'mongoose';
import { Assets } from 'src/entities/assets.entity';

type IAssetsDocument = Document & Assets;

type IAssetsModel = Model<IAssetsDocument>;
export { IAssetsDocument, IAssetsModel };
