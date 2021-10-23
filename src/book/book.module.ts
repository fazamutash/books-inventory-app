import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthorOnBookService } from '../author-on-book/author-on-book.service';

@Module({
  imports: [PrismaModule, ConfigModule],
  exports: [BookService],
  controllers: [BookController],
  providers: [BookService, AuthorOnBookService],
})
export class BookModule {}
