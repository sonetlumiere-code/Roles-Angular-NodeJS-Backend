import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import Roles from './role.model'
const { Schema } = mongoose
dotenv.config()

const userSchema = Schema({
  username: {
    type: String,
    required: 'Debes ingresar tu nombre de usuario',
    unique: true,
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    required: 'Debes ingresar un Email',
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: 'Debes ingresar una contraseña',
    minlength: [4, 'La contraseña debe tener al menos 4 caracteres']
  },
  roles: [{
    ref: 'Role',
    type: Schema.Types.ObjectId
  }],
  saltSecret: {
    type: String
  },
  account: {
    paymentDate: {
      type: Date,
      default: null
    },
    plan: {
      type: String,
      default: 'free'
    }
  }
},
{
  timestamps: true,
  versionKey: false
})

userSchema.path('username').validate((val) => {
  const domainRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9_-]*[a-zA-Z0-9])?$/
  return domainRegex.test(val)
}, 'Nombre de usuario no valido.')

userSchema.path('email').validate((val) => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailRegex.test(val)
}, 'Email no válido.')

userSchema.pre('save', function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.log('pre-save bcrypt getSalt userSchema error: ' + err)
    }
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) {
        console.log('pre-save bcrypt hash userSchema error: ' + err)
      }
      this.password = hash
      this.saltSecret = salt
      next()
    })
  })
})

userSchema.pre('save', function (next) {
  if (!this.roles.length) {
    Roles.findOne({ name: 'gold' }, (err, role) => {
      if (err) {
        console.log('pre-save role userSchema error: ' + err)
      }
      if (role) {
        this.roles.push(role)
      }
      next()
    })
  } else {
    next()
  }
})

userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.methods.generateJwt = function () {
  return jwt.sign(
    {
      _id: this._id,
      roles: this.roles,
      db: process.env.DB_NAME
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXP
    }
  )
}

export default mongoose.model('User', userSchema)
