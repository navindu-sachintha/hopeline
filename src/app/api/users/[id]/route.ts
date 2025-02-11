import prisma from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function PATCH(req:Request,route:{params:{id:string}}){
    try {
        const {sessionClaims} = await auth();
        const {id} = route.params;
        const body = await req.json() as Partial<UpdateUserParams>;
        console.log('id',id);
        console.log('body',body);
        if (sessionClaims?.metadata.role !== 'admin'){
            return new Response('Unauthorized', {status: 401});
        }
        const clerk =  await clerkClient();
        const response = clerk.users.updateUser(id,body)
        return new Response(JSON.stringify(response),{status: 200});
    } catch (error) {
        console.error("Error updating user", error);
        return new Response("Error updating user",{status: 500});
    }
}

export async function DELETE(req:Request,route:{params:{id:string}}){
    try {
        const {sessionClaims} = await auth();
        const {id} = route.params;
        if (sessionClaims?.metadata.role !== 'admin'){
            return new Response('Unauthorized', {status: 401});
        }
        const clerk =  await clerkClient();
        const response = await clerk.users.deleteUser(id)

        if(response.id){
            await prisma.user.delete({
                where:{
                    id: response.id
                }
            })
            return new Response("User Deleted Successfully",{status: 200});
        }
    } catch (error) {
        console.error("Error deleting user", error);
        return new Response("Error deleting user",{status: 500});
    }
}