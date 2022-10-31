import ErrorHandler from '../../util/error'
import ProfileModel from '../../models/profile'
import {Request,Response,NextFunction} from 'express'


const addProfile = ErrorHandler.asyncHandler(async (req:Request,res:Response,next:NextFunction) => {
    const {email,phone} = req.decoded
    const data = await ProfileModel.query().update({filename:req.file?.filename}).where('email','=',email).where('phone','=',phone)
    if(!data){
        const addProfile = await ProfileModel.query().insert({
            email,phone,
            filename:req.file?.filename
        })
        if(addProfile){
            return res.status(200).json({success:true,message:"Profile Added",data:addProfile})
        }
        return res.status(404).json({success:false,message:"Error While Adding Profile"})
    }
    return res.status(200).json({success:true,message:"Profile Updated"})
})

const getProfile = ErrorHandler.asyncHandler(async (req:Request,res:Response,next:NextFunction) => {
    const {email,phone} = req.decoded
    const data = await ProfileModel.query().where('email','=',email).where('phone','=',phone)
    if(data && data.length){
        const profileData = JSON.parse(JSON.stringify(data[0].toJSON()))
        return res.status(200).json({success:true,url:`${req.headers.host}/images/${profileData.filename}`,data:addProfile})
    }
    return res.status(404).json({success:false,message:"Profile Not Found"})
})

export = {addProfile,getProfile}