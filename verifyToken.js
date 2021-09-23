const jwt = require('jsonwebtoken')
const mySecret = process.env['secret_key']

function verify(req,res,next){
    const token = req.headers.token

   if(token){
		 constVerification = jwt.verify(token , mySecret , (err, user)=> {
			 if(err){
         res.status(403).json("token not found")
			 }else{
         req.user = user
			 }
			 next()
		 })
	 } else{
    res.status(401).json({err:"bad auth"})
	 }
}

module.exports = verify
