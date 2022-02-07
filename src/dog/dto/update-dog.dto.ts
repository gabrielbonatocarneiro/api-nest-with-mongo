import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { CreateDogDto } from './create-dog.dto';

export class UpdateDogDto extends PartialType(CreateDogDto) {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  age: number;

  @ApiProperty({ required: true })
  breed: string;

  @ApiProperty({ required: false })
  owner?: ObjectId;
}
