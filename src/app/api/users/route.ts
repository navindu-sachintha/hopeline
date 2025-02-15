import prisma from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function POST(req:Request){
    try {
        const {sessionClaims} = await auth();
        const body = await req.json() as CreateUserParams;
        if (sessionClaims?.metadata.role !== 'admin'){
            return new Response('Unauthorized', {status: 401});
        }
        console.log('body',body);
        const clerk =  await clerkClient();
        const response = await clerk.users.createUser(body)
        if(response.id){
            const user = await prisma.user.create({
                data:{
                    username: response.username!,
                    id: response.id,
                    email: response.emailAddresses[0]!.emailAddress,
                    dateJoined: new Date(response.createdAt),
                }
            })
            if(!user){
                await clerk.users.deleteUser(response.id);
            }
            return new Response(JSON.stringify(response),{status: 200});
        }
        return new Response('Error creating user', {status: 401});
    } catch (error) {
        console.error("Error creating user", error);
        return new Response("Error creating user",{status: 500});
    }
}

export async function GET(req:Request){
    try {
        const {sessionClaims} = await auth();
        if (sessionClaims?.metadata.role !== 'admin'){
            return new Response('Unauthorized', {status: 401});
        }
        const clerk = await clerkClient();
        const response = await clerk.users.getUserList();
        return new Response(JSON.stringify(response.data),{status: 200});
    } catch (error) {
        console.error("Error getting user", error);
        return new Response("Error getting user",{status: 500});
    }
}