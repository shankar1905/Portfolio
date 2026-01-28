const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.in",       // Zoho India SMTP
  port: 587,                  // ✅ Best port for Render
  secure: false,              // must be false for 587
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS, // Zoho App Password
  },
  tls: {
    rejectUnauthorized: false, // ✅ avoid TLS errors
  },
  connectionTimeout: 20000,   // ✅ avoid timeout
  greetingTimeout: 20000,
  socketTimeout: 20000,
});

// ✅ Verify SMTP
transporter.verify((err, success) => {
  if (err) {
    console.log("❌ Zoho Email Error:", err.message);
  } else {
    console.log("✅ Zoho Email Ready");
  }
});

// ✅ Admin Notification Email
async function sendContactEmail(name, email, message) {
  return transporter.sendMail({
    from: `"Shankar Portfolio" <${process.env.EMAIL}>`,
    to: process.env.EMAIL,
    replyTo: email,
    subject: "📩 New Portfolio Message",
    html: `
      <div style="font-family:Arial;padding:15px">
        <h2>📩 New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <div style="padding:10px;background:#f4f4f4;border-radius:5px;">
          ${message}
        </div>
      </div>
    `,
  });
}

// ✅ Auto Reply Email to User
async function sendAutoReplyEmail(name, email) {
  return transporter.sendMail({
    from: `"Shankar Portfolio" <${process.env.EMAIL}>`,
    to: email,
    subject: "✅ Thanks for contacting me!",
    html: `
      <div style="font-family:Arial;padding:15px">
        <h2>Hi ${name} 👋</h2>
        <p>Thanks for contacting me.</p>
        <p>I will reply to you soon 🚀</p>
        <br>
        <p>Regards,<br><b>Shankar Ganesh</b></p>
      </div>
    `,
  });
}

module.exports = { sendContactEmail, sendAutoReplyEmail };
