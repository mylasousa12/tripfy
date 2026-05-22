type ResetPasswordTemplateProps = {
    resetLink: string;
};

export function resetPasswordTemplate({resetLink}: ResetPasswordTemplateProps) {
    return `
        <div
            style="
                font-family: Arial;
                padding: 20px;
            "
        >
            <h2>
                Recuperação de senha
            </h2>

            <p>
                Clique no botão abaixo
                para redefinir sua senha:
            </p>

            <a
                href="${resetLink}"
                style="
                    display: inline-block;
                    padding: 12px 20px;
                    background: #000;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 8px;
                "
            >
                Redefinir senha
            </a>

            <p
                style="
                    margin-top: 20px;
                    font-size: 12px;
                    color: #777;
                "
            >
                Se você não solicitou
                recuperação de senha,
                ignore este e-mail.
            </p>
        </div>
    `;
}