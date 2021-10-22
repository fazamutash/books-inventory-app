import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, ConfigModule],
  exports: [AuthorService],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
