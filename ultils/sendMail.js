const nodemailer = require('nodemailer')
const asyncHandler = require('express-async-handler')

const sendMail = asyncHandler(async ({ email, html }) => {
    let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_NAME, // your gmail account
        pass: process.env.EMAIL_APP_PASSWORD, // your app password
    },
    
});
console.log(process.env.EMAIL_NAME, process.env.EMAIL_APP_PASSWORD);

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Cuahangdientu" <no-relply@cuahangdientu.com>', // sender address
        to: email, // list of receivers
        subject: "Forgot password", // Subject line
        html: html, // html body
    });

    return info
})

module.exports = sendMail