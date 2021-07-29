import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a pie via POST', () => {
    const pie = { type: 'Strawberry Rhubarb', wholePie: false, slice: true, sliceQuantity: 2 };

    const res = request(app)
      .post('/api/v1/pies')
      .send(pie);

    expect(res.body).toEqual({
      id: '1',
      ...pie
  });


});
