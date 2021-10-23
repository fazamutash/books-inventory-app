import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}
  async findOne(id: number) {
    return this.prisma.author.findUnique({
      where: {
        id,
      },
    });
  }
}
