import prisma from "@/lib/prisma";

export async function createAnonymousUser(ip: string){
    try {
        const anonymousUser = await prisma.anonymousUser.create({
            data:{
                ipAddress: ip
            }
        })
        return anonymousUser.anonymousId;
    } catch (error) {
        console.error('error creating anonymous user', error);
    }
}