import { auth } from "@clerk/nextjs/server";
import { getAllCases } from "../../queries/case";

export async function GET(){
    try {
        const {userId, sessionClaims} = await auth();
        if (userId && sessionClaims?.metadata.role === 'admin') {
            const cases = await getAllCases();
            return new Response(JSON.stringify(cases), {status: 200});
        }
        return new Response('Unauthorized', {status: 401});
    } catch (error) {
        return new Response('Error getting cases', {status: 500});
    }
}