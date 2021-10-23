import { Module } from '@nestjs/common';
import { AuthorOnBookService } from './author-on-book.service';

@Module({
  imports: [],
  providers: [AuthorOnBookService],
  exports: [AuthorOnBookService],
})
export class AuthorOnBookModule {}
