import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { CustomValidationPipe } from '../src/_bootstrap/validation.pipe';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

describe('e2e api test', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    app.useGlobalPipes(new CustomValidationPipe());
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it('/books/:id (GET)', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/books/1',
    });
    expect(result.statusCode).toEqual(200);
    const payload = JSON.parse(result.payload);
    expect(payload.id).toEqual(1);
    expect(payload.author_name).toEqual('H. G. Wells');
    expect(payload.original_title).toEqual('The Time Machine');
  });

  it('/books/wrongpattern (GET)', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/books/wrongpattern',
    });
    expect(result.statusCode).toEqual(422);
    const payload = JSON.parse(result.payload);
    expect(payload.message[0].property).toEqual('id');
    expect(payload.message[0].constraints.isNumberString).toEqual(
      'id must be a number string',
    );
  });

  it('/books/authors/:ids (GET)', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/books/authors/1,2',
    });
    expect(result.statusCode).toEqual(200);
    const payload = JSON.parse(result.payload);
    expect(payload.length).toEqual(26);
  });

  it('/books/authors/wrongpattern (GET)', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/books/authors/wrongpattern',
    });
    expect(result.statusCode).toEqual(422);
    const payload = JSON.parse(result.payload);
    expect(payload.message[0].property).toEqual('ids');
    expect(payload.message[0].constraints.numbers).toEqual(
      'ids must be numbers with comma delimiter',
    );
  });

  it('/books/years/:years (GET)', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/books/years/1974,1973',
    });
    expect(result.statusCode).toEqual(200);
    const payload = JSON.parse(result.payload);
    expect(payload.length).toEqual(31);
  });

  it('/books/years/wrongpattern (GET)', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/books/years/wrongpattern',
    });
    expect(result.statusCode).toEqual(422);
    const payload = JSON.parse(result.payload);
    expect(payload.message[0].property).toEqual('years');
    expect(payload.message[0].constraints.numbers).toEqual(
      'years must be numbers with comma delimiter',
    );
  });

  it('/books/pages?min=400 (GET)', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/books/pages?min=400',
    });
    expect(result.statusCode).toEqual(200);
    const payload = JSON.parse(result.payload);
    expect(payload.length).toEqual(6);
  });

  it('/books/pages?max=100 (GET)', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/books/pages?max=100',
    });
    expect(result.statusCode).toEqual(200);
    const payload = JSON.parse(result.payload);
    expect(payload.length).toEqual(211);
  });

  it('/books/pages?min=90&max=100 (GET)', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/books/pages?min=90&max=100',
    });
    expect(result.statusCode).toEqual(200);
    const payload = JSON.parse(result.payload);
    expect(payload.length).toEqual(9);
  });

  it('/books/pages (GET)', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/books/pages',
    });
    expect(result.statusCode).toEqual(422);
    const payload = JSON.parse(result.payload);
    expect(payload.message).toEqual(`Couldn't find min or max`);
  });

  it('/authors/:id (GET)', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/authors/1',
    });
    expect(result.statusCode).toEqual(200);
    const payload = JSON.parse(result.payload);
    expect(payload.id).toEqual(1);
    expect(payload.name).toEqual('H. G. Wells');
    expect(payload.born).toEqual('1866-09-21 00:00:00');
  });

  it('/authors/wrongpattern (GET)', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/authors/wrongpattern',
    });
    expect(result.statusCode).toEqual(422);
    const payload = JSON.parse(result.payload);
    expect(payload.message[0].property).toEqual('id');
    expect(payload.message[0].constraints.isNumberString).toEqual(
      'id must be a number string',
    );
  });

  afterAll((done) => {
    app.close();
    done();
  });
});
