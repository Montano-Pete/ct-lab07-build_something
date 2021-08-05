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

  it('gets a pie by id via GET', async () => {
    const pie = await Pie.insert({
      type: 'Key Lime',
      wholePie: false,
      slice: true,
      sliceQuantity: 4
    });

    const res = await request(app)
      .get(`/api/v1/pies/${pie.id}`);

    expect(res.body).toEqual(pie);
  });

  it('updates a pie by id via PUT', async () => {
    const pie = await Pie.insert({
      type: 'Key Lime',
      wholePie: false,
      slice: true,
      sliceQuantity: 6 // incorrect amount of slices
    });

    const res = await request(app)
      .put(`/api/v1/pies/${pie.id}`)
      .send({
        sliceQuantity: 4 // correct amount of slices
      });

    expect(res.body).toEqual({
      sliceQuantity: 4,
      ...pie
    });
  });

  it('deletes a pie by id via DELETE', async () => {
    const pie = await Pie.insert({
      type: 'Key Lime',
      wholePie: false,
      slice: true,
      sliceQuantity: 4
    });
    
    const res = await request(app)
      .delete(`/api/v1/pies/${pie.id}`);

    expect(res.body).toEqual({
      message: `You deleted a ${pie.type} pie.`
    });
  });
});
