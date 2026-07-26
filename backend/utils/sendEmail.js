import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    family: 4,
});

const sendEmail =async (to, subject, html) => {
    const info = await transporter.sendMail({
        from: `"Budget Tracker" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    });
    console.log(info.messageId);
};

export default sendEmail;