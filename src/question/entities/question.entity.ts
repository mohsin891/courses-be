import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Question {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  answers: string[];

  @Prop({ required: true })
  showOrder: number;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
