import nodemailer from 'nodemailer';
import { env } from '@/env';

export class EmailService{
    private transporter: nodemailer.Transporter;

    constructor(){
        this.transporter = nodemailer.createTransport({
            pool:true,
            host: env.SMTP_HOST,
            port:465,
            secure: true,
            auth:{
                user: env.SMTP_USER,
                pass: env.SMTP_PASS
            },
            debug:true,
            logger:true
        });

        this.transporter.verify((error, success) => {
            if (error) {
                console.error('SMTP connection verification failed:', error);
            } else {
                console.log('SMTP server is ready to take messages');
            }
        });
    }

    private async sendEmail(options: {
        to: string | string[];
        subject: string;
        html: string;
        from?: string;
    }): Promise<boolean> {
        try {
            const { to, subject, html, from } = options;
            
            await this.transporter.sendMail({
                from: from ?? env.SMTP_USER,
                to,
                subject,
                html
            });
            
            return true;
        } catch (error) {
            console.error('Failed to send email:', error);
            return false;
        }
    }

    async sendSignupConfirmation(options:{
        to: string,
        username: string,
    }): Promise<boolean>{
        try {
            const {to, username} = options;

            await this.sendEmail({
                to,
                subject: 'Welcome to Hopeline!',
                html:`
                    <h1>Welcome to Hopeline!</h1>
                    <p>Hi ${username},</p>
                    <p>Thank you for signing up for Hopeline. We are excited to have you on board!</p>
                    <p>Thank you for using Hopeline!</p>
                `
            })
            return true;
        } catch (error) {
            console.error('Failed to send email:', error);
            return false;
        }
    }

    async sendCaseCreation(options:{
        to:string;
        username: string;
        caseId: string;
        caseTitle: string;
    }): Promise<boolean>{
        try {
            const {to, username, caseId, caseTitle} = options;

            await this.sendEmail({
                to,
                subject: "Your case has been created! - Hopeline",
                html: `
                    <h1>Case Created</h1>
                    <p>Hi ${username},</p>
                    <p>Your case has been created successfully. Here are the details:</p>
                    <ul>
                        <li>Case ID: ${caseId}</li>
                        <li>Case Title: ${caseTitle}</li>
                    </ul>
                    <p>Thank you for using Hopeline!</p>
                `
            })
            return true;
        } catch (error) {
            console.error('Failed to send case creation email:', error);
            return false;
        }
    }

    async caseRecieved(options:{
        username:string;
        caseId: string;
        caseTitle: string;
    }):Promise<boolean>{
        try {
            const {username, caseId, caseTitle} = options;

            await this.sendEmail({
                to: env.SMTP_USER,
                subject: `A case recieved - ${caseTitle} from ${username} - Hopeline`,
                html:`
                    <h1>New Case Recieved</h1>
                    <p>Hello,</p>
                    <p>A new case has been reported by ip address ${username}. Here are the details:</p>
                    <ul>
                        <li>Case ID: ${caseId}</li>
                        <li>Case Title: ${caseTitle}</li>
                    </ul>
                    <p>Thank you for using Hopeline!</p>
                `
            })
            return true;
        } catch (error) {
            console.error('Failed to send case recieved email:', error);
            return false;
        }
    }

    async sendMeetingLink(options:{
        username:string;
        caseId: string;
        caseTitle: string;
        meetingLink: string;
        email: string;
        date: string
    }):Promise<boolean>{
        try {
            const {username, caseId, caseTitle, meetingLink, email, date} = options;
            await this.sendEmail({
                to: email,
                subject: `Meeting link for case - ${caseTitle} - Hopeline`,
                html: `
                    <h1>Meeting Link</h1>
                    <p>Hello ${username},</p>
                    <p>Your meeting link for the case is ready. Here are the details:</p>
                    <ul>
                        <li>Case ID: ${caseId}</li>
                        <li>Case Title: ${caseTitle}</li>
                        <li>Meeting Link: ${meetingLink}</li>
                        <li> Date and Time: ${date} </li>
                    </ul>
                    <p>Thank you for trusting Hopeline!</p>
                
                `
            })
            return true;
        } catch (error) {
            console.error('Failed to send meeting link email:', error);
            return false;
        }
    }

    async sendResolveConfirmation(options:{
        username:string;
        caseId: string;
        caseTitle: string;
        email: string;
        resolution: string;
    }):Promise<boolean>{
        try {
            const {username, caseId, caseTitle, email, resolution} = options;
            
            await this.sendEmail({
                to: email,
                subject: `Case Resolved - ${caseTitle} - Hopeline`,
                html: `
                    <h1>Case Resolved</h1>
                    <p>Hello ${username},</p>
                    <p>Your case has been resolved. Here are the details:</p>
                    <ul>
                        <li>Case ID: ${caseId}</li>
                        <li>Case Title: ${caseTitle}</li>
                        <li>Resolution: ${resolution}</li>
                    </ul>
                    <p>Thank you for trusting Hopeline!</p>
                `
            })

            return true;
        } catch (error) {
            console.error('Failed to send case resolved email:', error);
            return false
        }
    }

    async sendRejectConfirmation(options:{
        username:string;
        caseId: string;
        caseTitle: string;
        email: string;
        rejection: string;
    }):Promise<boolean>{
        try {
            const {username, caseId, caseTitle, email, rejection} = options;
            
            await this.sendEmail({
                to: email,
                subject: `Case Rejected - ${caseTitle} - Hopeline`,
                html: `
                    <h1>Case Rejected</h1>
                    <p>Hello ${username},</p>
                    <p>Your case has been rejected. Here are the details:</p>
                    <ul>
                        <li>Case ID: ${caseId}</li>
                        <li>Case Title: ${caseTitle}</li>
                        <li>Rejection: ${rejection}</li>
                    </ul>
                    <p>Thank you for trusting Hopeline!</p>
                `
            })

            return true;
        } catch (error) {
            console.error('Failed to send case resolved email:', error);
            return false
        }
    }
}