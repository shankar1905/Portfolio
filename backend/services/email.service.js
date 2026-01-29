const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ Admin Email
async function sendContactEmail(name, email, message) {
  try {
    const result = await resend.emails.send({
      from: `Portfolio <${process.env.FROM_EMAIL}>`,
      to: process.env.EMAIL,
      subject: "📩 New Portfolio Contact Message",
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    console.log("✅ Admin email sent:", result.id);
  } catch (err) {
    console.error("❌ Admin Email Error:", err.message);
  }
}

// ✅ Auto Reply Email (REAL USERS)
async function sendAutoReplyEmail(name, email) {
  try {
    const result = await resend.emails.send({
      from: `Shankar Portfolio <${process.env.FROM_EMAIL}>`,
      to: email,
      subject: "✅ Thanks for contacting me!",
      html: `
        <div style="font-family:Arial;padding:15px">
          <h2>Hi ${name} 👋</h2>
          <p>Thank you for contacting me.</p>
          <p>I received your message and will reply soon 🚀</p>
          <br>
          <p>Regards,<br><b>Shankar Ganesh</b></p>
        </div>
      `,
    });

    console.log("✅ Auto reply sent:", result.id);
  } catch (err) {
    console.error("❌ Auto Reply Error:", err.message);
  }
}

module.exports = { sendContactEmail, sendAutoReplyEmail };
