import { ObjectId } from 'mongoose';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { DogService } from './dog.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { DogDto } from './dto/dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';

@ApiTags('Dog')
@Controller('dog')
export class DogController {
  constructor(private readonly dogService: DogService) {}

  @Post()
  @ApiCreatedResponse({ type: DogDto })
  @ApiBody({ type: CreateDogDto })
  @ApiBadRequestResponse()
  async create(
    @Body() createDogDto: CreateDogDto,
  ): Promise<DogDto | BadRequestException> {
    try {
      const dog = await this.dogService.create(createDogDto);

      return dog;
    } catch (e) {
      throw new BadRequestException(e.message, "Didn't possible create dog");
    }
  }

  @Get()
  @ApiOkResponse({ type: DogDto, isArray: true })
  findAll(): Promise<DogDto[]> {
    return this.dogService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'string', required: true })
  @ApiCreatedResponse({ type: DogDto })
  @ApiNotFoundResponse()
  async findOne(
    @Param('id') id: ObjectId,
  ): Promise<DogDto | NotFoundException> {
    try {
      const dog = await this.dogService.findOne(id);

      return dog;
    } catch (e) {
      throw new NotFoundException(e.message, 'Dog not found');
    }
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: 'string', required: true })
  @ApiOkResponse({ type: DogDto })
  @ApiBody({ type: UpdateDogDto })
  @ApiBadRequestResponse()
  async update(
    @Param('id') id: ObjectId,
    @Body() updateDogDto: UpdateDogDto,
  ): Promise<DogDto | BadRequestException> {
    try {
      const dog = await this.dogService.update(id, updateDogDto);

      return dog;
    } catch (e) {
      throw new BadRequestException(e.message, "Didn't possible update dog");
    }
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string', required: true })
  @ApiBadRequestResponse()
  async remove(@Param('id') id: ObjectId): Promise<any | BadRequestException> {
    try {
      await this.dogService.remove(id);

      return {
        statusCode: 200,
        message: 'Dog removed successfully',
      };
    } catch (e) {
      throw new BadRequestException(e.message, "Didn't possible remove dog");
    }
  }
}
