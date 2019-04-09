const User  = require('../Models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

exports.create_user = (req, res, next)=>{
    User.find({Email: req.body.Email})
        .exec()
        .then((user_find)=>{
            if(user_find.length>=1)
            {
                res.status(409).json({
                    Message: "User With That Email already Exists"
                })
            }
    
            else
            {
                bcrypt.hash(req.body.Password, 10, (err, hash)=>{
                    
                    if(err)
                    {
                        res.status(500).json({
                            Error: err
                        })
                    }
    
                    else
                    {
                        const new_user = new User({
                            Email: req.body.Email,
                            Password: hash,
                            Image: req.file.path
                        })
                        new_user.save()
                        .then((user)=>{
                            console.log(user)
                            res.status(201).json({
                                Message: "Successfully Created User Account"
                            });
                        })
                        .catch((error)=>{
                            res.status(500).json({
                                Message: error
                        });
                    });
                }
            });   
        }
    });
}


exports.signin_user = (req, res, next)=>{
    User.find({Email: req.body.Email})
    .exec()
    .then((user_found)=>{
        if(user_found.length<1)
        {
            res.status(401).json({
                Message: "Authentication Failed"
            });
        }

        bcrypt.compare(req.body.Password, user_found[0].Password, (err, response)=>{
            if(err)
            {
                return res.status(401).json({
                    Message: "Invalid Email or Password"
                });
            }

            if(response)
            {
                const token = jwt.sign({
                    Email: user_found[0].Email
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "2h"
                }
                );
                res.status(200).json({
                    Message: "You Have Successfully Logged In",
                    Access_Token: token
                });
            }

        })
    })
    .catch((error)=>{
        res.status(500).json({
            Message: error
        });
    });
}