import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Schema as MongooseSchema } from 'mongoose';

@Schema({
  timestamps: true,
})
export class ComplianceDetails {
  @Prop({
    required: false,
    ref: 'Question',
    type: MongooseSchema.Types.ObjectId,
  })
  question: Types.ObjectId;

  @Prop({ required: true })
  answer: string;

  @Prop({ required: true })
  compliance: Compliance[];
}

export const ComplianceDetailsSchema =
  SchemaFactory.createForClass(ComplianceDetails);

class Compliance {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  value: string;

  @Prop({ required: false })
  dueDate: string;
}
