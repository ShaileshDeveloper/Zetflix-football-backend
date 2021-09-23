const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true,
    unique:true,
  },
  type:{
    type:String,
    required:true,
  },
  genre:{
    type:String,
    required:true,
  },
  content:{
    type:Array,
    required:true
  }
})

const listModel = mongoose.model('List' , listSchema)
module.exports = {listModel}