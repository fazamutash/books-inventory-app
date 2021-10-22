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
import { AuthorService } from './author.service';
@ApiTags('authors')
@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get(':id')
  async getDeviceById(@Request() request: any, @Param('id') id: string) {
    const author = await this.authorService.findOne(Number(id));
    return author;
  }
}
