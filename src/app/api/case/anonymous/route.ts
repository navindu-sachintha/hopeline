import { createAnonymousCase } from "../../queries/case";

export async function POST(req:Request){
    try {
        const data = await req.json();
        createAnonymousCase(data);
        return new Response('Case created', {status: 200});
    } catch (error) {
        console.error('Error creating case', error);
        return new Response('Error creating case', {status: 500});
    }
}