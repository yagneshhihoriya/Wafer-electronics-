import OtpVerificationModel from '../../models/otpVerification'
import AdminModel from '../../models/admin'
import CustomerModel from '../../models/customer'
import Bcrypt from '../../util/bcrypt'
import MailSender from '../../util/mail/nodemailer'
import {Request,Response,NextFunction} from 'express'
import ErrorHandler from '../../util/error'

const SendMail =ErrorHandler.asyncHandler(async (req:Request,res:Response,next:NextFunction) => {
    const {email,phone,isAdmin} = req.body
    SendOTPMail(email,phone)
       .then(()=>{
            return res.status(200).json({success:true,message:"Please verify OTP Sended"})
       })
       .catch(ex=>{
            return res.status(404).json({success:false,message:"Error While Sending Email",err:ex.message})
       })
})

const VerifyMail =ErrorHandler.asyncHandler(async (req:Request,res:Response,next:NextFunction) => {
    const {email,phone,otp,isAdmin} = req.body
    VerifyOTPMail(email,phone,otp,isAdmin)
    .then((result)=>{
        return res.status(200).json({success:true,message:'Verification Successfull'})
    })
    .catch((ex)=>{
        return res.status(404).json({success:false,message:"Error While verifing OTP",err:ex.message})
    })
})

const SendOTPMail = async(email:string,phone:number) =>{
    const otp = Math.floor((Math.random() * 10000) + 1);
    const otpHash = await Bcrypt.GenerateHash(otp.toString())
    MailSender(email,otp)
    .then(async ()=>{
        const otpSaveInDb = await OtpVerificationModel.query().insert({
            phone,
            email,
            otp:otpHash
        })
        if(otpSaveInDb){
            return true
        }
        throw new Error(`Error while Storing OTP Data`)
    })
    .catch(ex=>{
        throw new Error(`Error while Sending Mail \n ${ex.message} \n ${ex}`)
    })
}

const VerifyOTPMail =async (email:string,phone:number,otp:any,isAdmin?:boolean) => {
    const OtpData = await OtpVerificationModel.query().where('otpVerification.email','=',email).where('otpVerification.phone','=',phone)
    let personData 
    if(isAdmin){
        personData = await AdminModel.query().where('admin.email','=',email).where('admin.phone','=',phone)
    }else{
        personData = await CustomerModel.query().where('customers.email','=',email).where('customers.phone','=',phone)
    }
    if(OtpData && OtpData.length && personData && personData.length){
        const firstOtpData = JSON.parse(JSON.stringify(OtpData[0].toJSON()))
        if(await Bcrypt.CompareHash(otp.toString(),firstOtpData.otp)){
            if(isAdmin){
                personData = await AdminModel.query().where('admin.email','=',email).where('admin.phone','=',phone).patch({isVerified:true})
            }else{
                personData = await CustomerModel.query().where('customers.email','=',email).where('customers.phone','=',phone).patch({isVerified:true})
            }
            await OtpVerificationModel.query().delete().where('otpVerification.email','=',email).where('otpVerification.phone','=',phone)
            return personData
        }
        throw new Error('OTP Verification Failed')
    }
    throw new Error('OTP Verification Failed')
}
export = {SendOTPMail,SendMail,VerifyOTPMail,VerifyMail}