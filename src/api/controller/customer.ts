import { Request, Response, NextFunction } from 'express'
import CustomerModel from '../../models/customer'
import MailController from './mail'
import ErrorHandler from '../../util/error'
import Bcrypt from '../../util/bcrypt'
import JWT from '../../util/jwt'

const getAllCustomer = ErrorHandler.asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const data = await CustomerModel.query()
    if (data && data.length) return res.status(200).json({ success: true, data })
    return res.status(404).json({ success: false, message: "Data not Found" })
}
)

const getCustomerById = ErrorHandler.asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const data = await CustomerModel.query().findById(id)
    if (data) return res.status(200).json({ success: true, data })
    return res.status(404).json({ success: false, message: "Data not Found" })
})

const addCustomer = ErrorHandler.asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { phone, email, firstName, lastName ,password } = req.body
    const hashPassword = await Bcrypt.GenerateHash(password)
    const data = await CustomerModel.query().insert({
        firstName,
        lastName,
        email,
        password:hashPassword,
        isVerified: false,
        phone
    })
    if (data) {
        MailController.SendOTPMail(email, phone)
            .then(() => {
                return res.status(200).json({ success: true, message: "Data Inserted and Please verify OTP Sended", data })
            })
            .catch(ex => {
                return res.status(404).json({ success: false, message: "Error While Sending Email", err: ex.message })
            })
    } else {
        return res.status(404).json({ success: false, message: "Error While Inserting Data" })
    }
})

const updateCustomer = ErrorHandler.asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.decoded
    const { address, age, gender, workExperience, presentCompany, currentCTC, employmentStatus, availableToHire, availableToFreelance } = req.body
    const data = await CustomerModel.query()
        .updateAndFetchById(id, { address, age, gender, workExperience, presentCompany, currentCTC, employmentStatus, availableToHire, availableToFreelance })
    if (data) return res.status(200).json({ success: true, message: "Data Updated", data })
    return res.status(404).json({ success: false, message: "Error While Updating Data" })
})

const deleteCustomer = ErrorHandler.asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const data = await CustomerModel.query().deleteById(id)
    if (data) return res.status(200).json({ success: true, message: "Data Deleted", data })
    return res.status(404).json({ success: false, message: "Error While Deleting Data" })
})

const login = ErrorHandler.asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const {email,password} = req.body
    const data = await CustomerModel.query().where('email','=',email)
    if(!(data && data.length)) return res.status(404).json({success:false,message:'Invalid Login Credential or Email not Found'})
    const firstData = JSON.parse(JSON.stringify(data[0].toJSON()))
    if(!(await Bcrypt.CompareHash(password,firstData.password))) return res.status(404).json({success:false,message:'Invalid Login Credential or Email not Found'})
    delete firstData.password 
    const token = JWT.genToken(firstData)
    return res.status(200).json({success:true,token,message:'Login Successfull'})
})

export = { getAllCustomer, getCustomerById, addCustomer, updateCustomer, deleteCustomer ,login }