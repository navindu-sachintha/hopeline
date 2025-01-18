import { auth } from "@clerk/nextjs/server";
import { deleteCase, getCaseById, processCaseEvidence } from "../../queries/case";

export async function GET(req:Request,route:{params:{id:string}}){
    try {
        const { userId } = await auth();
        const caseId = route.params.id
        if (userId){
            const caseData = await getCaseById(caseId);
            return new Response(JSON.stringify(caseData), {status: 200});
        }
        return new Response('Unauthorized', {status: 401});
    } catch (error) {
        console.error('Error getting case', error);
        return new Response('Error getting case', {status: 500});
    }
}

export async function DELETE(req:Request,route:{params:{id:string}}){
    try {
        const { userId } = await auth();
        const caseId = route.params.id
        if ( userId){
            await deleteCase(caseId);
            return new Response('Case deleted', {status: 200});
        }
        return new Response('Unauthorized', {status: 401});
    } catch (error) {
        console.error('Error deleting case', error);
        return new Response('Error deleting case', {status: 500});
    }
}

export async function PUT(req:Request,route:{params:{id:string}}){
    try {
        const processedEvidence = await processCaseEvidence(route.params.id);
        if (processedEvidence){
            return new Response(JSON.stringify(processedEvidence), {status: 200});
        }
    } catch (error) {
        console.error('Error processing evidence', error);
        return new Response('Error processing evidence', {status: 500});
    }
}