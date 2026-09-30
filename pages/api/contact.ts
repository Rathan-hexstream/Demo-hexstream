import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Initializing nodemailer with settings
  let nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // Configuring Mail Data
  const mailData = {
    from: process.env.MAIL_USER,
    to: process.env.MAIL_USER,
    subject: `Inquiry from ${req.body.firstName}`,
    html: `<p>Hello</p>
    <p>${req.body.firstName} ${req.body.lastName} has contacted with an inquiry.</p>
    <p>Message: ${req.body.message}</p>
    <p>Company Name: ${req.body.companyName}</p>
    <p>Service: ${req.body.solution}</p>
    <p>The contact details are as follows:</p>
    <p>Contact Number: ${req.body.mobile} </p>
    <p>Contact Email: ${req.body.email} </p>

    <p> Regards, </p>
    <p> HEXStream </p>
    `,
  };

  // Sending the email, followed by status code.
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err: any, info: any) => {
      if (err) {
        reject(err);
        res.status(500).json({
          success: "false",
          error: err,
        });
      } else {
        resolve(info);
        res.status(200).json({
          success: "true",
        });
      }
    });
  });
}
