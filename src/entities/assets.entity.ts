import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Assets {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true, default: 'icon' })
  type: 'image' | 'icon';
}

export const AssetSchema = SchemaFactory.createForClass(Assets);
