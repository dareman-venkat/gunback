import express from 'express';

import { getUsers, createUser, getUser,curDate,prevDate,getUseraggre, deleteUser, updateUser } from '../controllers/PaymentDetails/PaymentDetails.js';

const router = express.Router();

router.get('/', getUsers);

router.get('/curDate', curDate);

router.get('/prevDate', prevDate);

router.post('/', createUser);

router.get('/:id', getUser);

router.get('/getcus/:id', getUseraggre);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

export default router;