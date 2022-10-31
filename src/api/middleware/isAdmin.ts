import {Request,Response,NextFunction} from 'express'
import ErrorHandler from '../../util/error'

const isAdmin = ErrorHandler.asyncHandler(async(req:Request,res:Response,next:NextFunction) => {
    if(req.decoded.isAdmin){
        next()
    }else{
        return res.status(404).json({ success: false, message: "Access Denied" })
    }
})

export = isAdmin