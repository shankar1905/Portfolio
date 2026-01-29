const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendContactEmail(name, email, message) {
  return resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>", // default free sender
    to: process.env.EMAIL,
    subject: "📩 New Portfolio Message",
    html: `
      <h2>New Contact Message</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Message:</b> ${message}</p>
    `,
  });
}

async function sendAutoReplyEmail(name, email) {
  return resend.emails.send({
    from: "Shankar Portfolio <onboarding@resend.dev>",
    to: email,
    subject: "Thanks for contacting me!",
    html: `
      <h3>Hi ${name} 👋</h3>
      <p>Thanks for your message. I will reply soon 😊</p>
      <br>
      <b>Shankar Ganesh</b>
    `,
  });
}

module.exports = { sendContactEmail, sendAutoReplyEmail };
