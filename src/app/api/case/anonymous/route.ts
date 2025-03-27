import requestIp from 'request-ip';
import { createAnonymousCase } from '../../queries/case';
import { EmailService } from '@/services/email';

export async function POST(req:Request){
    try {
        const ipAddress = requestIp.getClientIp({
            headers: Object.fromEntries(req.headers.entries())
        })
        const formData = await req.formData();
        const anonymousCase = await createAnonymousCase(formData, ipAddress!)

        const email = new EmailService();
        if(anonymousCase){
            await email.caseRecieved({
                username: ipAddress ?? 'Anonymous',
                caseId: anonymousCase.id,
                caseTitle: anonymousCase.title
            })
        }
        return new Response('Case created', {status: 200});
    } catch (error) {
        console.error('Error creating case', error);
        return new Response('Error creating case', {status: 500});
    }
}