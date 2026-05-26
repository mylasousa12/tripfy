import * as nodemailer from "nodemailer";
import {Env} from "@/core/api/Helpers/Env";

export const transporter = nodemailer.createTransport({
    host: Env.get("MAIL_HOST"),
    port: Number(Env.get("MAIL_PORT")),
    secure: false
})