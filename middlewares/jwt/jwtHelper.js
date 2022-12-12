import jwt from 'jsonwebtoken'
import User from '../../models/user.model.js'
import Role from '../../models/role.model.js'

export const authJWT = {
  verifyToken: (req, res, next) => {
    let token
    if ('authorization' in req.headers) {
      token = req.headers.authorization.split(' ')[1]
    }
    if (!token) {
      return res.status(403).send({ auth: false, message: 'No token provided' })
    } else {
      jwt.verify(token, process.env.JWT_SECRET,
        (err, decoded) => {
          if (err) {
            return res.status(500).send({ auth: false, message: 'Token authentication failed.' })
          } else {
            req._id = decoded._id
            next()
          }
        }
      )
    }
  }
}

export const roleJWT = {
  isAdmin: async (req, res, next) => {
    const user = await User.findById(req._id)
    const roles = await Role.find({ _id: { $in: user.roles } })
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'admin') {
        next()
        return
      }
    }
    return res.status(403).send({ auth: false, message: 'Admin role required' })
  },
  isModerator: async (req, res, next) => {
    const user = await User.findById(req._id)
    const roles = await Role.find({ _id: { $in: user.roles } })
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'moderator') {
        next()
        return
      }
    }
    return res.status(403).send({ auth: false, message: 'Moderator role required' })
  },
  isGold: async (req, res, next) => {
    const user = await User.findById(req._id)
    const roles = await Role.find({ _id: { $in: user.roles } })
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'gold') {
        next()
        return
      }
    }
    return res.status(403).send({ auth: false, message: 'Gold role required' })
  },
  isSilver: async (req, res, next) => {
    const user = await User.findById(req._id)
    const roles = await Role.find({ _id: { $in: user.roles } })
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'silver') {
        next()
        return
      }
    }
    return res.status(403).send({ auth: false, message: 'Silver role required' })
  },
  isBronze: async (req, res, next) => {
    const user = await User.findById(req._id)
    const roles = await Role.find({ _id: { $in: user.roles } })
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'bronze') {
        next()
        return
      }
    }
    return res.status(403).send({ auth: false, message: 'Bronze role required' })
  },
  isStudent: async (req, res, next) => {
    const user = await User.findById(req._id)
    const roles = await Role.find({ _id: { $in: user.roles } })
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'student') {
        next()
        return
      }
    }
    return res.status(403).send({ auth: false, message: 'Student role required' })
  },
  isFree: async (req, res, next) => {
    const user = await User.findById(req._id)
    const roles = await Role.find({ _id: { $in: user.roles } })
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'free') {
        next()
        return
      }
    }
    return res.status(403).send({ auth: false, message: 'Free role required' })
  }
}
