import { auth } from "@clerk/nextjs/server";
import { getStats } from "../../queries/stats";

export async function GET(){
    try {
        const { userId, sessionClaims } = await auth();
        if (userId && sessionClaims?.metadata.role === 'admin'){

            const stats = await getStats();
            return new Response(JSON.stringify(stats), {status: 200});
        }
        return new Response('Unauthorized', {status: 401});
    } catch (error) {
        return new Response(`Error getting stats: ${JSON.stringify(error)}`, {status: 500});
    }
}