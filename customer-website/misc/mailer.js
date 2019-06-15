const nodemailer=require('nodemailer')
const nodemailMailGun=require('nodemailer-mailgun-transport')
const config =require('../config/mailer')


const auth= {
    service:'Gmail',
    auth:{
        user:config.USER,
        pass:config.PASS
    },
    tls:{rejectUnauthorized:false     }
};

let transporter=nodemailer.createTransport(auth)

const sendMail = (email, subject, text, cb) => {
    const mailOptions = {
        from: 'nghinguyen.170498@gmail.com', // TODO replace this with your own email
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
