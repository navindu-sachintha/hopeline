import { EmailService } from "@/services/email";
import { updateCaseStatus } from "../../queries/case";

export async function PUT(req:Request){
    try {
        const data = await req.json() as {
            username:string;
            caseId: string;
            caseTitle: string;
            meetingLink: string;
            email: string;
            resolution: string;}
        const { caseId, username, caseTitle, email, resolution } = data;

        const resolve = await updateCaseStatus(caseId, 'RESOLVED');
        const mailService = new EmailService()

        const mail = await mailService.sendResolveConfirmation({
            username,
            caseId,
            email,
            caseTitle,
            resolution
        })

        if(resolve && mail) {
            return new Response(JSON.stringify(resolution), {status: 200});
        }
        return new Response('Failed to resolve case', {status: 500});

    } catch (error) {
        console.error('Error resolving case', error);
        return new Response('Error resolving case', {status: 500});
    }
}