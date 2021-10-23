import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetBooksByPagesDto } from './dto/get-books-by-pages.dto';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number) {
    return this.prisma.book.findUnique({
      where: {
        id,
      },
    });
  }

  async findBookIdsByYears(years: number[]) {
    return this.prisma.book.findMany({
      select: { id: true },
      distinct: ['id'],
      where: {
        year: {
          in: years,
        },
      },
    });
  }

  async findBookIdsByPages(query: GetBooksByPagesDto) {
    const pages = {
      ...(query.min && { gte: Number(query.min) }),
      ...(query.max && { lte: Number(query.max) }),
    };
    return this.prisma.book.findMany({
      select: { id: true },
      distinct: ['id'],
      where: {
        pages,
      },
    });
  }
}
