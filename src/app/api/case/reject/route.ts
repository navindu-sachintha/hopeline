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
            rejection: string;}

        const { caseId, username, caseTitle, email, rejection } = data;

        const reject = await updateCaseStatus(caseId, 'REJECTED');

        const mailService = new EmailService()

        const rejectmail = await mailService.sendRejectConfirmation({
            username,
            caseId,
            email,
            caseTitle,
            rejection
        })
        if (reject && rejectmail) {
            return new Response(JSON.stringify(rejection), {status: 200});
        }
        return new Response('Failed to reject case', {status: 500});
    } catch (error) {
        console.error('Error rejecting case', error);
        return new Response('Error rejecting case', {status: 500});
    }
}