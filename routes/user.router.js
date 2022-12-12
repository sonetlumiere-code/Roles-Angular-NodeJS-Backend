import express from 'express'
import { authJWT } from '../middlewares/jwt/jwtHelper.js'
import { userController } from '../controllers/user.controller.js'

export const userRouter = express.Router()

userRouter.post('/register', userController.register)
userRouter.post('/authenticate', userController.authenticate)
userRouter.get('/user-profile', authJWT.verifyToken, userController.userProfile)
userRouter.put('/update-user', authJWT.verifyToken, userController.updateUser)
