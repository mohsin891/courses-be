import { Document, Model } from 'mongoose';
import { ComplianceDetails } from '../entities/compliance.entity';

type IComplianceDocument = Document & ComplianceDetails;

type IComplianceModel = Model<IComplianceDocument>;
export { IComplianceDocument, IComplianceModel };
