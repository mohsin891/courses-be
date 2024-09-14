import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Assets } from 'src/entities/assets.entity';
import { IAssetsModel } from 'src/interfaces/assets.interface';

@Injectable()
export class AssetsService {
  constructor(
    @InjectModel(Assets.name) private readonly AssetsModel: IAssetsModel,
  ) {}
  async create(createAssetDto: CreateAssetDto) {
    return await this.AssetsModel.create(createAssetDto);
  }

  async createBulk(createAssetDto: CreateAssetDto[]) {
    return await this.AssetsModel.insertMany(createAssetDto);
  }

  async findAll() {
    return await this.AssetsModel.find().sort({ createdOn: 1 });
  }

  async findOne(id: string) {
    return await this.AssetsModel.findById(id);
  }

  async update(id: string, updateAssetDto: UpdateAssetDto) {
    return await this.AssetsModel.findByIdAndUpdate(id, updateAssetDto);
  }

  async remove(id: string) {
    return await this.AssetsModel.findByIdAndDelete(id);
  }
}
