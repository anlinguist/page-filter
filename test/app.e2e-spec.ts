import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Logger } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should accept a payload under 1MB', async () => {
    const smallHtml = 'A'.repeat(1024);

    const response = await request(app.getHttpServer())
      .post('/filterDoc')
      .set('Content-Type', 'application/json')
      .send({ html: smallHtml, filter: 'test' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('searchResults');
  });

  it('should reject a payload over 1MB', async () => {
    const largeHtml = 'A'.repeat(1024 * 1024 + 1);

    const response = await request(app.getHttpServer())
      .post('/filterDoc')
      .set('Content-Type', 'application/json')
      .send({ html: largeHtml, filter: 'test' });

    expect(response.status).toBe(413);
    expect(response.body.message).toBe('request entity too large');
  });

  it('should reject a payload without html', async () => {
    const response = await request(app.getHttpServer())
      .post('/filterDoc')
      .set('Content-Type', 'application/json')
      .send({ filter: 'test' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid HTML payload');
  });

  it('should reject a payload without filter', async () => {
    const response = await request(app.getHttpServer())
      .post('/filterDoc')
      .set('Content-Type', 'application/json')
      .send({ html: 'test' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid search filter');
  });

  it('should reject a payload with invalid html', async () => {
    const response = await request(app.getHttpServer())
      .post('/filterDoc')
      .set('Content-Type', 'application/json')
      .send({ html: 123, filter: 'test' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid HTML payload');
  });

  it('should reject a payload with invalid filter', async () => {
    const response = await request(app.getHttpServer())
      .post('/filterDoc')
      .set('Content-Type', 'application/json')
      .send({ html: 'test', filter: 123 });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid search filter');
  });
});