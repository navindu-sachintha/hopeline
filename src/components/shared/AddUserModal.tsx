import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

interface UserModalProps {
    onOpen: boolean;
    onClose: () => void;
}
const AddUserModal = ({onOpen, onClose}: UserModalProps) => {
    const {toast} = useToast();
    const [formData, setFormData] = useState<CreateUserParams>({
        username: '',
        emailAddress: [],
        password: '',
        publicMetadata: {
            role: "user"
        }
     });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const submit = async(e:React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);

            const response = await axios.post('/api/users', formData);

            if(response.status === 200){
                toast({
                    title: 'Success',
                    description: `User ${formData.username} added successfully`,
                })
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `${response.data}`,
                })
            }
            onClose();
            setLoading(false);
            setFormData({
                username: '',
                emailAddress: [],
                password: '',
                publicMetadata: {
                    role: "user"
                }
             });
        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'An error occured while adding user use console for more info',
            })
            setLoading(false);
        }
    }

  return (
    <Dialog open={onOpen} onOpenChange={onClose}>
        <DialogContent>
             <DialogTitle>Add User</DialogTitle>
            <form className="space-y-4" onSubmit={submit}>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <Label>Username</Label>
                        <Input 
                            name="username"
                            value={formData.username ?? ''}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            placeholder='Enter username'
                            required
                        />
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input
                            type="email" 
                            name="primaryEmailAddress"
                            value={formData.emailAddress ??  ''}
                            placeholder='Enter email address'
                            onChange={(e) => setFormData({ ...formData, emailAddress: [e.target.value] })}
                        />
                    </div>
                </div> 
                <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                        <Input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name='password'
                            value={formData.password ?? ''}
                            placeholder='Enter your password'
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                        >
                            {showPassword ? (
                            <EyeOffIcon className="h-4 w-4 text-gray-500" />
                            ) : (
                            <EyeIcon className="h-4 w-4 text-gray-500" />
                            )}
                        </button>
                        </div>
                </div>
                <div className="space-y-2">
                    <Label>Role</Label>
                    <Select onValueChange={(value) => setFormData({...formData, publicMetadata: {role:value}})}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a role"></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='admin'>Admin</SelectItem>
                            <SelectItem value='user'>User</SelectItem>
                            <SelectItem value='student_rep'>Student Rep</SelectItem>
                            <SelectItem value='proffessional'>Proffessional</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button className='w-full' variant='outline' disabled={loading}>
                    {loading && <Loader2 className='animate-spin'/>} 
                    Add User
                </Button>
            </form>
        </DialogContent>
    </Dialog>
  )
}


export default AddUserModal