const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
});

// Verify Gmail connection
transporter.verify((error, success) => {
    if (error) {
        console.log("❌ Email Service Error:", error.message);
    } else {
        console.log("✅ Email Service Ready");
    }
});

async function sendContactEmail(name, email, message) {
    return transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.EMAIL}>`,
        to: process.env.EMAIL,
        replyTo: email,
        subject: "📩 New Portfolio Message",
        html: `
      <div style="font-family: Arial; background:#f4f4f4; padding:20px;">
        <div style="max-width:600px; margin:auto; background:white; padding:20px; border-radius:10px;">
          <h2 style="color:#0d6efd;">📩 New Contact Message</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Message:</b></p>
          <div style="padding:10px; background:#f8f9fa; border-radius:5px;">
            ${message}
          </div>
          <hr>
          <p style="font-size:12px; color:gray;">Sent from your MEAN Portfolio 🚀</p>
        </div>
      </div>
    `
    });
}

async function sendAutoReplyEmail(name, email) {
    return transporter.sendMail({
        from: `"Shankar Portfolio" <${process.env.EMAIL}>`,
        to: email,
        subject: "✅ Thanks for contacting me!",
        html: `
      <div style="font-family: Arial; background:#f4f4f4; padding:20px;">
        <div style="max-width:600px; margin:auto; background:white; padding:20px; border-radius:10px;">
          <h2 style="color:#198754;">Hi ${name}, 👋</h2>
          <p>Thank you for contacting me.</p>
          <p>I have received your message and will get back to you soon.</p>

          <hr>
          <p style="font-size:14px;">
            Regards,<br>
            <b>Shankar Ganesh</b><br>
            Angular & MEAN Stack Developer 🚀
          </p>

          <p style="font-size:12px; color:gray;">
            This is an automated reply from my portfolio website.
          </p>
        </div>
      </div>
    `
    });
}


async function sendAutoReplyEmail(name, email) {
    return transporter.sendMail({
        from: `"Shankar Portfolio" <${process.env.EMAIL}>`,
        to: email,
        subject: "✅ Thanks for contacting me!",
        html: `
      <div style="font-family: Arial; background:#f4f4f4; padding:20px;">
        <div style="max-width:600px; margin:auto; background:white; padding:20px; border-radius:10px;">
          <h2 style="color:#198754;">Hi ${name}, 👋</h2>
          <p>Thank you for contacting me.</p>
          <p>I have received your message and will get back to you soon.</p>

          <hr>
          <p style="font-size:14px;">
            Regards,<br>
            <b>Shankar Ganesh</b><br>
            Angular & MEAN Stack Developer 🚀
          </p>

          <p style="font-size:12px; color:gray;">
            This is an automated reply from my portfolio website.
          </p>
        </div>
      </div>
    `
    });
}

module.exports = { sendContactEmail, sendAutoReplyEmail };