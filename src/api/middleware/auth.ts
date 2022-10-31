import {Request,Response,NextFunction} from 'express'
import ErrorHandler from '../../util/error'
import JWT from '../../util/jwt'

const Auth = ErrorHandler.asyncHandler(async(req:Request,res:Response,next:NextFunction) => {
    if(req?.headers?.authorization){
        const token = req.headers.authorization.split(' ')[1]
        const decoded = JWT.verifyToken(token)
        if(decoded){
            req.decoded = decoded
            req.isAdmin = (typeof req.isAdmin != undefined && req.isAdmin) ? req.isAdmin : ''
            next()
        }else{
            return res.status(404).json({ success: false, message: "Token Verification Failed" })
        }
    }else{
        return res.status(404).json({ success: false, message: "Token Verification Failed" })
    }
})

export = Auth