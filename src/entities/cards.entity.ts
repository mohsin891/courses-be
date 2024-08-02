import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class TextStyle {
  @Prop({ required: true })
  fontSize: number;

  @Prop({ required: true })
  fontFamily: string;

  @Prop({ required: true })
  color: string;
}

export const TextStyleSchema = SchemaFactory.createForClass(TextStyle);

@Schema({ _id: false })
export class BoxState {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  parent: string;

  @Prop({ required: true })
  x: number;

  @Prop({ required: true })
  y: number;

  @Prop({ required: true })
  width: number;

  @Prop({ required: true })
  height: number;

  @Prop({ required: true })
  rotation: number;

  @Prop()
  imageUri?: string;

  @Prop()
  textContent?: string;

  @Prop({ type: TextStyleSchema })
  textStyle?: TextStyle;
}

export const BoxStateSchema = SchemaFactory.createForClass(BoxState);

@Schema({ _id: false })
export class Layout {
  @Prop({ required: true })
  x: number;

  @Prop({ required: true })
  y: number;

  @Prop({ required: true })
  width: number;

  @Prop({ required: true })
  height: number;
}

export const LayoutSchema = SchemaFactory.createForClass(Layout);

@Schema({ _id: false })
export class Style {
  @Prop()
  height?: number;

  @Prop()
  width?: number;

  @Prop()
  ratio?: number;

  @Prop()
  backgroundColor?: string;

  @Prop({ required: true })
  borderRadius: number;
}

export const StyleSchema = SchemaFactory.createForClass(Style);

@Schema({ _id: false })
export class Card {
  @Prop({ required: true })
  id: string;

  @Prop({ type: StyleSchema, required: true })
  style: Style;

  @Prop({ required: true, enum: ['linear', 'radial', 'color', 'image'] })
  viewType: 'linear' | 'radial' | 'color' | 'image';

  @Prop({ type: [String] })
  colors?: string[];

  @Prop()
  imageUri?: string;

  @Prop()
  snap?: string;

  @Prop({ type: LayoutSchema })
  layout?: Layout;
}

export const CardSchema = SchemaFactory.createForClass(Card);

@Schema({ timestamps: true })
export class BusinessCard {
  @Prop({ type: [BoxStateSchema], required: true })
  boxes: BoxState[];

  @Prop({ type: [CardSchema], required: true })
  card: Card[];
}

export const BusinessCardSchema = SchemaFactory.createForClass(BusinessCard);
