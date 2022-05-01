const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middlewares/error') 
const cors = require('cors')

const PORT = process.env.PORT || 5000

const connectDB = require('./config/db')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(errorHandler)

app.use('/users',require('./routes/UserRoutes'))
app.use('/jobs',require('./routes/JobRoutes'))


connectDB()

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
      )
    )
  } else {
    app.get('/', (req, res) => res.send('Please set to production'))
  }


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))