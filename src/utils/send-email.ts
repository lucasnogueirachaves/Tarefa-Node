import nodemailer, { type SentMessageInfo } from "nodemailer";
import type Mail from "nodemailer/lib/mailer";
import { env } from "@/env/index.js";

const transporter = nodemailer.createTransport({
	host: env.SMTP_HOST,
	port: env.SMTP_PORT,
	secure: env.SMTP_SECURE,
	auth: { user: env.SMTP_EMAIL, pass: env.SMTP_PASSWORD },
});

interface SendEmailRequest {
	to: string;
	subject: string;
	message: string;
	html: string;
	attachments?: Mail.Attachment[] | undefined;
}

export async function sendEmail({
	to,
	subject,
	message,
	html,
	attachments,
}: SendEmailRequest): Promise<SentMessageInfo> {
	try {
		const info = await transporter.sendMail({
			from: env.SMTP_EMAIL,
			to,
			subject,
			text: message,
			html,
			...(attachments ? { attachments } : {}),
		});

		console.info("Message sent!", { sentTo: to, messageId: info.messageId });

		return info;
	} catch (error) {
		console.error("Erro ao enviar e-mail", error);

		throw error;
	}
}
