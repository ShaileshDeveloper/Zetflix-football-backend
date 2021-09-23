const express = require('express');
const {dbConnection} = require('./dbconnection')
const app = express();
const authRouter = require('./api/routes/auth')
const userRouter = require('./api/routes/user')
const movieRouter = require('./api/routes/movie')
const listRouter = require('./api/routes/list')
const {listModel} = require('./api/models/listModel')
const {movieModel} = require('./api/models/movieModel')
const mongoose = require('mongoose')
const cors = require('cors')
const movieData = require('./moviesdata')
const listData = require('./listsData')
app.use(express.json())


dbConnection()
movieModel.insertMany(movieData)
// listModel.insertMany(listData)

app.use(cors())
app.use('/api' , authRouter)
app.use('/api/movies' , movieRouter)
app.use('/api/users' , userRouter)
app.use('/api/lists' , listRouter)

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});