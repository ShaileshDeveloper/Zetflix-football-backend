const router = require('express').Router();
const { userModel } = require('../models/userModel')
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken')
const verify =require('../../verifyToken')


const mySecret = process.env['secret_key']
router.post('/register', async (req, res) => {
  const newUser = new userModel({
    password: CryptoJS.AES.encrypt(req.body.password, mySecret).toString(),
    email: req.body.email,
  })
  try {
    await newUser.save();
    res.json({ message: "succesful", body: newUser })
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
});

router.post('/login', async (req, res) => {
  try {
    const loginUser = await userModel.findOne({
      email: req.body.email
    })
    !loginUser && res.json({message: "wrong username" })
    
    const decryptedPassword  = CryptoJS.AES.decrypt(loginUser.password, mySecret);
    const originalPassword = decryptedPassword.toString(CryptoJS.enc.Utf8);
     console.log(originalPassword)


  const accessToken = jwt.sign({id: loginUser._id} ,mySecret,{expiresIn:"5d"})
    const {password , ...info} = loginUser._doc

    res.json({ body:{...info , accessToken}, message: "succesful" })
  } catch (err) {
    console.log('error', err.message)
    res.json({ error: err.message })
  }
})

module.exports = router