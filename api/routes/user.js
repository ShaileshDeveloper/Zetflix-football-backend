const router = require('express').Router();
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken')
const {userModel} = require('../models/userModel')
const verify = require('../../verifyToken')
const mySecret = process.env['secret_key']


router.post('/:id' ,verify ,async(req,res) =>{
	if(req.params.id === req.user.id){
     if(req.body.password){
			 req.body.password = CryptoJS.AES.encrypt(req.body.password, mySecret).toString()
		 }
		 try{
			 const updatedUser = await userModel.findByIdAndUpdate(req.params.id,{
				 $set: req.body,
			 },{new:true});
			 res.status(200).json({message:"succesful" , body: updatedUser})
		 }catch(err){
			 res.status(403).json({error:err.message})
			 console.log(err)
		 }
	}
})
router.delete('/:id' ,verify ,async(req,res) =>{
	if(req.params.id === req.user.id){
		 try{
			 await userModel.findByIdAndDelete(req.params.id);
			 res.status(200).json({message:"succesfully deleted"})
		 }catch(err){
			 res.status(403).json({error:err.message})
			 console.log(err)
		 }}
})
router.get('/:id',async(req,res) =>{
	if(req.params.id){
		 try{
			 const user = await userModel.find({_id: req.params.id})
			 res.status(200).json({message:"succesful" , body: user})
		 }catch(err){
			 res.status(403).json({error:err.message})
			 console.log(err)
		 }
	}
})



module.exports = router
