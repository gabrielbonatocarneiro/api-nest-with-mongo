import * as moment from 'moment';
import * as momentTz from 'moment-timezone';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { DogDto } from './dto/dog.dto';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';

import { Dog, DogDocument } from './entities/dog.entity';

@Injectable()
export class DogService {
  constructor(@InjectModel(Dog.name) private dogModel: Model<DogDocument>) {}

  create(createDogDto: CreateDogDto): Promise<DogDto> {
    const now = momentTz
      .tz(moment.utc(moment()), 'America/Sao_Paulo')
      .format('YYYY-MM-DD HH:mm:ss');

    const createdDog = new this.dogModel({
      ...createDogDto,
      created_at: now,
      updated_at: now,
    });

    return createdDog.save();
  }

  findAll(): Promise<DogDto[]> {
    return this.dogModel.find().populate('owner').exec();
  }

  findOne(id: ObjectId): Promise<DogDto> {
    return this.dogModel.findById(id).populate('owner').exec();
  }

  async update(id: ObjectId, updateDogDto: UpdateDogDto): Promise<DogDto> {
    await this.dogModel
      .findByIdAndUpdate(id, {
        ...updateDogDto,
        updated_at: momentTz
          .tz(moment.utc(moment()), 'America/Sao_Paulo')
          .format('YYYY-MM-DD HH:mm:ss'),
      })
      .exec();

    return this.dogModel.findById(id).exec();
  }

  async remove(id: ObjectId): Promise<void> {
    await this.dogModel.findByIdAndRemove(id).exec();
  }
}
