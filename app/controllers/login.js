'use strict'

const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = function(req, res, next) {
    console.log(req.body)
    User.findOne(req.body, (err, user) => {
        if(err) {
            return console.error(err)
        }else {
            if(!user){
                req.flash('err', '账号错误')
                res.redirect('/login')
            }else {
                req.flash('success', '登入成功')
                return res.redirect('/')
            }

        }

    })
}
