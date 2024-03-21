import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
})
export class User {
  @Prop({ required: false, default: false })
  email_verified: boolean;

  @Prop({ required: true })
  displayName: string;

  @Prop({ required: true })
  role: "admin" | "user" | "instructor";

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false })
  phone_number: string;

  @Prop({ required: false })
  picture: string;

  @Prop({ required: true })
  uid: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
