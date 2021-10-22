import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthorService {
  defaultPerPage: number;

  constructor(private prisma: PrismaService) {}
  async findOne(id: number) {
    return this.prisma.author.findUnique({
      where: {
        id,
      },
    });
  }

  async createMany(data) {
    return this.prisma.author.createMany({ data, skipDuplicates: true });
  }
}
