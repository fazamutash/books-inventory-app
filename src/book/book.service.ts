import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookService {
  defaultPerPage: number;

  constructor(private prisma: PrismaService) {}
  async findOne(id: number) {
    return this.prisma.book.findUnique({
      where: {
        id,
      },
    });
  }

  async createMany(data) {
    return this.prisma.book.createMany({ data, skipDuplicates: true });
  }
}
