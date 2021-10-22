-- CreateTable
CREATE TABLE "Book" (
    "id" INTEGER NOT NULL,
    "original_title" TEXT,
    "language_code" TEXT,
    "category" TEXT,
    "plot" TEXT,
    "content_name" TEXT,
    "year" INTEGER,
    "copyright" TEXT,
    "average_rating" DOUBLE PRECISION,
    "similar_books" TEXT[],
    "gutenberg" JSONB,
    "language" TEXT,
    "release_date" TEXT,
    "summary" TEXT,
    "content_available" BOOLEAN,
    "format" TEXT,
    "isbn" TEXT,
    "author_name" TEXT,
    "images" TEXT[],
    "title" TEXT,
    "rating_count" INTEGER,
    "description" TEXT,
    "authors" INTEGER[],
    "isbn13" TEXT,
    "author" INTEGER,
    "content_cleaned" BOOLEAN,
    "n_authors" INTEGER,
    "cover_art" TEXT,
    "images_urls" TEXT[],
    "genres" TEXT[],
    "wikipedia" JSONB,
    "goodreads" JSONB,
    "loc_class" TEXT,
    "pages" INTEGER,
    "countries" INTEGER[],
    "cover" TEXT,
    "classes" TEXT[],
    "cover_art_url" TEXT,
    "contents" JSONB[],

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" INTEGER NOT NULL,
    "name" TEXT,
    "bio" TEXT,
    "gender" TEXT,
    "countries" INTEGER[],
    "wikipedia" JSONB,
    "summary" TEXT,
    "books" INTEGER[],
    "died" TEXT,
    "n_books" INTEGER,
    "born" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthorsOnBooks" (
    "id" SERIAL NOT NULL,
    "bookId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AuthorsOnBooks" ADD FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorsOnBooks" ADD FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;
