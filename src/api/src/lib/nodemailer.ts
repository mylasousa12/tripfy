import * as nodemailer from "nodemailer";
import {Env} from "@/core/api/Helpers/Env";

export const transporter = nodemailer.createTransport({
    host: "data-access-mailhog",
    port: 8025,
    secure: false,
})