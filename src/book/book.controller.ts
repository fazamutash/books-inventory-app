import {
  Controller,
  Post,
  ForbiddenException,
  Body,
  Query,
  Get,
  Param,
  Request,
  Put,
  Inject,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BookService } from './book.service';
@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get(':id')
  async getDeviceById(@Request() request: any, @Param('id') id: string) {
    const book = await this.bookService.findOne(Number(id));
    return book;
  }
}
