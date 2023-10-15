/* eslint-disable prefer-const */
import { NextFunction, Request, Response } from 'express'
import bcryptjs from 'bcryptjs'
import mongoose from 'mongoose'
import User from '~/models/user'
import util from 'util'
import signJWT from '~/functions/signsJWT'

export const register = async (req: Request, res: Response, _next: NextFunction) => {
  let { name, email, password, age, address, permisObtenues } = req.body
  bcryptjs.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: 'Internal server error'
      })
    }
    password = hash
    const _user = new User({
      id: new mongoose.Types.ObjectId(),
      name,
      email,
      password,
      age,
      role: false,
      address,
      permisObtenues
    })
    return _user
      .save()
      .then((user) => {
        res.status(201).json({
          message: `User created ${user}`,
          user
        })
      })
      .catch((_err) => {
        res.status(500).json({
          error: 'Internal server error',
          message: 'Error while creating user you need to fill all the fields'
        })
      })
  })
}

const signJWTAsync = util.promisify(signJWT)

export const login = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const { email, password } = req.body
    const users = await User.find({ email }).exec()

    if (users.length !== 1) {
      throw new Error('Unauthorized')
    }

    const isPasswordValid = await bcryptjs.compare(password, users[0].password)

    if (!isPasswordValid) {
      throw new Error('Password Mismatch')
    }

    const token = await signJWTAsync(users[0])

    res.status(200).header('Authorization', `Bearer ${token}`).json({
      message: 'Auth successful',
      token: token,
      user: users[0]
    })
  } catch (error) {
    console.error(error)
    res.status(401).json({
      message: error || 'Authentication failed'
    })
  }
}

export const getAllUsers = async (_req: Request, res: Response, _next: NextFunction) => {
  await User.find()
    .select('_id name email password age role address permisObtenues')
    .exec()
    .then((users) => {
      return res.status(200).json({
        users,
        message: `${users.length} users find`
      })
    })
}

export const getUser = async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params
  await User.findById(id)
    .select('_id name email password age role address permisObtenues')
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: 'User not found',
          error: '404'
        })
      }
      return res.status(200).json({
        user,
        message: `User ${user.name} find`
      })
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
        message: 'You need to fill all the fields'
      })
    })
}

export const updateUser = async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params
  const { name, email, password, age, role, adress, permisObtenues } = req.body
  await User.findByIdAndUpdate(id, { name, email, password, age, role, adress, permisObtenues }, { new: true })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: 'User not found'
        })
      }
      return res.status(200).json({
        user,
        message: `User ${user.name} updated`
      })
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
        message: 'You need to fill all the fields'
      })
    })
}

export const deleteUser = async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params
  await User.findByIdAndRemove(id)
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: 'User not found',
          error: '404'
        })
      }
      return res.status(204).json({
        message: `User ${user.name} deleted`,
        user
      })
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
        message: 'You need to fill all the fields'
      })
    })
}
