import prisma from "@/lib/prisma";
import { extractText } from "@/lib/textExtractor";
import { auth } from "@clerk/nextjs/server";
import { put } from '@vercel/blob'

export async function POST(req:Request){
    try {
        const {userId} = await auth();
        if (userId) {
            const formData = await req.formData();
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
            console.log('Form values', formValues);

            // upload files and get urls
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
            console.log('Case created', newCase);
        } else {
            return new Response('Unauthorized', {status: 401});
        }
        return new Response('Case created', {status: 200});
    } catch (error) {
        console.error('Error creating case', error);
        return new Response('Error creating case', {status: 500});
    }
}