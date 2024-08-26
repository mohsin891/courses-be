import { Document, Model } from 'mongoose';
import { Asset } from 'src/assets/entities/asset.entity';

type IAssetsDocument = Document & Asset;

type IAssetsModel = Model<IAssetsDocument>;
export { IAssetsDocument, IAssetsModel };
