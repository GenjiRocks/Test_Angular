const express = require('express')
const mysqlPool = require('./db')
const cors = require('cors')

const studentRoutes = require('./routes/stdroutes')

const app = express()   
app.use(cors())
app.use(express.json())

app.use('/student',studentRoutes)

app.listen(3000,async ()=>{
    try{
        await mysqlPool.getConnection()
        console.log('Database connection is successful')
    }catch(err){
        console.log(err)
    }
    console.log('Server is running on port 3000')
})


