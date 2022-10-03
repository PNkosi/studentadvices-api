require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const port = process.env.PORT || 3000

const app = express()

const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:5500']

app.set('view engine', 'ejs')
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cors())

// Connecting to the database
mongoose.connect(process.env.DB_URI_STRING)
const dbconn = mongoose.connection
dbconn.on('error', (error) => console.error(error))
dbconn.once('open', () => console.log('Connected to database'))

// routers
const searchAdviceRouter = require('./routes/searchAdvices')
const adviceRouter = require('./routes/advices')
app.use('/advice/search', searchAdviceRouter)
app.use('/advice', adviceRouter)

// Rendering views
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/api', (req, res) => {
  res.render('api')
})

app.get('/playground', (req, res) => {
  res.render('playground')
})

app.get('/shareAdvice', (req, res) => {
  res.render('shareAdvice')
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
