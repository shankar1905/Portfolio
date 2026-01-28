const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// ✅ Admin Email
async function sendContactEmail(name, email, message) {
  const msg = {
    to: process.env.EMAIL,
    from: process.env.EMAIL,
    subject: "📩 New Portfolio Message",
    html: `
      <h2>New Contact Message</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Message:</b> ${message}</p>
    `
  };

  await sgMail.send(msg);
  console.log("✅ Admin Email Sent");
}

// ✅ Auto Reply Email
async function sendAutoReplyEmail(name, email) {
  const msg = {
    to: email,
    from: process.env.EMAIL,
    subject: "✅ Thanks for contacting me!",
    html: `
      <h3>Hi ${name}, 👋</h3>
      <p>Thanks for contacting me. I will reply soon.</p>
      <br>
      <b>- Shankar Ganesh</b>
    `
  };

  await sgMail.send(msg);
  console.log("✅ Auto Reply Sent");
}

module.exports = { sendContactEmail, sendAutoReplyEmail };
