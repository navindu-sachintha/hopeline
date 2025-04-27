export async function POST(req:Request){
    try {

        const data = await req.json() as string;
        console.log('Data received:', data);
        return new Response('Evidence verified', {status: 200});
    } catch (error) {
        console.error('Error verifying evidence', error);
        return new Response('Error verifying evidence', {status: 500});
    }
}