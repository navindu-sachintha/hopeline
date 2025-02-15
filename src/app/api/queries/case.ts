import { env } from "@/env";
import prisma from "@/lib/prisma";
import { extractText } from "@/lib/textExtractor";
import type { Prediction } from "@/types/globals";
import { CaseStatus } from "@prisma/client";
import { del, put } from "@vercel/blob";
import axios from "axios";
import { addEvidence, addEvidenceAnonymous } from "./evidence";
import { createAnonymousUser } from "./user";

interface PaginationOptions {
    page: number;
    limit: number;
}

export async function createCase(userId: string, formData: FormData) {
    try {
        const files = formData.getAll('evidenceFiles') as File[];
        const formValues: Record<string, string | boolean> = Object.fromEntries(
            Array.from(formData.entries()).map(([key, value]) => {
                if (key !== 'evidenceFiles') {
                    try {
                        return [key, JSON.parse(value as string)];
                    } catch {
                        return [key, value as string];
                    }
                }
                return [key, value];
            })
        );
        console.log('Form values', formValues);
        const newCase = await prisma.case.create({
            data: {
                reportedByUser: {
                    connect: { id: userId }
                },
                title: formValues.title as string,
                description: formValues.description as string,
                incidentHappenedTo: formValues.incidentHappenedTo as string,
                incidentTypes: typeof formValues.incidentTypes === 'string' ? formValues.incidentTypes.split(',') : [],
                incidentConnections: typeof formValues.incidentConnections === 'string' ? formValues.incidentConnections.split(',') : [],
                reporterConnection: formValues.reporterConnection as string,
                affectedConnection: formValues.affectedConnection as string,
                perpetratorConnection: formValues.perpetratorConnection as string,
                consentToReport: formValues.consentToReport as boolean,
                consentToUpload: formValues.consentToUpload as boolean,
            }
        })
        console.log('Case created', newCase.id);
        console.log('Files', files);

        if( files.length > 0){
            for(const file of files){
                const blob = await put(`evidence/${userId}/${file.name}`,file,{
                    access: 'public',
                    addRandomSuffix: false
                })
                await addEvidence(newCase.id, blob.url, userId);
            }
        }

        return newCase.id;
    } catch (error) {
        console.error('Error creating case', error);
        throw new Error('Error creating case');
    }
}

export async function createAnonymousCase( formData: FormData, ipAddress: string) {
    try {
        const userId = await createAnonymousUser(ipAddress);
        console.log('User created', userId);
        const files = formData.getAll('evidenceFiles') as File[];
        const formValues = Object.fromEntries(
            Array.from(formData.entries()).map(([key, value]) => {
                if (key !== 'evidenceFiles') {
                    try {
                        return [key, JSON.parse(value as string)];
                    } catch {
                        return [key, value as string];
                    }
                }
                return [key, value as string];
            })
        );
        const newCase = await prisma.case.create({
            data: {
                reportedByAnonymous:{
                    connect:{anonymousId: userId}
                },
                title: formValues.title as string,
                description: formValues.description as string,
                incidentHappenedTo: formValues.incidentHappenedTo as string,
                incidentTypes: typeof formValues.incidentTypes === 'string' ? formValues.incidentTypes.split(',') : [],
                incidentConnections: typeof formValues.incidentConnections === 'string' ? formValues.incidentConnections.split(',') : [],
                reporterConnection: formValues.reporterConnection as string,
                affectedConnection: formValues.affectedConnection as string,
                perpetratorConnection: formValues.perpetratorConnection as string,
                consentToReport: formValues.consentToReport as boolean,
                consentToUpload: formValues.consentToUpload as boolean,
                anonymousReason: typeof formValues.anonymousReason === 'string' ? formValues.anonymousReason.split(',') : [],
            }
        })
        console.log('Case created', newCase.id);
        console.log('Files', files);

        if( files.length > 0){
            for(const file of files){
                const blob = await put(`evidence/${userId}/${file.name}`,file,{
                    access: 'public',
                    addRandomSuffix: false
                })
                await addEvidenceAnonymous(newCase.id, blob.url, userId!);
            }
        }

        return newCase.id;
    } catch (error) {
        console.error('Error creating case', error);
        throw new Error('Error creating case');
    }
}

