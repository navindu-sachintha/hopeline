"use client"
import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import AddUserModal from '../shared/AddUserModal'
import { Button } from '../ui/button'
import axios from 'axios'
import type { User } from '@clerk/nextjs/server'
import { Edit, Trash } from 'lucide-react'
import { EditUserModal } from '../shared/EditUserModal'
import { useToast } from '@/hooks/use-toast'

const UserMngmt = () => {
  const {toast} = useToast();
  const [open, setOpen] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [openEdit, setOpenEdit] = useState(false)

  const fetchUsers = async() => {
    try {
      const response = await axios.get('/api/users');
      if(response.status === 200){
        setUsers(response.data as User[]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const deleteUser = async(id:string) => {
    try {
      if(confirm('Are you sure you want to delete this user?')){
        const response = await axios.delete(`/api/users/${id}`);
        if(response.status === 200){
          toast({
            title: "Success",
            description: "User deleted successfully",
          })
          void fetchUsers();
        }
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: "Error",
        description: "An error occured while deleting user use console for more info",
      })
    }
  }
  useEffect(() => {
    void fetchUsers();
  },[])

  if(users.length === 0) return <div>Loading...</div>

  return (
    
    <div className="overflow-x-auto">
        <Button onClick={() => setOpen(true)}>Add User</Button>
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.emailAddresses[0]?.emailAddress}</TableCell>
                <TableCell>{String(user.publicMetadata.role)}</TableCell>
                <TableCell>
                  <Button variant='link' size='sm' onClick={() =>{ 
                    setOpenEdit(true)
                    setSelectedUser(user)
                    }}>
                    <Edit />
                  </Button>
                  <Button variant='link' size='sm' onClick={() => deleteUser(user.id)}>
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
          ))}
        </TableBody>
        </Table>
        {selectedUser && <EditUserModal user={selectedUser} onOpen={openEdit} onClose={() => {setOpenEdit(false); setSelectedUser(null)}}/>}
       <AddUserModal onOpen={open} onClose={() => {setOpen(false); void fetchUsers()}}/>
    </div>
  )
}

export default UserMngmt