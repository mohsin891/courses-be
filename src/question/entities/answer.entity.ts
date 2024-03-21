import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Schema as MongooseSchema } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Answer {
  @Prop({
    required: false,
    ref: 'User',
    type: MongooseSchema.Types.ObjectId,
  })
  user: Types.ObjectId;

  @Prop({
    required: false,
    ref: 'Question',
    type: MongooseSchema.Types.ObjectId,
  })
  question: Types.ObjectId;

  @Prop({ required: true })
  answer: string;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
