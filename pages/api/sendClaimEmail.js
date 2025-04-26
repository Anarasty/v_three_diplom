//! WORKING SEND
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  console.log("API /sendClaimEmail called", req.method); // <== вот сюда
  if (req.method !== "POST") return res.status(405).end();

  const { senderName, senderEmail, senderImage, message, phone, selectedPost } = req.body;

//   if (!selectedPost || !selectedPost.email) {
//     return res.status(400).json({ message: "Missing email address for selected post" });
//   }
if (!selectedPost || !selectedPost.email) {
    console.error("No email found for selected post:", selectedPost);
    return res.status(400).json({ message: "Missing email address for selected post" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, // твоя почта
      pass: process.env.GMAIL_PASS, // твой пароль приложения
    },
  });

  const mailOptions = {
    from: `"Lost and Found" <${process.env.GMAIL_USER}>`,
    to: selectedPost.email, // правильный автор поста
    subject: `Claim Request for: ${selectedPost.title}`,
    html: `
      <h2>New Claim Request</h2>
      <p><strong>Item:</strong> ${selectedPost.title}</p>
      <p><strong>Message:</strong> ${message}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <hr />
      <h3>Sender Info:</h3>
      <p><strong>Name:</strong> ${senderName}</p>
      <p><strong>Email:</strong> ${senderEmail}</p>
      <img src="${senderImage}" alt="Sender Image" width="50" height="50" />
    `,
  };

  try {
    console.log("Sending email to:", selectedPost.email);
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("SendMail Error:", error);
    res.status(500).json({ message: "Failed to send email", error: error.message });
  }
}