const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
import async from 'async';

module.exports = (app, partials) => {


// //Get User with ID
// router.get('/:id',(req, res, next) => {
//   User
//       .where({id : req.params.id})
//       .fetch()
//       .then((user)=>{
//         res.json(user)
//       })
// })

//Create a New User
app.post('/newuser', (req, res, next) => {

  console.log(req.body)
  const data = JSON.parse(req.body)
  async.series([
    callback => {
      bcrypt.hash(data.password, 10, function(err, hash) {
        req.locals.hash = hash
        callback()
      })
    },
    callback => {
      if(req.body.username){
        User.forge({
          username : data.username,
          email : data.email,
          password : req.locals.hash,
        })
            .save()
            .then((saved) => {
              res.json({saved})
            })
      }
      else{
        res.status(400).send('Missing Parameters')
      }
    }
  ])


})
}