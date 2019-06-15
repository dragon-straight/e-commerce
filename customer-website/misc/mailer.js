const nodemailer=require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport');

const config =require('../config/mailer')


const transporter=nodemailer.createTransport(smtpTransport({
    service:'gmail',
    auth:{
        user:config.USER,
        pass:config.PASS
    }
})
    
);



const sendMail = (email, subject, text, cb) => {
    const mailOptions = {
        from: 'nghi.clone001@gmail.com', // TODO replace this with your own email
        to: email, // TODO: the receiver email has to be authorized for the free tier
        subject,
        text
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            return cb(err, null);
        }
        return cb(null, data);
    });
}

module.exports = sendMail;
