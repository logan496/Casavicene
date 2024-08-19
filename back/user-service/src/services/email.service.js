const nodemailer = require('nodemailer')
const config = require('../config/config')


// const transport = nodemailer.createTransport(config.email.smtp)
// if(config.env !== 'test'){
//     transport
//         .verify()
//         .then(() => logger.info('Connected to email server'))
//         .catch(() => logger.warn('Unable to connect to email server. Make sure you  have configured the SMTP options in .env'))
// }
class emailService {

    transport = nodemailer.createTransport(config.email.smtp)
    /**
     * Send reset password email
     * @param {string} to
     * @param subject
     * @param text
     * @returns {Promise}
     */
    async sendEmail (to, subject, text){
        const msg =  {from: config.email.from, to, subject, text}
        await this.transport.sendMail(msg)
    }

    /**
     * Send reset password email
     * @param {string} to
     * @param {string} token
     * @returns {Promise}
     */
    async sendResetPassworEmail (to, token){
        const subject = 'Reset password'
        const resetPasswordUrl = `http://lien-page-reset-password/reset-password?token=${token}`
        const text = `Cher utilisateur,
        afin de mettre à jour votre mot de passe, cliquer sur ce lien: ${resetPasswordUrl}`
        await this.sendEmail(to, subject, text)
    }
}

// const sendEmail = async (to, subject, text) => {
//     const msg = { from: config.email.from, to, subject, text }
//     await transport.sendMail(msg)
// }
//
// const sendResetPasswordEmail = async (to, token) => {
//     const subject = 'Reset password'
//     const resetPasswordUrl = `http://lien-page-reset-password/reset-password?token=${token}`
//     const text = `Cher utilisateur,
//     afin de mettre à jour votre mot de passe clique sur ce lien: ${resetPasswordUrl}`
//     await sendEmail(to, subject, text)
// }

module.exports = emailService