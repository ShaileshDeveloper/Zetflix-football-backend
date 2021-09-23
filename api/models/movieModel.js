const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true,
  },
  videoUrl:{
    type:String,
    required:true,
  },
  img:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true
  },
	isSeries:{
		type:Boolean,
    default:false
	},
	isLiked:{
		type:Boolean,
		default:false
	}
})

const movieModel = mongoose.model('Movie' , movieSchema)
module.exports = {movieModel}