import express,{Request,Response,NextFunction,ErrorRequestHandler} from 'express'
import * as dotenv from 'dotenv' 
dotenv.config()
import morgan from 'morgan'
import Router from './api/routes/index'
import dbCon from './util/db/database'
import path from 'path'

const server = express()
const PORT = process.env.PORT || 3000

dbCon()
server.use(express.static(path.join(__dirname, 'public')))
server.use(express.json())
server.use(morgan('dev'))
server.use('/api',Router)

server.use('*',(_,res)=>{
    return res.status(404).json({success:false,message:'Route Not Exist'})
})

server.use((err:any,_:Request,res:Response,next:NextFunction)=>{
    return res.status(500).json({success:false,message:'Internal Server Error',error:err})
})

server.listen(PORT,()=>{
    console.log(`Server Listening at ${PORT}`)
})