const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = `Shankar Portfolio <${process.env.DOMAIN_EMAIL}>`;
const ADMIN_EMAIL = process.env.EMAIL;

// ✅ Admin Notification Email
async function sendContactEmail(name, email, message) {
  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: "📩 New Portfolio Contact Message",
      html: `
      <div style="font-family:Arial;padding:20px;background:#f4f4f4;">
        <div style="max-width:600px;margin:auto;background:white;padding:20px;border-radius:10px;">
          <h2 style="color:#0d6efd;">📩 New Contact Message</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Message:</b></p>
          <div style="padding:10px;background:#f8f9fa;border-radius:5px;">
            ${message}
          </div>
          <hr>
          <p style="font-size:12px;color:gray;">Portfolio Contact System</p>
        </div>
      </div>
      `,
    });

    console.log("✅ Admin email sent:", result.id);
  } catch (err) {
    console.error("❌ Admin Email Error:", err.message);
  }
}

// ✅ Auto Reply Email (Professional)
async function sendAutoReplyEmail(name, email) {
  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Thanks for contacting me 🚀",
      html: `
      <div style="font-family:Arial;padding:20px;background:#f4f4f4;">
        <div style="max-width:600px;margin:auto;background:white;padding:20px;border-radius:10px;">
          <h2 style="color:#198754;">Hi ${name} 👋</h2>
          <p>Thank you for contacting me through my portfolio.</p>
          <p>I have received your message and will reply soon.</p>
          
          <br>
          <p>
            Regards,<br>
            <b>Shankar Ganesh</b><br>
            Angular & MEAN Stack Developer
          </p>

          <hr>
          <p style="font-size:12px;color:gray;">
            This is an automated reply. Please do not reply to this email.
          </p>
        </div>
      </div>
      `,
    });

    console.log("✅ Auto reply sent:", result.id);
  } catch (err) {
    console.error("❌ Auto Reply Error:", err.message);
  }
}

module.exports = { sendContactEmail, sendAutoReplyEmail };
