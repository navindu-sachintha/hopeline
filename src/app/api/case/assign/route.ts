import { auth } from "@clerk/nextjs/server";
import { assignCase } from "../../queries/case";
import type { Roles } from "@/types/globals";

export async function POST(req:Request){
    try {
        const {userId, sessionClaims} = await auth();

        if (!userId || sessionClaims?.metadata.role !== 'admin') {
            return new Response('Unauthorized', { status: 401 });
          }
          
          const { caseId, assignToUserId, role } = await req.json() as { caseId: string, assignToUserId: string, role: Roles };
          
          if (!caseId || !assignToUserId || !role) {
            return new Response('Missing required fields', { status: 400 });
          }
          
          const result = await assignCase(caseId , assignToUserId);
          return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        console.error('Error assigning case:', error);
        return new Response(`Error assigning case: ${(error as Error).message}`, { status: 500 });
    }
}