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

export async function getUserbyId(userId: string){
    try {
        const user = await prisma.user.findUnique({
            where:{
                id: userId
            }
        })
        return user;
    } catch (error) {
        console.error('error getting user by id', error);
        return null;
    }
}