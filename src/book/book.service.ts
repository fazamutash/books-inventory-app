import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
}
