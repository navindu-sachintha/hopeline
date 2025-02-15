import { getFilteredCasesPaginated } from "@/app/api/queries/case";
import { auth } from "@clerk/nextjs/server";
import { CaseStatus } from "@prisma/client";

export async function GET(req:Request){
    try {
        const url = new URL(req.url);
        const params = new URLSearchParams(url.search);

        const status = params.get('status') ?? CaseStatus.OPEN;
        const page = parseInt(params.get('page') ?? '1', 10);
        const limit = parseInt(params.get('limit') ?? '10', 10);

        const {sessionClaims} = await auth();
        if (sessionClaims?.metadata.role === 'admin'){
            const paginatedCases = await getFilteredCasesPaginated(status,{page, limit});
            return new Response(JSON.stringify(paginatedCases), {status: 200});
        } else {
            return new Response('Unauthorized', {status: 401});
        }
    } catch (error) {
        console.error('Error getting cases', error);
        return new Response('Error getting cases', {status: 500});
    }
}