import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema } from './entities/question.entity';
import { QuestionRepository } from '../repositories/question.repository';
import { Answer, AnswerSchema } from './entities/answer.entity';
import {
  ComplianceDetails,
  ComplianceDetailsSchema,
} from './entities/compliance.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Question.name,
        useFactory: () => {
          return QuestionSchema;
        },
      },
      {
        name: Answer.name,
        useFactory: () => {
          return AnswerSchema;
        },
      },
      {
        name: ComplianceDetails.name,
        useFactory: () => {
          return ComplianceDetailsSchema;
        },
      },
    ]),
  ],
  controllers: [QuestionController],
  providers: [QuestionService, QuestionRepository],
  exports: [],
})
export class QuestionModule {}
