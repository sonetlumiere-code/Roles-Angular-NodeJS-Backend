import passport from 'passport'
import _ from 'lodash'
import User from '../models/user.model.js'

export const userController = {

  register: (req, res, next) => {
    const user = new User()
    user.username = req.body.username
    user.email = req.body.email
    user.password = req.body.password
    user.save((err, doc) => {
      if (!err) {
        // send welcome email
        res.send(doc)
      } else {
        if (err.code == 11000) {
          res.status(422).send(['El Email o el nombre de usuario ya se encuentra registrado'])
        } else {
          return next(err)
        }
      }
    })
  },

  authenticate: (req, res) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) return res.status(400).json(err)
      else if (user) return res.status(200).json({ token: user.generateJwt() })
      else return res.status(404).json(info)
    })(req, res)
  },

  userProfile: (req, res) => {
    User.findOne({ _id: req._id },
      (err, user) => {
        if (err) return res.status(404).json({ status: false, message: 'User record not found.' })
        if (!user) return res.status(404).json({ status: false, message: 'User record not found.' })
        else return res.status(200).json({ status: true, user: _.pick(user, ['_id', 'email', 'username', 'roles']) })
      }
    )
  },

  updateUser: (req, res) => {
    const userId = req._id
    User.findById(userId, (err, res) => {
      if (err) return res.status(500).send({ message: 'Error al buscar usuario' })
    })
    const update = req.body
    User.findByIdAndUpdate(userId, update, { new: true }, (err, userUpdated) => {
      if (err) return res.status(500).send({ message: 'Error al actualizar' })
      if (!userUpdated) return res.status(404).send({ message: 'No existe el usuario' })
      return res.status(200).send({ user: _.pick(userUpdated, ['_id', 'email', 'username']) })
    })
  }

}
