// email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        // Replace these values with your email provider's configuration
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'razaacademyorg@gmail.com',
                pass: 'xhhipojiyzupltwh',
            },
        });
    }

    async sendEmail(to: string, subject: string, html: string): Promise<boolean> {
        const mailOptions: nodemailer.SendMailOptions = {
            from: 'razaacademyorg@gmail.com',
            to,
            subject,
            html,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log('Email sent successfully:', mailOptions);
            return true;
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }
}
