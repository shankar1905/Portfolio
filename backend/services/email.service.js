const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS, // Zoho app password
  },
});

transporter.verify((err) => {
  if (err) console.log("❌ Email Error:", err.message);
  else console.log("✅ Zoho Email Ready");
});

async function sendContactEmail(name, email, message) {
  return transporter.sendMail({
    from: `"Portfolio" <${process.env.EMAIL}>`,
    to: process.env.EMAIL,
    subject: "📩 New Portfolio Message",
    html: `<p><b>Name:</b> ${name}</p>
           <p><b>Email:</b> ${email}</p>
           <p><b>Message:</b> ${message}</p>`
  });
}

async function sendAutoReplyEmail(name, email) {
  return transporter.sendMail({
    from: `"Shankar Portfolio" <${process.env.EMAIL}>`,
    to: email,
    subject: "Thanks for contacting me",
    html: `<h3>Hi ${name},</h3><p>Thanks for your message 😊</p>`
  });
}

module.exports = { sendContactEmail, sendAutoReplyEmail };
