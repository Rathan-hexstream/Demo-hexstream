// import client from "@/utils/apolloClient";
// import { gql } from "@apollo/client";

// import type { NextApiRequest, NextApiResponse } from "next";

// let nodemailer = require("nodemailer");

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") {
//     res.status(405).end(); // Method Not Allowed
//     return;
//   }

//   const { name, email, query } = req.body;
//   // console.log(name, email, "@@reqBody");
//   if (!name && !email) {
//     res
//       .status(400)
//       .json({ message: "Please Enter yourname and Email to proceed" });
//   }
//   if (!query) {
//     res.status(401).send({ message: "Something went wrong!" });
//   }

//   // Create a Nodemailer transporter
//   const transporter = nodemailer.createTransport({
//     port: 465,
//     host: "smtp.gmail.com",
//     secure: true,
//     auth: {
//       user: process.env.MAIL_USER,
//       pass: process.env.MAIL_PASS,
//     },
//   });

//   const { data } = await client.query({
//     query: gql`
//           query MyQuery {
//             whitepapers(
//               where: {
//                 slug_in: "${query}"
//               }
//             ) {
//               fullPdf {
//                 url
//                 fileName
//               }
//             }
//           }
//         `,
//   });
//   if (!data.whitepapers.length) {
//     res.status(400).send({ message: "File not found" });
//   }

//   // Create the email message
//   const message = {
//     from: process.env.MAIL_USER,
//     to: email,
//     subject: "PDF Attachment",
//     html: `<p>Hi ${name},</p>

//     <p>Please find the PDF attachment.</p>

//     <p> Regards, </p>
//     <p> HEXstream </p>
//     `,
//     attachments: [
//       {
//         filename: `${data.whitepapers[0].fullPdf.fileName}`,
//         path: `${data.whitepapers[0].fullPdf.url}`,
//       },
//     ],
//   };

//   transporter.sendMail(message, function (err: any, info: any) {
//     if (err) console.log(err);
//     else console.log(info);
//   });
//   res.status(200);
//   res.send({ message: "" });
// }
