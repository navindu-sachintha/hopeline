import prisma from "@/lib/prisma";

export async function getStats(){
    try {
        const totalCases = await prisma.case.count();
        const totalRegisteredUsers = await prisma.user.count();
        const newCases = await prisma.case.count({
            where:{
                status: 'OPEN'
            }
        });
        const processingCases = await prisma.case.count({
            where:{
                status: 'PROCESSING'
            },
            orderBy:{
                dateCreated: 'desc'
            },
            take: 10
        });
        const recentCases = await prisma.case.findMany({
            orderBy:{
                dateCreated: 'desc'
            },
            take: 10
        })
        return {
            totalCases,
            totalRegisteredUsers,
            newCases,
            processingCases,
            recentCases
        }
    } catch (error) {
        console.error('Error getting stats', error);
    }
}