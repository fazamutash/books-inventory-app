import { PrismaService } from '../src/prisma/prisma.service';
import fs from 'fs';

const prisma = new PrismaService();

async function main() {
  console.log(new Date());
  const rawAuthorsData = fs.readFileSync('../authors.json');
  const { authors } = JSON.parse(rawAuthorsData.toString());

  const rawBooksData = fs.readFileSync('../books.json');
  const { books } = JSON.parse(rawBooksData.toString());

  const authorsOnBooks = [];
  books.forEach((book) => {
    book.authors.forEach((author) => {
      authorsOnBooks.push({ bookId: book.id, authorId: author });
    });
  });
  /* const uniqueKey = new Set();
  
  for (let i = 0; i < authors.length; i++) {
    for (const key in authors[i]) {
      uniqueKey.add(key);
    }
  }
  console.log([...uniqueKey]); */

  await prisma.book.createMany({ data: books, skipDuplicates: true });
  await prisma.author.createMany({ data: authors, skipDuplicates: true });
  await prisma.authorsOnBooks.createMany({
    data: authorsOnBooks,
    skipDuplicates: true,
  });
  console.log(new Date());
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
