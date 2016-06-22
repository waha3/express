'use strict'

const mongoose = require('mongoose')
const crypto = require('crypto')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        unique: true,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    repeat_password: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    mobile: {
        type: Number,
        default: null
    },
    meta: {
        createAt: {
            type: String,
            default: Date.now
        },
        updateAt: {
            type: String,
            default: Date.now
        }
    }
})


UserSchema.pre('save', function (next) {
    var self = this
    this.password = crypto.createHash('sha1').update(this.password).digest('hex')
    this.repeat_password = crypto.createHash('sha1').update(this.repeat_password).digest('hex')
    next()
})

UserSchema.static = {
    comparePassword: function () {
        
    }
}

const User = mongoose.model('User', UserSchema)

module.exports = User
