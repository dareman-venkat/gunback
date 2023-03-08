import express from 'express';

import { getUsers, login,createUser, getUser, deleteUser, updateUser } from '../controllers/Rentaladmin/Rentaladmin.js';

const router = express.Router();

router.get('/', getUsers);

router.post('/', createUser);

router.post('/login', login);

router.get('/:id', getUser);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

export default router;