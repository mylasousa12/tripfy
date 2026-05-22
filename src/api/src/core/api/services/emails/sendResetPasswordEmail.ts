import {transporter} from "@/lib/nodemailer";
import {SentMessageInfo} from "nodemailer";
import {resetPasswordTemplate} from "@/core/api/services/emails/Template/reset-password-template";

export async function sendResetPasswordEmail(email: string, resetLink: string) {
    const info: SentMessageInfo = await transporter.sendMail({
        from: "no-reply@tripfy.com",
        to: email,
        subject: "password recovery",
        html: resetPasswordTemplate({resetLink})
    });
    return info;
}