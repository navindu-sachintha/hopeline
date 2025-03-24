import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';
import { MailtrapTransport } from 'mailtrap'
import fs from 'fs';
import path from 'path';
import { env } from '@/env';

export class EmailService{
    private transporter: nodemailer.Transporter;
    private templateDir: string;

    constructor(config?:{
        mailtrapToken?: string,
        templateDir?: string
    }){
        this.transporter = nodemailer.createTransport(MailtrapTransport({
            token: env.MAILTRAP_TOKEN
        }));

        this.templateDir = config?.templateDir ?? path.join(process.cwd(),'src/templates/emails')
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
                from: from ?? env.EMAIL_FROM,
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

    private async getTemplate(templateName: string, data: Record<string, unknown>){
        const templatePath = path.join(this.templateDir, `${templateName}.hbs`);

        try {
            const templateContent = await fs.promises.readFile(templatePath, 'utf-8');
            const template = Handlebars.compile(templateContent);
            return template(data);
        } catch (error) {
            console.error(`Error loading email template: ${templateName}`, error);
            throw new Error(`Failed to load email template: ${templateName}`);
        }
    }

    async sendSignupConfirmation(options:{
        to: string,
        username: string,
    }): Promise<boolean>{
        try {
            const {to, username} = options;

            const html = await this.getTemplate('signupConfirmation', {username})

            await this.sendEmail({
                to,
                subject: 'Welcome to Hopeline!',
                html
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

            const html = await this.getTemplate('caseCreation', {username, caseId, caseTitle})

            await this.sendEmail({
                to,
                subject: "Your case has been created! - Hopeline",
                html
            })
            return true;
        } catch (error) {
            console.error('Failed to send case creation email:', error);
            return false;
        }
    }

    async caseRecieved(options:{
        to:string;
        username:string;
        caseId: string;
        caseTitle: string;
        reporter: string;
    }):Promise<boolean>{
        try {
            const {to, username, caseId, caseTitle, reporter} = options;

            const html = await this.getTemplate('caseRecieved', {username, caseId, caseTitle, reporter});

            await this.sendEmail({
                to,
                subject: `A case recieved - ${caseTitle} from ${username} - Hopeline`,
                html
            })
            return true;
        } catch (error) {
            console.error('Failed to send case recieved email:', error);
            return false;
        }
    }
}