import prisma from "@/lib/prisma";
import { extractText } from "@/lib/textExtractor";
import { del, put } from "@vercel/blob";

export async function createCase(userId: string, formData: FormData) {
    try {
        const files = formData.getAll('files') as File[];
        const formValues = Object.fromEntries(
            Array.from(formData.entries()).map(([key, value]) => {
                if (key !== 'files') {
                    try {
                        return [key, JSON.parse(value as string)];
                    } catch {
                        return [key, value];
                    }
                }
                return [key, value];
            })
        );

        const urls = [];
        for (const file of files) {
            const blob = await put(`cases/${userId}/${file.name}`, file, {
                access: 'public',
                addRandomSuffix: false
            })
            urls.push(blob.url);
        }

        // perform OCR
        let text = '';
        for (const url of urls) {
            text += await extractText(url);
        }

        const newCase = await prisma.case.create({
            data:{
                userId: userId,
                title: formValues.caseName as string,
                description: formValues.description as string,
                evidenceUrls: urls,
                extractedString: text,
                incidentHappenedTo: formValues.incidentHappenedTo as string,
                incidentDescription: formValues.incidentDescription as string,
                incidentConnection: formValues.incidentConnection as string,
                reporterConnection: formValues.yourConnection as string,
                affectedConnection: formValues.affectedPersonConnection as string,
                perceptorConnection: formValues.allegedPerpetratorConnection as string,
            }
        })
        console.log('Case created', newCase.id);
    } catch (error) {
        console.error('Error creating case', error);
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