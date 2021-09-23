const router = require('express').Router();
const {movieModel} = require('../models/movieModel')


router.post('/' , async(req,res) =>{
	const {title , description,img , videoUrl,isSeries,isLiked} = req.body
	const newMovie = await movieModel.create({
		title , description ,img ,videoUrl, isSeries,isLiked
	})
	res.json({body:newMovie})
})


router.put('/like/:id' , async(req,res) =>{
	const id = req.params.id;
	const likedMovie = await movieModel.findByIdAndUpdate(id , {isLiked:true},{new:true})

	res.json({body:likedMovie})
})


router.put("/dislike/:id" , async(req,res) =>{
	const id = req.params.id;
	const dislikeMovie = await movieModel.findByIdAndUpdate(id , {isLiked:false},{new:true})

	res.json({body:dislikeMovie})
})


router.get('/find/:id', async(req,res)=>{
	try{
     	const singleMovie = await movieModel.findById(req.params.id) 
	console.log("shailesh")
  res.status(200).json(singleMovie)
	}catch(err){
		console.log(err)
	}

})

// router.post('/mylist',async(req,res) => {
// 	try{
// 			const {title , description,img , videoUrl,isSeries , isLiked} = req.body
// 	const newMovie = await movieModel.create({
// 		title , description ,img ,videoUrl, isSeries,isLiked
// 	})
// 	res.json({body:newMovie})
// 	}catch(err){
// 		res.json(err)
// 	}
// })
router.get('/mylist', async(req,res) =>{
	
    const movie = await movieModel.aggregate([
			 {$match: {isLiked:true}},
		 ])
		 res.json(movie)
})

module.exports = router