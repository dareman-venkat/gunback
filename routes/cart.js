import express from 'express';

import { getcarts,pushCart, getCart, deletecart, updatecart } from '../controllers/cart/cart.js';

const router = express.Router();

router.get('/', getcarts);

router.post('/', pushCart);

router.get('/:id', getCart);

router.delete('/:id', deletecart);

router.put('/:id', updatecart);

export default router;