export async function getCasesByUser(userId: string){
    try {
        return await prisma.case.findMany({
            where:{
                userId: userId
            },
            select:{
                id:true,
                title:true,
                description:true,
                status:true,
                dateCreated:true,
                toxic:true,
                userId:true,
                Evidence:{
                    select:{
                        url:true,
                        uploadedAt:true,
                        id:true
                    }
                }
            }
        })
    } catch (error) {
        console.error(`error getting cases for user ${userId}`, error);
        throw new Error(`Error getting cases for user ${userId}`);
    }
}

export async function getCaseById(id: string){
    try {
        return await prisma.case.findUnique({
            where:{
                id: id
            }
        })
    } catch (error) {
        console.error(`error getting case with id ${id}`, error);
        throw new Error(`Error getting case with id ${id}`);
    }
}

export async function deleteCase(id:string){
    try {
        const evidenceRecords = await prisma.evidence.findMany({
            where:{
                caseId: id
            }
        })
        if(evidenceRecords){
            await Promise.all(
                evidenceRecords.map(async (evidence) => {
                    try {
                        await del(evidence.url)
                    } catch (error) {
                        console.error(`error deleting evidence with url ${evidence.id}`, error);
                    }
                })
            )
        }
        await prisma.evidence.deleteMany({
            where:{
                caseId: id
            }
        })
        const deletedCase = await prisma.case.delete({
            where:{
                id: id
            }
        })
        
        console.log(`Case with id ${id} deleted`);
        return deletedCase;
    } catch (error) {
        console.error(`error deleting case with id ${id}`, error);
        throw new Error(`Error deleting case with id ${id}`);
    }
}
export async function deleteCasesByUser(userId:string){
    try {
        const user = await prisma.user.findUnique({
            where:{
                id: userId
            }
        })
        if(user){
            const cases = await prisma.case.findMany({
                where:{
                    userId: userId
                }
            })
            if(cases){
                await Promise.all(
                    cases.map(async (c) => {
                        await deleteCase(c.id)
                    })
                )
            }
        }
    } catch (error) {
        console.error(`error deleting cases for user ${userId}`, error);
        throw new Error(`Error deleting cases for user ${userId}`);
    }
}
export async function getAllCases(){
    try {
        return await prisma.case.findMany({})
    } catch (error) {
        console.error('error getting all cases', error);
        throw new Error('Error getting all cases');
    }
}

export async function processCaseEvidence(id:string){
    try {
        const evidenceRecords = await prisma.evidence.findMany({
            where:{
                caseId: id
            }
        })

        if (evidenceRecords){
            let extractedString = '';
            for (const evidence of evidenceRecords){
                const text = await extractText(evidence.url);
                extractedString += text;
            }
            const response = await axios.post<Array<{label: Prediction}>>(env.AI_INFERENCE_API_URL,{
                text: extractedString
            });

            if (response.status === 200 && response.data[0]){
                const prediction: Prediction = response.data[0].label;
                let updatedCase;
                if (prediction === 'toxic'){
                    updatedCase = await prisma.case.update({
                        where:{
                            id: id
                        },
                        data:{
                            toxic: true,
                            status: CaseStatus.PROCESSING
                        }
                    })
                } else {
                    updatedCase = await prisma.case.update({
                        where:{
                            id:id
                        },
                        data:{
                            toxic: false,
                            status: CaseStatus.PROCESSING
                        }
                    })
                }
                return updatedCase;
            }
        }

    } catch (error) {
        console.error('Error processing evidence', error);
        throw new Error('Error processing evidence');
    }
}

export async function getFilteredCasesPaginated(
    status:string,
    { page = 1, limit = 10 }:PaginationOptions
){
    try {
        const skip = (page - 1) * limit;
        const [cases, totalCases] = await Promise.all([
            prisma.case.findMany({
                skip,
                take: limit,
                where:{
                    status: status as CaseStatus
                },
                select:{
                    id:true,
                    title:true,
                    description:true,
                    status:true,
                    dateCreated:true,
                    toxic:true,
                    userId:true,
                    reportedByUser:{
                        select:{
                            username:true,
                            email:true,
                        }
                    },
                    reportedByAnonymous:{
                        select:{
                            ipAddress:true
                        }
                    },
                    Evidence:{
                        select:{
                            url:true,
                            uploadedAt:true,
                            id:true
                        }
                    }
                }
            }),
            prisma.case.count()
        ])
        return {
            cases,
            totalCases,
            page,
            totalPages: Math.ceil(totalCases / limit)
        }
    } catch (error) {
        console.error('error getting cases paginated', error);
        throw new Error('Error getting cases paginated');
    }
}