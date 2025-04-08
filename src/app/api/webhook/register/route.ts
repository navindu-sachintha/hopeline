import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { type WebhookEvent } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { EmailService } from '@/services/email';

export async function POST(req:Request){
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if(!WEBHOOK_SECRET) {
        throw new Error('WEBHOOK_SECRET is not set');
    }

    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if(!svix_id || !svix_timestamp || !svix_signature){
        return new Response('Missing required headers');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const payload = await req.json();
    const body = JSON.stringify(payload);

    const webhook = new Webhook(WEBHOOK_SECRET);

    let evt:WebhookEvent;

    try {
        evt = webhook.verify(body,{
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature
        }) as WebhookEvent;
    } catch (error) {
        console.error("Error verifying webhook", error);
        return new Response('Error verifying webhook',{status: 400});
    }

    const {id} = evt.data;
    const eventType = evt.type;

    if(eventType === 'user.created'){
        try {
            const {email_addresses, primary_email_address_id,username} = evt.data;
            console.log('User created', email_addresses, primary_email_address_id);

            const primaryEmail = email_addresses.find(
                (email) => email.id === primary_email_address_id
            )

            if(!primaryEmail){
                console.error('Primary email not found');
                return new Response('Primary email not found',{status: 400});
            }

            // Create user in database
            const newUser = await prisma.user.create({
                data:{
                    username: username!,
                    id:evt.data.id,
                    email:primaryEmail.email_address,
                    dateJoined: new Date(evt.data.created_at)
                }
            })
            console.log('User created in database', newUser);

            // Send signup confirmation email
            const email = new EmailService();
            await email.sendSignupConfirmation({
                to: newUser.email,
                username: newUser.username
            })
            console.log('Signup confirmation email sent');


        } catch (error) {
            return new Response('Error creating user',{status: 500});
        }
    }

    return new Response("Webhook received",{status: 200});
}