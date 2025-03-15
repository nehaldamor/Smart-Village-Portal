const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, message) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            text: message,
        });

        console.log("Email sent successfully");
    } catch (error) {
        console.error("Email sending failed:", error);
    }
};

module.exports = sendEmail;
