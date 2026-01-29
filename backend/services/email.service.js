const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendContactEmail(name, email, message) {
  try {
    const response = await resend.emails.send({
      from: "Shankar Portfolio <contact@shankarganesh.in>", // must match domain
      to: process.env.EMAIL, // your admin email
      subject: "📩 New Portfolio Message",
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    console.log("✅ Admin email sent:", response);
  } catch (err) {
    console.error("❌ Admin Email Error:", err.message);
  }
}

async function sendAutoReplyEmail(name, email) {
  try {
    const response = await resend.emails.send({
      from: "Shankar Portfolio <contact@shankarganesh.in>",
      to: email,
      subject: "✅ Thanks for contacting me!",
      html: `
        <h3>Hi ${name} 👋</h3>
        <p>Thanks for contacting me.</p>
        <p>I will reply soon 🚀</p>
        <br>
        <p>Regards,<br><b>Shankar Ganesh</b></p>
      `,
    });

    console.log("✅ Auto reply sent:", response);
  } catch (err) {
    console.error("❌ Auto Reply Error:", err.message);
  }
}

module.exports = { sendContactEmail, sendAutoReplyEmail };
