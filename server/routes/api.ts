import express from 'express';

import {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
} from '../controllers/users';

const router = express.Router();

router.get('/', getUsers, (req, res) => res.json(res.locals.getUsers));
router.post('/createUser', createUser, (req, res) =>
  res.json(res.locals.createUser),
);
router.patch('/updateUser', updateUser, (req, res) =>
  res.json(res.locals.updateUser),
);
router.delete('/deleteUser/:id', deleteUser, (req, res) =>
  res.json(res.locals.deleteUser),
);
module.exports = router;
