import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionRepository } from '../repositories/question.repository';
import { CreateAnswerDto } from './dto/create-answers.dto';
import { IUserDocument } from 'src/users/interfaces/user.interface';
import { ComplianceDto } from './dto/compliance.dto';

@Injectable()
export class QuestionService {
  constructor(private readonly questionRepository: QuestionRepository) {}
  async getQuestions() {
    const questions = await this.questionRepository.getAllQuestions();
    return questions;
  }

  async answerQuestions(user: IUserDocument, dto: CreateAnswerDto[]) {
    return this.questionRepository.addAnswer(user, dto);
  }

  async getAnswers(user: IUserDocument) {
    return this.questionRepository.getAnswers(user);
  }

  async addCompliance(dto: ComplianceDto[]) {
    return this.questionRepository.addCompliance(dto);
  }

  async getComplianceDetails(userId: string) {
    return this.questionRepository.getComplianceDetails(userId);
  }

  async getQuestionById(id: string) {
    const question = await this.questionRepository.getQuestionById(id);
    return question;
  }

  async createQuestion(body: CreateQuestionDto) {
    const question = await this.questionRepository.createQuestion(body);
    return question;
  }

  async updateQuestion(id: string, body: CreateQuestionDto) {
    const question = await this.questionRepository.updateQuestion(id, body);
    return question;
  }

  async deleteQuestion(id: string) {
    const question = await this.questionRepository.deleteQuestion(id);
    return question;
  }
}
