import { Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
<<<<<<< HEAD
    const confirmLink = `https://crossfit-xi.vercel.app/auth/new-verification?token=${token}`;
=======
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
>>>>>>> 9c41f12f419b04f98443bb68f6dea5672469a670

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm your email",
        html: `<p>Click <a href='${confirmLink}'>here</a> to confirm email</p>`
    });
};

export const sendPasswordResetEmail = async (
    email: string,
    token: string
) => {
<<<<<<< HEAD
    const resetLink = `https://crossfit-xi.vercel.app/auth/new-password?token=${token}`;
=======
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;
>>>>>>> 9c41f12f419b04f98443bb68f6dea5672469a670

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset your Password",
        html: `<p>Click <a href='${resetLink}'>here</a> to reset password</p>`
    });
};
