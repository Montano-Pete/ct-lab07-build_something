import { Router } from 'express';
import Pie from '../models/Pie';
import PieGifService from '../services/PieGifService';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const pie = await PieGifService.freshlyBaked(req.body);

      res.send(pie);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const pie = await Pie.getAll();

      res.send(pie);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const pie = await Pie.getById(id);

      res.send(pie);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { type, wholePie, slice, sliceQuantity, gif } = req.body;

      const pie = await Pie.getById(id, { type, wholePie, slice, sliceQuantity, gif });

      res.send(pie);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedPie = await Pie.deleteById(id);

      res.send({
        message: `You deleted a ${deletedPie.type} pie.` });
    } catch (err) {
      next(err);
    }
  });
