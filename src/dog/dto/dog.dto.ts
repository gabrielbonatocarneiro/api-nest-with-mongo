import { Owner } from 'src/owner/entities/owner.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class DogDto {
  @ApiProperty()
  _id: ObjectId;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  age: number;

  @ApiProperty({ required: true })
  breed: string;

  @ApiProperty({ required: true })
  created_at: string;

  @ApiProperty({ required: true })
  updated_at: string;

  @ApiProperty({ required: false })
  owner?: ObjectId;
}
