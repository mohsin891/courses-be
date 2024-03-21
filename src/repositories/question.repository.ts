import { InjectModel } from '@nestjs/mongoose';
import { IQuestionModel } from '../question/interfaces/question.interface';
import { Question } from '../question/entities/question.entity';
import { CreateQuestionDto } from '../question/dto/create-question.dto';
import { IAnswerModel } from 'src/question/interfaces/answer.interface';
import { CreateAnswerDto } from 'src/question/dto/create-answers.dto';
import { IUserDocument } from 'src/users/interfaces/user.interface';
import { Answer } from 'src/question/entities/answer.entity';
import { ComplianceDto } from 'src/question/dto/compliance.dto';
import { ComplianceDetails } from 'src/question/entities/compliance.entity';
import { IComplianceModel } from 'src/question/interfaces/compliance.interface';
import { IRequest } from 'src/auth/interfaces/IRequest.interface';

export class QuestionRepository {
  constructor(
    @InjectModel(Question.name) private readonly questionModel: IQuestionModel,
    @InjectModel(Answer.name) private readonly answerModel: IAnswerModel,
    @InjectModel(ComplianceDetails.name)
    private readonly complianceModel: IComplianceModel,
  ) {}

  async createQuestion(question: CreateQuestionDto) {
    return await this.questionModel.create(question);
  }

  async addAnswer(user: IUserDocument, dto: CreateAnswerDto[]) {
    const answers = dto.map((ans) => {
      return { ...ans, user: user._id, question: ans._id };
    });
    const updatedAnswers = [];

    await this.answerModel.deleteMany({ user: user._id });

    for (const answer of answers) {
      const { user, _id, answer: answerValue } = answer;

      const filter = { user, question: _id };
      const update = { answer: answerValue };
      const options = { upsert: true, new: true };

      const updatedAnswer = await this.answerModel.findOneAndUpdate(
        filter,
        update,
        options,
      );
      updatedAnswers.push(updatedAnswer);
    }

    return updatedAnswers;
  }

  async getAnswers(user: IUserDocument) {
    return await this.answerModel.find({ user: user._id }).populate('question');
  }

  async addCompliance(dto: ComplianceDto[]) {
    return await this.complianceModel.insertMany(dto);
  }

  makeUniqueByTwoFields(array: Array<any>, field1: string, field2: string) {
    const uniqueObjects = new Set();

    return array.filter((obj) => {
      const key = obj[field1] + obj[field2];

      if (!uniqueObjects.has(key)) {
        uniqueObjects.add(key);
        return true;
      }

      return false;
    });
  }

  async getComplianceDetails(user: string) {
    const answers = await this.answerModel.find({ user });
    let result = [];
    const compliance = await this.complianceModel.find({
      question: { $in: answers.map((ans) => ans.question) },
    });
    const details = compliance.filter((cmp) =>
      answers.some(
        (ans) =>
          ans.question.toHexString() === cmp.question.toHexString() &&
          ans.answer === cmp.answer,
      ),
    );
    for (const detail of details) {
      result = [...result, ...detail.compliance];
    }
    const entity = answers.find(
      (ans) => ans.question.toHexString() === '645f7478f909d2875c54e855',
    );

    const tds = [
      {
        type: 'TDS',
        value: 'TDS is applicable',
      },
      {
        type: 'TDS Payment',
        value: '',
        dueDate: [
          '07/01',
          '07/02',
          '07/03',
          '07/04',
          '07/05',
          '07/06',
          '07/07',
          '07/08',
          '07/09',
          '07/10',
          '07/11',
          '07/12',
        ],
      },
      {
        type: 'TDS Filing',
        value: '',
        dueDate: ['31/01', '31/04', '31/07', '31/12'],
      },
    ];

    if (entity?.answer === 'Individual' || entity?.answer === 'HUF') {
      if (
        result.findIndex(
          (i) => i.value === 'You are covered under Tax Audit',
        ) !== -1
      ) {
        result = [...result, ...tds];
      } else {
        result.push({ type: 'TDS', value: 'TDS is not applicable' });
      }
    } else {
      result = [...result, ...tds];
    }
    const composition = answers.find(
      (ans) =>
        ans.question.toHexString() === '6492c601c9d5bbe4595da349' &&
        ans.answer !== 'Trader' &&
        ans.answer !== 'Manufacturer' &&
        ans.answer !== 'Restaurant Service',
    );
    if (!composition) {
      result = result.filter((res) => res.type !== 'GST composition scheme');
    }
    return this.makeUniqueByTwoFields(result, 'type', 'value');
  }

  async getAllQuestions() {
    return await this.questionModel.find().sort({ showOrder: 1 });
  }

  async getQuestionById(id: string) {
    return await this.questionModel.findById(id);
  }

  async updateQuestion(id: string, question: CreateQuestionDto) {
    return await this.questionModel.findByIdAndUpdate(id, {
      $set: { ...question },
    });
  }

  async deleteQuestion(id: string) {
    return await this.questionModel.findByIdAndDelete(id);
  }
}
