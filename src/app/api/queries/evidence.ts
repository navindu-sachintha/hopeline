import prisma from "@/lib/prisma";

export async function addEvidence(caseId: string, url: string, userId:string){
    try {
        const newEvidence = await prisma.evidence.create({
            data:{
                uploadedBy:{
                    connect:{id: userId}
                },
                case: {
                    connect: {id: caseId}
                },
                url: url,
            }
        })
    } catch (error) {
        console.error(`error adding evidence for case ${caseId}`, error);        
    }
}

export async function addEvidenceAnonymous(caseId: string, url: string, anonymousId:string){
    try {
        const newEvidence = await prisma.evidence.create({
            data:{
                uploadedByAnonymous:{
                    connect:{anonymousId: anonymousId}
                },
                case: {
                    connect: {id: caseId}
                },
                url: url,
            }
        })
    } catch (error) {
        console.error(`error adding evidence for case ${caseId}`, error);        
    }
}