import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Assets {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true, default: 'icon' })
  type: 'image' | 'icon';

  @Prop({ required: false })
  createdOn: Date;

  @Prop({ required: true })
  priority: number;
}

export const AssetSchema = SchemaFactory.createForClass(Assets);
