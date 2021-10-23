import {
  Controller,
  Query,
  Get,
  Param,
  Request,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthorOnBookService } from 'src/author-on-book/author-on-book.service';
import { BookService } from './book.service';
import { GetBooksByYearsDto } from './dto/get-book-by-years.dto';
import { GetBookDto } from './dto/get-book.dto';
import { GetBooksByAuthorsDto } from './dto/get-books-by-authors.dto';
import { GetBooksByPagesDto } from './dto/get-books-by-pages.dto';
@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(
    private readonly bookService: BookService,
    private readonly authorOnBookService: AuthorOnBookService,
  ) {}

  @Get(':id')
  async getBookById(@Request() request: any, @Param() params: GetBookDto) {
    const book = await this.bookService.findOne(Number(params.id));
    return book;
  }

  @Get('/authors/:ids')
  async getBookByAuthorIds(
    @Request() request: any,
    @Param() param: GetBooksByAuthorsDto,
  ) {
    const idList = param.ids.split(',').map((id) => Number(id));
    const bookIds = await this.authorOnBookService.findBookIdsByAuthorIds(
      idList,
    );
    return bookIds;
  }

  @Get('/years/:years')
  async getBookByYears(
    @Request() request: any,
    @Param() param: GetBooksByYearsDto,
  ) {
    const yearList = param.years.split(',').map((year) => Number(year));
    const bookIds = await this.bookService.findBookIdsByYears(yearList);
    return bookIds;
  }

  @Get('/pages')
  async getBookByPages(
    @Request() request: any,
    @Query() query: GetBooksByPagesDto,
  ) {
    if (!query.max && !query.min) {
      throw new UnprocessableEntityException(`Couldn't find min or max`);
    }
    console.log(query);
    return [];
  }
}
