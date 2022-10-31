import express,{Request,Response,NextFunction} from 'express'
const Router = express.Router()
import Admin from '../controller/admin' 
import isVerified = require('../middleware/isVerified')
import Auth from '../middleware/auth'
import isAdmin = require('../middleware/isAdmin')

Router.get('/',Auth,isAdmin,Admin.getAllAdmin)
Router.get('/:id',Auth,isAdmin,Admin.getAdminById)
Router.post('/',Admin.addAdmin)
Router.delete('/',Auth,isAdmin,Admin.deleteAdmin)
Router.post('/login',(req:Request,_:Response,next:NextFunction)=>{
    req.adminRoute = true
    next()
},isVerified,Admin.login)

export = Router