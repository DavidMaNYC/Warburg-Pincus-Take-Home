const db = require('../models/pg');
const uuid = require('uuid');
require('dotenv').config();

export const createUser = async (req, res, next) => {
  try {
    const { email, given_name, family_name } = req.body.userInfo;
    const checkEmail = await db.query(
      `Select * from users where email='${email}'`,
    );
    if (checkEmail.rows.length > 0) {
      res.locals.createUser = {
        user: checkEmail.rows[0],
        message: 'You have successfully logged in!',
      };
      {
        res.locals.createUser;
      }
    } else {
      await db.query(
        `INSERT INTO users (id,firstName,lastName,email,createdAt) VALUES ('${uuid.v4()}','${given_name}','${family_name}','${email}',CURRENT_TIMESTAMP)`,
      );
      const newUser = await db.query(
        `Select * from users where email='${email}'`,
      );
      res.locals.createUser = {
        user: newUser.rows[0],
        message: 'You have successfully registered!',
      };
    }
  } catch (e) {
    res.locals.createUser = { user: null, message: 'Error creating user.' };
    console.error(e);
  }
  next();
};

export const updateUser = async (req, res, next) => {
  try {
    const { email, firstname, lastname, id } = req.body.userInfo;
    const updatedInfo = await db.query(
      `UPDATE users SET email='${email}', firstName='${firstname}', lastName='${lastname}' WHERE id='${id}'
        RETURNING *`,
    );
    res.locals.updateUser = {
      user: updatedInfo.rows[0],
      message: 'You have updated your info.',
    };
  } catch (e) {
    res.locals.updateUser = { user: null, message: 'Error updating user.' };
    console.error(e);
  }
  next();
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.query(`Delete from users WHERE id='${id}'`);
    res.locals.deleteUser = {
      user: null,
      message: 'You have deleted your account.',
    };
  } catch (e) {
    res.locals.deleteUser = { user: null, message: 'Error deleting user.' };
    console.error(e);
  }
  next();
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await db.query(
      `Select id,email,firstname,lastname from users`,
    );
    res.locals.getUsers = {
      users: users,
      message: 'You have retrieved users.',
    };
  } catch (e) {
    res.locals.getUsers = { user: [], message: 'Error retrieving users.' };
    console.error(e);
  }
  next();
};
