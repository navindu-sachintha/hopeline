import { auth, clerkClient } from "@clerk/nextjs/server";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const role = searchParams.get('role');
    
    const { sessionClaims } = await auth();
    
    if (sessionClaims?.metadata.role !== 'admin') {
      return new Response('Unauthorized', { status: 401 });
    }
    
    if (!role) {
      return new Response('Role parameter is required', { status: 400 });
    }
    
    const clerk = await clerkClient();
    const users = await clerk.users.getUserList();
    const filteredUsers = users.data.filter(user => user.publicMetadata.role === role);

    return new Response(JSON.stringify(filteredUsers), { status: 200 });
  } catch (error) {
    console.error('Error fetching users by role:', error);
    return new Response('Error fetching users', { status: 500 });
  }
}