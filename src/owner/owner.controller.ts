import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { OwnerDto } from './dto/owner.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

@ApiTags('Owner')
@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post()
  @ApiCreatedResponse({ type: OwnerDto })
  @ApiBody({ type: CreateOwnerDto })
  @ApiBadRequestResponse()
  async create(
    @Body() createOwnerDto: CreateOwnerDto,
  ): Promise<OwnerDto | BadRequestException> {
    try {
      const owner = await this.ownerService.create(createOwnerDto);

      return owner;
    } catch (e) {
      throw new BadRequestException(e.message, "Didn't possible create owner");
    }
  }

  @Get()
  @ApiOkResponse({ type: OwnerDto, isArray: true })
  findAll(): Promise<OwnerDto[]> {
    return this.ownerService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'string', required: true })
  @ApiCreatedResponse({ type: OwnerDto })
  @ApiNotFoundResponse()
  async findOne(
    @Param('id') id: ObjectId,
  ): Promise<OwnerDto | NotFoundException> {
    try {
      const owner = await this.ownerService.findOne(id);

      return owner;
    } catch (e) {
      throw new NotFoundException(e.message, 'Owner not found');
    }
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: 'string', required: true })
  @ApiOkResponse({ type: OwnerDto })
  @ApiBody({ type: UpdateOwnerDto })
  @ApiBadRequestResponse()
  async update(
    @Param('id') id: ObjectId,
    @Body() updateOwnerDto: UpdateOwnerDto,
  ): Promise<OwnerDto | BadRequestException> {
    try {
      const owner = await this.ownerService.update(id, updateOwnerDto);

      return owner;
    } catch (e) {
      throw new BadRequestException(e.message, "Didn't possible update owner");
    }
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string', required: true })
  @ApiBadRequestResponse()
  async remove(@Param('id') id: ObjectId): Promise<any | BadRequestException> {
    try {
      await this.ownerService.remove(id);

      return {
        statusCode: 200,
        message: 'Owner removed successfully',
      };
    } catch (e) {
      throw new BadRequestException(e.message, "Didn't possible remove owner");
    }
  }
}
