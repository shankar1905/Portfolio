const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ Admin Notification Email (You receive message)
async function sendContactEmail(name, email, message) {
  return resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>", // free sender
    to: process.env.EMAIL, // your email
    subject: "📩 New Portfolio Contact Message",
    html: `
      <div style="font-family:Arial;padding:15px;">
        <h2 style="color:#0d6efd;">📩 New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <div style="padding:10px;background:#f4f4f4;border-radius:5px;">
          ${message}
        </div>
        <hr>
        <p style="font-size:12px;color:gray;">Sent from your Portfolio 🚀</p>
      </div>
    `,
  });
}

// ✅ Auto Reply Email (User receives reply)
async function sendAutoReplyEmail(name, email) {
  return resend.emails.send({
    from: "Shankar Portfolio <onboarding@resend.dev>",
    to: email,
    subject: "✅ Thanks for contacting me!",
    html: `
      <div style="font-family:Arial;padding:15px;">
        <h2>Hi ${name} 👋</h2>
        <p>Thank you for contacting me.</p>
        <p>I have received your message and will get back to you soon 🚀</p>
        <br>
        <p>
          Regards,<br>
          <b>Shankar Ganesh</b><br>
          Angular & MEAN Stack Developer
        </p>
      </div>
    `,
  });
}

module.exports = { sendContactEmail, sendAutoReplyEmail };
