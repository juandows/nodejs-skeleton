var express = require('express');
const authMiddleware = require('../middlewares/auth')
const jwt = require('jsonwebtoken')
var router = express.Router();

// define api route
router.get('/', function(req, res) {
  console.log('Request URL:', req.originalUrl);
  //console.log('APP:', req.params.app);
  //console.log('BOX:', req.params.box);
  //console.log('PARAMS:', req.params);

  //crear token
  /*const secret = req.app.get('jwt-secret')
  const p = new Promise((resolve, reject) => {
                    jwt.sign(
                        {
                            _id: "user._id",
                            username: "user.username",
                            admin: "user.admin"
                        },
                        secret,
                        {
                            expiresIn: '7d',
                            issuer: 'redyser.com',
                            subject: 'userInfo'
                        }, (err, token) => {
                            if (err) reject(err)
                            resolve(token)
                        })
                })
  p.then((token) => {res.send('Api.'+token)})*/

  res.send('Api v1.0.')
});


//router.use('/applications', authMiddleware)
//router.use('/applications', require('./applications'));
//router.use('/groups', require('./groups'));

// Routes
//app.use('/api/applications/:app/boxes/:box/messages', require('./routes/messages'));

module.exports = router;
