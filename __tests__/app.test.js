import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Pie from '../lib/models/Pie.js';

describe('pie routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a pie via POST', async () => {
    const pie = { type: 'Strawberry Rhubarb', wholePie: false, slice: true, sliceQuantity: 2 };

    const res = await request(app)
      .post('/api/v1/pies')
      .send(pie);

    expect(res.body).toEqual({
      id: '1',
      ...pie
    });
  });

  it('gets all pies via GET', async () => {
    const cherry = await Pie.insert({
      type: 'Cherry',
      wholePie: true,
      slice: false,
      sliceQuantity: 0
    });
    const pumpkin = await Pie.insert({
      type: 'Pumpkin',
      wholePie: false,
      slice: true,
      sliceQuantity: 1
    });
    const keyLime = await Pie.insert({
      type: 'Key Lime',
      wholePie: false,
      slice: true,
      sliceQuantity: 4
    });

    const res = await request(app).get('/api/v1/pies/');

    expect(res.body).toEqual([cherry, pumpkin, keyLime]);
  });
});
