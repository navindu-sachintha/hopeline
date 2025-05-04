import { EmailService } from "@/services/email";

export async function POST(req:Request){
    try {
        const data = await req.json() as {
            meetingLink:string,
            repeorterEmail:string,
            caseTitle:string,
            username:string,
            caseId:string
            date:Date
          };
        const {meetingLink, repeorterEmail, caseTitle, username, caseId, date} = data;
        const formattedDate = new Intl.DateTimeFormat('en-US',{
            dateStyle: 'full',
            timeStyle: 'short',
            timeZone: 'UTC'
        }).format(new Date(date));
        console.log('Formatted Date:', formattedDate);
        const emailService = new EmailService();
        const result = await emailService.sendMeetingLink({
            username,
            caseId,
            email: repeorterEmail,
            caseTitle,
            meetingLink,
            date: formattedDate
        })
        if (result) {
            return new Response(JSON.stringify(data), {status: 200});
        }
        return new Response('Failed to send meeting link', {status: 500});
    } catch (error) {
        console.error('Error verifying evidence', error);
        return new Response('Error verifying evidence', {status: 500});
    }
}