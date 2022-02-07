import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateOwnerDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  age: number;

  @ApiProperty({ required: true })
  @IsBoolean()
  trainer: boolean;

  @ApiProperty({ required: false, isArray: true })
  dogs?: ObjectId[];
}
