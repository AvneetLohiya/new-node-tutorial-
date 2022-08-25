const User =require('../models/User')
const bcrypt = require('bcryptjs')
const jwt =require('jsonwebtoken')

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        if(err) {
            res.json({
                error: err
            })
        }

        let user = new User ({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            passwoord: hashedPass
        })
        user.save()
        .then(user => {
            res.json({
                message: 'User Added Successfully!'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occured!'
            })
        })
    })

}

const login = async(req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    console.log("req",req.body)

    User.findOne({$or: [{email:username},{phone:username}]})
    .then(async(user) => {
        console.log("User",user)
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
            console.log("errr",err,password)
            console.log("password",password,user.password)
                if(err) {
                    return  res.json({
                        error1: err
                    })
                }
                if(result){
                    let token = jwt.sign({name: user.name}, 'verySecretValue', {expiresIn: '1h'})
                    return   res.json({
                        message: 'Login Successful!',
                        // token
                    })
                }else{
                    return   res.json({
                        message: 'Password does not matched!'
                    })
                }
            })

        }
        else{
           return res.json({
                message: 'No user found!'
            })
        }
    })
}

module.exports = {
    register, login
}