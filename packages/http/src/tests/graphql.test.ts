import request from 'supertest';
import App from '../app';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Index', () => {
  describe('[GET] /', () => {
    it('when not configure apollo', () => {
      const app = new App([]);

      return request(app.getServer()).get(`/graphql`).expect(404);
    });
  });
});
