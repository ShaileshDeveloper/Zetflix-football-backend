const router = require('express').Router();
const {listModel} = require('../models/listModel')

		router.post('/' , async(req,res) =>{
			const {title , type, genre , content} = req.body
				try{
						const newList = await listModel.create({
								title , type ,genre , content
							})
				res.json({body:newList})
							}catch(err){
					res.json({err:err.message})
							}
						})

		router.delete('/', async(req,res) =>{
				try{
					await listModel.findByIdAndDelete(req.params.id)
			    	res.json({message:"succesfully deleted"})
							}catch(err){
					  res.json({err:err.message})
					}
				})
				
		router.get('/', async(req,res) =>{
			const typeQuery = req.query.type
			if(typeQuery==='series'){
				try{
          	const randomlist = await listModel.aggregate([
						  {$match:{type:typeQuery}},
							{$sample:{size:10}},
				])
				res.json({body:randomlist})
				}catch(err){
					res.json({err:err.message})
				}
			}else if(typeQuery==='movie'){
        try{
					 const randomlist = await listModel.aggregate([
						 {$match:{type:typeQuery}},
						 {$sample:{size:10}}
					 ])
			    	res.json({body:randomlist})
				}catch(err){
					  res.json({err:err.message})
					}
			}

				
				})
module.exports = router