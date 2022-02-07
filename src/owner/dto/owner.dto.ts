import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { ObjectId } from 'mongoose';

export class OwnerDto {
  @ApiProperty()
  _id: ObjectId;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  age: number;

  @ApiProperty({ required: true })
  @IsBoolean()
  trainer: boolean;

  @ApiProperty({ required: true })
  created_at: string;

  @ApiProperty({ required: true })
  updated_at: string;

  @ApiProperty({ required: false, isArray: true })
  dogs?: ObjectId[];
}
