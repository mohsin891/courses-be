import { InjectModel } from '@nestjs/mongoose';
import { ICategoryModel } from 'src/interfaces/category.interface';
import { Category } from 'src/entities/categories.entity';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';

export class QuestionRepository {
    constructor(
        @InjectModel(Category.name) private readonly categoryModel: ICategoryModel,
    ) { }

    async createQuestion(question: CreateCategoryDto) {
        return await this.categoryModel.create(question);
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

    async getCategories() {
        return await this.categoryModel.find().sort({ showOrder: 1 });
    }

    async getCategory(id: string) {
        return await this.categoryModel.findById(id);
    }

    async updateCategory(id: string, question: CreateCategoryDto) {
        return await this.categoryModel.findByIdAndUpdate(id, {
            $set: { ...question },
        });
    }

    async deleteCategory(id: string) {
        return await this.categoryModel.findByIdAndDelete(id);
    }
}
