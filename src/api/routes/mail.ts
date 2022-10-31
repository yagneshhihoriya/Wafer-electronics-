import express from 'express'
const Router = express.Router()
import Mail from '../controller/mail' 

Router.post('/sendMail',Mail.SendMail)
Router.post('/verifyMail',Mail.VerifyMail)

export = Router