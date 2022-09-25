import config from "config";
import nodemailer from "nodemailer";

const sender = nodemailer.createTransport({
    host: config.get("smtp.host"),
    service: config.get("smtp.host"),
    port: config.get("smtp.port"),
    secure: true,
    auth: {
        user: config.get("smtp.email"),
        pass: config.get("smtp.password")
    }
});

class EmailService {
    static sendEmail(to, subject, text) {
        const template = {
            from: config.get("smtp.email"),
            to: to,
            subject: subject,
            text: text
        }

        sender.sendMail(template, () => { });
    }
}

export default EmailService;