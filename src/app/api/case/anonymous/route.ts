import requestIp from 'request-ip';
import { createAnonymousCase } from '../../queries/case';

export async function POST(req:Request){
    try {
        const ipAddress = await requestIp.getClientIp({
            headers: Object.fromEntries(req.headers.entries())
        })
        const formData = await req.formData();
        const anonymousCase = await createAnonymousCase(formData, ipAddress!)
        return new Response('Case created', {status: 200});
    } catch (error) {
        console.error('Error creating case', error);
        return new Response('Error creating case', {status: 500});
    }
}