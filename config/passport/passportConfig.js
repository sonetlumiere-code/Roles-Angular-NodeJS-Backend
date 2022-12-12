import { Strategy as LocalStrategy } from 'passport-local'
import User from '../../models/user.model.js'

export const passportConfig = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' },
      (username, password, done) => {
        const criteria = (username.indexOf('@') === -1) ? { username: username.toLowerCase() } : { email: username.toLowerCase() }
        User.findOne(criteria,
          (err, user) => {
            if (err) {
              return done(err)
            } else if (!user) {
              return done(null, false, { message: 'Email o Usuario no registrados' })
            } else if (!user.verifyPassword(password)) {
              return done(null, false, { message: 'Contraseña incorrecta' })
            } else {
              return done(null, user)
            }
          }
        )
      }
    )
  )
}
