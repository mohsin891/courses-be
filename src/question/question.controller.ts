import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { JwtAuthGuard } from 'src/auth/auth-guards/jwt.guard';
import { CreateAnswerDto } from './dto/create-answers.dto';
import { IRequest } from 'src/auth/interfaces/IRequest.interface';
import { ComplianceDto } from './dto/compliance.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.createQuestion(createQuestionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('answers')
  async addAnswers(@Req() request: IRequest, @Body() dto: CreateAnswerDto[]) {
    return this.questionService.answerQuestions(request.user, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('answers')
  async getAnswers(@Req() request: IRequest) {
    return this.questionService.getAnswers(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('add-compliance')
  async addCompliance(@Body() dto: ComplianceDto[]) {
    return this.questionService.addCompliance(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('compliance-details')
  async getComplianceDetails(@Req() req: IRequest) {
    return this.questionService.getComplianceDetails(req.user._id);
  }

  @Get()
  findAll() {
    return this.questionService.getQuestions();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.getQuestionById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: CreateQuestionDto) {
    return this.questionService.updateQuestion(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.deleteQuestion(id);
  }
}
