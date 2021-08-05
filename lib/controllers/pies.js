import { Router } from 'express';
import Pie from '../models/Pie';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const pie = await Pie.insert(req.body);

      res.send(pie);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const pie = [
        {
          id: '1',
          slice: false,
          sliceQuantity: 0,
          type: 'Cherry',
          wholePie: true,
        },
        {
          id: '2',
          slice: true,
          sliceQuantity: 1,
          type: 'Pumpkin',
          wholePie: false,
        },
        {
          id: '3',
          slice: true,
          sliceQuantity: 4,
          type: 'Key Lime',
          wholePie: false,
        },
      ];

      res.send(pie);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {})
  .put('/:id', async (req, res, next) => {})
  .delete('/:id', async (req, res, next) => {});
