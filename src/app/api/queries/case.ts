import { env } from "@/env";
import prisma from "@/lib/prisma";
import { extractText } from "@/lib/textExtractor";
import type { Prediction } from "@/types/globals";
import { CaseStatus } from "@prisma/client";
import { del, put } from "@vercel/blob";
import axios from "axios";
import { addEvidence, addEvidenceAnonymous } from "./evidence";
import { createAnonymousUser } from "./user";

export async function createCase(userId: string, formData: FormData) {
    try {
        const files = formData.getAll('evidenceFiles') as File[];
        const formValues = Object.fromEntries(
            Array.from(formData.entries()).map(([key, value]) => {
                if (key !== 'evidenceFiles') {
                    try {
                        return [key, JSON.parse(value as string)];
                    } catch {
                        return [key, value];
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
                title: formValues.title,
                description: formValues.description,
                incidentHappenedTo: formValues.incidentHappenedTo,
                incidentTypes: formValues.incidentTypes.split(','),
                incidentConnections: formValues.incidentConnections.split(','),
                reporterConnection: formValues.reporterConnection,
                affectedConnection: formValues.affectedConnection,
                perpetratorConnection: formValues.perpetratorConnection,
                consentToReport: formValues.consentToReport,
                consentToUpload: formValues.consentToUpload,
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
                        return [key, value];
                    }
                }
                return [key, value];
            })
        );
        const newCase = await prisma.case.create({
            data: {
                reportedByAnonymous:{
                    connect:{anonymousId: userId}
                },
                title: formValues.title,
                description: formValues.description,
                incidentHappenedTo: formValues.incidentHappenedTo,
                incidentTypes: formValues.incidentTypes.split(','),
                incidentConnections: formValues.incidentConnections.split(','),
                reporterConnection: formValues.reporterConnection,
                affectedConnection: formValues.affectedConnection,
                perpetratorConnection: formValues.perpetratorConnection,
                consentToReport: formValues.consentToReport,
                consentToUpload: formValues.consentToUpload,
                anonymousReason: formValues.anonymousReason.split(',')
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

export async function createAnonymousCase(formData: any){
    try {
        const formValues = Object.fromEntries(formData.entries());
        console.log('Creating anonymous case', formData);
        const anonymousCase = await prisma.case.create({
            data:{
                userId: 'anonymous',
                title: "Anonymous Case",
                description: "Anonymous Case",
                incidentHappenedTo: formValues.incidentHappenedTo as string,
                incidentDescription: formValues.incidentDescription as string,
                incidentConnection: formValues.incidentConnection as string,
                reporterConnection: formValues.yourConnection as string,
                affectedConnection: formValues.affectedPersonConnection as string,
                perceptorConnection: formValues.allegedPerpetratorConnection as string,
                anonymous: true,
                anonymousReason: formValues.anonymousReason as unknown as string[]
            }
        })
    } catch (error) {
        console.error('Error creating anonymous case', error);
        
    }
}

export async function getCases(userId: string){
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
                evidenceUrls:true
            }
        })
    } catch (error) {
        console.error(`error getting cases for user ${userId}`, error);
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
    }
}

export async function deleteCase(id:string){
    try {
        const deletedCase = await prisma.case.delete({
            where:{
                id: id
            }
        })
        if (deletedCase.evidenceUrls){
            for (const url of deletedCase.evidenceUrls){
                await del(url)
            }
        }
        console.log(`Case with id ${id} deleted`);
    } catch (error) {
        console.error(`error deleting case with id ${id}`, error);
    }
}

export async function getAllCases(){
    try {
        return await prisma.case.findMany({})
    } catch (error) {
        console.error('error getting all cases', error);
    }
}

export async function processCaseEvidence(id:string){
    try {
        const caseData = await prisma.case.findUnique({
            where: {
            id: id
            }
        });

        if (caseData){
            const evidenceUrls = caseData.evidenceUrls;
            let extractedString = '';
            if (evidenceUrls){
                for (const url of evidenceUrls){
                    const text =  await extractText(url);
                    extractedString += text;
                }
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
    }
}