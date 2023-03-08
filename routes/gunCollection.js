import express from 'express';

import { getUsers, createUser,activeUsers ,noactiveUsers, getUser, deleteUser, updateUser } from '../controllers/gunCollection/gunCollection.js';

const router = express.Router();

router.get('/showall', getUsers);

router.get('/active', activeUsers);

router.get('/noactive', noactiveUsers);

router.post('/', createUser);

router.get('/:id', getUser);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

export default router;