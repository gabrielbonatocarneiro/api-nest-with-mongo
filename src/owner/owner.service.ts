import * as moment from 'moment';
import * as momentTz from 'moment-timezone';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Owner, OwnerDocument } from './entities/owner.entity';
import { OwnerDto } from './dto/owner.dto';

@Injectable()
export class OwnerService {
  constructor(
    @InjectModel(Owner.name) private ownerModel: Model<OwnerDocument>,
  ) {}

  create(createOwnerDto: CreateOwnerDto): Promise<OwnerDto> {
    const now = momentTz
      .tz(moment.utc(moment()), 'America/Sao_Paulo')
      .format('YYYY-MM-DD HH:mm:ss');

    const createOwner = new this.ownerModel({
      ...createOwnerDto,
      created_at: now,
      updated_at: now,
    });

    return createOwner.save();
  }

  async findAll(): Promise<OwnerDto[]> {
    const owners = await this.ownerModel.find().populate('dogs').exec();

    return owners;
  }

  findOne(id: ObjectId): Promise<OwnerDto> {
    return this.ownerModel.findById(id).populate('dogs').exec();
  }

  async update(
    id: ObjectId,
    updateOwnerDto: UpdateOwnerDto,
  ): Promise<OwnerDto> {
    await this.ownerModel
      .findByIdAndUpdate(id, {
        ...updateOwnerDto,
        updated_at: momentTz
          .tz(moment.utc(moment()), 'America/Sao_Paulo')
          .format('YYYY-MM-DD HH:mm:ss'),
      })
      .exec();

    return this.ownerModel.findById(id).exec();
  }

  async remove(id: ObjectId): Promise<void> {
    await this.ownerModel.findByIdAndRemove(id).exec();
  }
}
