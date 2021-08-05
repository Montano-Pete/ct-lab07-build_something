import { Router } from 'express';
import Pie from '../models/Pie';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const pie = {
        id: '1',
        type: 'Strawberry Rhubarb',
        wholePie: false,
        slice: true,
        sliceQuantity: 2,
      };

      res.send(pie);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {})

  .get('/:id', async (req, res, next) => {})

  .put('/:id', async (req, res, next) => {})

  .delete('/:id', async (req, res, next) => {});
