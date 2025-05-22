// //! WORKING SEND
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  console.log("API /sendClaimEmail called", req.method);
  if (req.method !== "POST") return res.status(405).end();

  const { senderName, senderEmail, senderImage, message, phone, selectedPost } = req.body;

  if (!selectedPost || !selectedPost.email) {
    console.error("No email found for selected post:", selectedPost);
    return res.status(400).json({ message: "Missing email address for selected post" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Lost and Found" <${process.env.GMAIL_USER}>`,
    to: selectedPost.email,
    subject: `Item claim request: ${selectedPost.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">NEW CLAIM REQUEST</h2>

        <h3 style="margin-top: 20px;">ITEM:</h3>
        <p><strong>${selectedPost.title}</strong></p>
        <img 
          src="${selectedPost.image}" 
          alt="Item image" 
          style="max-width: 300px; height: auto; border-radius: 8px; margin: 10px 0;" 
        />

        <h3 style="margin-top: 20px;">Claimer's Message:</h3>
        <p>${message}</p>
        <p><strong>Contact number:</strong> ${phone}</p>

        <hr style="margin: 30px 0;" />

        <h3>Claimer's Info:</h3>
        <p><strong>Name:</strong> ${senderName}</p>
        <p><strong>Email:</strong> ${senderEmail}</p>
        <img 
          src="${senderImage}" 
          alt="Sender Image" 
          width="60" height="60" 
          style="border-radius: 50%; object-fit: cover; margin-top: 10px;" 
        />
      </div>
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