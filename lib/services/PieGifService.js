
import Pie from '../models/Pie';
import getGif from '../utils/giphy-function.js';


export default class PieGifService {
  static async freshlyBaked({ type, wholePie, slice, sliceQuantity }) {
    const gif =  await getGif();
    const pie = await Pie.insert({ type, wholePie, slice, sliceQuantity, gif });
    return pie;
  }
}
