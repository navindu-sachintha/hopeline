import { getCasesByAssignedUser } from "@/app/api/queries/case";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        console.log('Fetching assigned cases for user ID:', id);
        const cases = await getCasesByAssignedUser(id)
        if(cases){return new Response(JSON.stringify(cases), { status: 200 });}
        return new Response('No cases found', { status: 404 });
    } catch (error) {
        console.error('Error getting cases', error);
        return new Response('Error getting cases', { status: 500 });
    }
}