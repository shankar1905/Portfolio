const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ Email Validation
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// ✅ Admin Email
async function sendContactEmail(name, email, message) {
  try {
    const result = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
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

// ✅ Auto Reply (with protection)
async function sendAutoReplyEmail(name, email) {
  try {
    if (!isValidEmail(email)) {
      console.log("⚠️ Invalid email, auto reply blocked:", email);
      return;
    }

    const result = await resend.emails.send({
      from: "Shankar Portfolio <onboarding@resend.dev>",
      to: email,
      subject: "✅ Thanks for contacting me!",
      html: `
        <h3>Hi ${name} 👋</h3>
        <p>Thanks for contacting me.</p>
        <p>I received your message and will reply soon 🚀</p>
        <br>
        <p>Regards,<br><b>Shankar Ganesh</b></p>
      `,
    });

    console.log("✅ Auto reply sent:", result.id);
  } catch (err) {
    console.error("❌ Auto Reply Error:", err.message);
  }
}

module.exports = { sendContactEmail, sendAutoReplyEmail };
