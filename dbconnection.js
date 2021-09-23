const mongoose = require('mongoose')

async function dbConnection(){
  try{
      await  mongoose.connect('mongodb+srv://shailesh:Ycombinator%401256@cluster0.hr305.mongodb.net/Netflix',
       {
         useNewUrlParser: true , 
         useUnifiedTopology: true,
        }
    );

    console.log("connection succesful")
  }catch(err){
     console.log(err)
  }
}

module.exports ={dbConnection}