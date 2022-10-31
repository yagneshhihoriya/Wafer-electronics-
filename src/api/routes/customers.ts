import express,{Request,Response,NextFunction} from 'express'
const Router = express.Router()
import Customer = require('../controller/customer') 
import isVerified = require('../middleware/isVerified')
import Auth from '../middleware/auth'
import isAdmin from '../middleware/isAdmin'

Router.get('/',Auth,isAdmin,Customer.getAllCustomer)
Router.get('/:id',Auth,Customer.getCustomerById)
Router.post('/',Customer.addCustomer)
Router.put('/',Auth,Customer.updateCustomer)
Router.delete('/:id',Auth,isAdmin,Customer.deleteCustomer)
Router.post('/login',(req:Request,_:Response,next:NextFunction)=>{
    req.adminRoute = false
    next()
},isVerified,Customer.login)

export = Router