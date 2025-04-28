"use client"

import React, { useState } from "react";
import type { User } from "@clerk/nextjs/server";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import axios from "axios";

interface EditUserModalProps {
    onOpen: boolean;
    onClose: () => void;
    user: User;
}
export const EditUserModal = ({onOpen, onClose, user}: EditUserModalProps) => {
    const {toast} = useToast()
    const [formData, setFormData] = useState<Partial<UpdateUserParams>>({
        username: user?.username ?? '',
        publicMetadata: {
            role: (user?.publicMetadata.role as string) || ''
        }
    })

    const edit = async(e:React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`/api/users/${user.id}`, formData);
            if(response.status === 200){
                toast({
                    title: 'Success',
                    description: 'User details updated successfully',
                })
                onClose();
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: `${response.data}`,
                })
            }
        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'An error occurred while updating user details. see console for more details',
            })
        }
    }
    return (
        <Dialog open={onOpen}onOpenChange={onClose}>
            <DialogContent>
                <DialogTitle>Edit User Details</DialogTitle>
                <form onSubmit={edit}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Username</Label>
                            <Input 
                                name="username"
                                value={formData.username ?? ''}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            />
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
                                    <SelectItem value='professional'>Professional</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Button className="w-full mt-4" type='submit' variant='outline'>Update</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}