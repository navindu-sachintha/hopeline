import { auth } from "@clerk/nextjs/server";
import { createCase, getCasesByUser } from "../queries/case";

export async function POST(req:Request){
    try {
        const {userId} = await auth();
        if (userId) {
            const formData = await req.formData();
            await createCase(userId, formData);
        } else {
            return new Response('Unauthorized', {status: 401});
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