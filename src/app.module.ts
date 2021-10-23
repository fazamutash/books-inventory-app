import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './_bootstrap/env';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';

const nestModules = [
  ConfigModule.forRoot({
    isGlobal: true,
    validate,
  }),
];

@Module({
  imports: [...nestModules, BookModule, AuthorModule],
  providers: [],
})
export class AppModule {}
