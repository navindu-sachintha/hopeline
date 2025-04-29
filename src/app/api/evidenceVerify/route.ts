import { env } from "@/env";
import axios from "axios";

interface EvidenceData {
    text: string;
}

export async function POST(req:Request){
    try {

        const data = await req.json() as EvidenceData;
        const text = data.text;
        const  response = await axios.post(env.AI_INFERENCE_API_URL,{
            text
        })
        console.log('Response from AI Inference API:', response.data);
        return new Response(JSON.stringify(response.data), {status: 200});
    } catch (error) {
        console.error('Error verifying evidence', error);
        return new Response('Error verifying evidence', {status: 500});
    }
}