import * as mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Owner } from 'src/owner/entities/owner.entity';

export type DogDocument = Dog & mongoose.Document;

@Schema({ collection: 'dog' })
export class Dog {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  breed: string;

  @Prop({ required: true })
  created_at: string;

  @Prop({ required: true })
  updated_at: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: false })
  owner?: mongoose.Schema.Types.ObjectId;
}

export const DogSchema = SchemaFactory.createForClass(Dog);
