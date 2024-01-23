const nodemailer = require("nodemailer");

const sendMail = (resetToken, data) => {
    const transporter = nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        auth: {
            user: process.env.DB_EMAIL_USERNAME,
            pass: process.env.DB_EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: "todo@nomail.com",
        to: data.email,
        subject: "Forget Password",
        html: `
      <p>You are receiving this email because you (or someone else) has requested a password reset for your account.</p>
      <p>Please click on the following link to reset your password:</p>
      <a href="${process.env.DB_CLIENT_URL}/resetpassword?token=${resetToken}&auth=true">Forget Password</a>

    `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: "Email could not be sent" });
        } else {
            console.log("Email sent: " + info.response);
            return res.status(200).json({ message: "Email sent" });
        }
    });
}

module.exports = { sendMail }


