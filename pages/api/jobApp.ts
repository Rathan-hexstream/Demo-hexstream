import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import formidable, { File } from "formidable";
import fs from "fs";

export const config = {
    api: {
        bodyParser: false, // REQUIRED for multipart/form-data
    },
};

const resend = new Resend(process.env.RESEND_API_KEY!);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error("FORM PARSE ERROR:", err);
            return res.status(500).json({ error: "Form parsing failed" });
        }

        try {
            /* ---------- FILE HANDLING ---------- */
            const uploaded = files.file;

            if (!uploaded) {
                return res.status(400).json({ error: "Resume file missing" });
            }

            // Handle File | File[]
            const file: File = Array.isArray(uploaded) ? uploaded[0] : uploaded;

            // Size validation (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                return res.status(400).json({ error: "File too large (max 5MB)" });
            }

            const fileBuffer = fs.readFileSync(file.filepath);
            const base64File = fileBuffer.toString("base64");

            /* ---------- SEND EMAIL VIA RESEND ---------- */
            await resend.emails.send({
                from: "Hexstream Careers <onboarding@resend.dev>", // NO verification needed
                to: [process.env.CAREERS_TO_EMAIL!],
                subject: `Job Application — ${fields.title}`,
                html: `
                  <p>Hello Team,</p>
        
                  <p>
                    <strong>${fields.fullName}</strong> has applied for
                    <strong>${fields.title}</strong>.
                  </p>
        
                  <p><strong>Background:</strong><br />${fields.message}</p>
        
                  <p>
                    <strong>Email:</strong> ${fields.email}<br />
                    <strong>Phone:</strong> ${fields.phone}
                  </p>
        
                  <br />
                  <p>Regards,<br />Hexstream Website</p>
                `,
                attachments: [
                    {
                        filename: file.originalFilename || "resume.pdf",
                        content: base64File,
                    },
                ],
            });

            return res.status(200).json({ success: true });
        } catch (error) {
            console.error("RESEND ERROR:", error);
            return res.status(500).json({ error: "Email sending failed" });
        }
    });
}
