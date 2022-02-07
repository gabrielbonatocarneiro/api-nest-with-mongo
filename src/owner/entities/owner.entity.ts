import * as mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type OwnerDocument = Owner & mongoose.Document;

@Schema({ collection: 'owner' })
export class Owner {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  trainer: boolean;

  @Prop({ required: true })
  created_at: string;

  @Prop({ required: true })
  updated_at: string;

  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Dog', required: false },
    ],
  })
  dogs?: mongoose.Schema.Types.ObjectId[];
}

export const OwnerSchema = SchemaFactory.createForClass(Owner);
