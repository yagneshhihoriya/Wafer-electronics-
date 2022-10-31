import express from 'express'
const Router = express.Router()
import adminRoute from './admin'
import customerRoute from './customers'
import mailRoute from './mail'
import ProfileController from '../controller/profile'
import Auth from '../middleware/auth'
import fileUpload from '../../util/profileUpload'

Router.use('/admin',adminRoute)
Router.use('/customer',customerRoute)
Router.use('/mail',mailRoute)
Router.post('/add-profile',Auth,fileUpload.single('profile-img'),ProfileController.addProfile)
Router.get('/get-profile',Auth,ProfileController.getProfile)

export = Router
