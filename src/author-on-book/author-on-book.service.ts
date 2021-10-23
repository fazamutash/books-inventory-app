import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthorOnBookService {
  constructor(private prisma: PrismaService) {}
  async findBookIdsByAuthorIds(ids: number[]) {
    return this.prisma.authorsOnBooks.findMany({
      select: { bookId: true },
      distinct: ['bookId'],
      where: {
        authorId: {
          in: ids,
        },
      },
    });
  }
}
