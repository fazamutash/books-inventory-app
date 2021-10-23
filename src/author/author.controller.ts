import { Controller, Get, Param, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthorService } from './author.service';
import { GetAuthorDto } from './dto/get-author.dto';
@ApiTags('authors')
@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get(':id')
  async getAuthorById(@Request() request: any, @Param() param: GetAuthorDto) {
    const author = await this.authorService.findOne(Number(param.id));
    return author;
  }
}
