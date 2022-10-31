import nodemailer from 'nodemailer'
const MAILID = process.env.MAILID
const MAILPASSWORD = process.env.MAILPASSWORD
const MAILSERVICE = process.env.MAILSERVICE

async function main(mail:String,otp?:Number){
    const transporter = nodemailer.createTransport({
        // host:'',
        // port:587,
        // secure:false,
        // requireTLS:true,
        service:MAILSERVICE,
        auth:{
            user:MAILID,
            pass:MAILPASSWORD
        },
        logger:true
    })

    let subject = 'Verification Confirmation Email'
    let html = 'Verification Successfull'

    if(otp != undefined){
        subject = "Auto Generated Otp for Verification"
        html = `<p>Your OTP for verification is <strong>${otp}</strong></p>`
    }

    const info = await transporter.sendMail({
        from: MAILID,
        to: `${mail}`,
        subject: subject,
        html: html,
        headers: { 'x-myheader': 'test header' }
    });  
    return info
}

export = main