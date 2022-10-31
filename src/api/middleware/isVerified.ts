import { Request, Response, NextFunction } from 'express'
import ErrorHandler from '../../util/error'
import AdminModel from '../../models/admin'
import CustomerModel from '../../models/customer'

const isVerified = ErrorHandler.asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body
    let data;
    if (req.adminRoute) {
        data = await AdminModel.query().where('admin.email', '=', email)
    } else {
        data = await CustomerModel.query().where('customers.email', '=', email)
    }
    if (!(data && data.length)) return res.status(404).json({ success: false, message: 'Invalid Login Credential or Email not Found' })
    const firstData = JSON.parse(JSON.stringify(data[0].toJSON()))
    if (firstData.isVerified) {
        next()
    } else {
        return res.json({ success: false, message: 'Please verify the account' })
    }
})

export = isVerified