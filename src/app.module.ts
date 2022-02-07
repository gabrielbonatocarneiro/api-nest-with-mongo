import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DogModule } from './dog/dog.module';
import { OwnerModule } from './owner/owner.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/admin'),
    DogModule,
    OwnerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
