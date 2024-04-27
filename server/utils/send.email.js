import nodemailer from "nodemailer";

const sendEmail = async ({email, subject, text}) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        service: process.env.EMAIL_SERVICE,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS
        }
    });

    try {
        await transporter.sendMail({
            from: process.env.USER_EMAIL,
            to: email,
            subject: subject,
            text: text,
        });
        console.log("Email sent successfully!");
    } catch (err) {
        console.log(err)
        throw new Error(err.message);
    }
};


export default sendEmail;
