import { auth } from "@clerk/nextjs/server";
import { createCase, getCasesByUser } from "../queries/case";
import { getUserbyId } from "../queries/user";
import { EmailService } from "@/services/email";

export async function POST(req:Request){
    try {
        let newCase;
        const {userId} = await auth();
        const user = await getUserbyId(userId!)
        if (userId) {
            const formData = await req.formData();
            newCase = await createCase(userId, formData);
        } else {
            return new Response('Unauthorized', {status: 401});
        }
        const email = new EmailService();
        
        if (user?.email) {
            await email.sendCaseCreation({
                to: user.email, 
                username: user?.username,
                caseId: newCase.id,
                caseTitle: newCase.title
            });

            await email.caseRecieved({
                username: user.username,
                caseId: newCase.id,
                caseTitle: newCase.title
            })
        }
        return new Response('Case created', {status: 200});
    } catch (error) {
        console.error('Error creating case', error);
        return new Response('Error creating case', {status: 500});
    }
}

export async function GET(){
    try {
        const { userId } = await auth();
        if (userId){
            const cases = await getCasesByUser(userId);
            return new Response(JSON.stringify(cases), {status: 200});
        }
        return new Response('Unauthorized', {status: 401});
    } catch (error) {
        console.error('Error getting cases', error);
        return new Response('Error getting cases', {status: 500});
    }
}