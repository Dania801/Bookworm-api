import nodemailer from 'nodemailer';
const from = '"Bookworm" <info@bookworm.com>>';

function setup() {
    return nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "626c7448eb6b50ce955d447473e26e27",
            pass: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ0b2tlbiI6IjYyNmM3NDQ4ZWI2YjUwY2U5NTVkNDQ3NDczZTI2ZTI3In0.w7kTnhQaOSmFgJdAZvkh0RjkynSailHn302iuhdQfrBtSD18Er6LZaQnNkkAVyAfT55jTQww9rFjiUPJinbmqg"
        }
    });
}

export function sendConfirmationEmail(user) {
    const transport = setup();
    const email= {
        from, 
        to: user.email,
        subject: "Welcome to bookworm!",
        text: `
            welcome to bookworm. please confirm your email.
            ${user.generateConfirmationUrl()}
        `
    }

    transport.sendMail(email);
} 