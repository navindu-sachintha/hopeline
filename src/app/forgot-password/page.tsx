"use client"

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth, useSignIn } from '@clerk/nextjs'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const ForgotPasswordPage:NextPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [code, setCode] = useState('')
    const [successfulCreation, setSuccessfulCreation] = useState(false)
    const [error, setError] = useState('')

    const router = useRouter()
    const {isSignedIn} = useAuth()
    const { isLoaded, signIn, setActive } = useSignIn()

    if (!isLoaded) {
        return null
    }

    if (isSignedIn) {
        router.push('/dashboard')
    }

    async function create(e: React.FormEvent) {
        e.preventDefault()
        await signIn
          ?.create({
            strategy: 'reset_password_email_code',
            identifier: email,
          })
          .then((_) => {
            setSuccessfulCreation(true)
            setError('')
          })
          .catch((err) => {
            console.error('error', err.errors[0].longMessage)
            setError(err.errors[0].longMessage)
          })
    }

    async function reset(e: React.FormEvent) {
        e.preventDefault()
        await signIn
          ?.attemptFirstFactor({
            strategy: 'reset_password_email_code',
            code,
            password,
          })
          .then((result) => {
            if (result.status === 'complete') {
              setActive({ session: result.createdSessionId })
              setError('')
            } else {
              console.log(result)
            }
          })
          .catch((err) => {
            console.error('error', err.errors[0].longMessage)
            setError(err.errors[0].longMessage)
          })
      }

    const validatePasswords = (pass: string, confirmPass: string) => {
        if (pass !== confirmPass) {
          setError('Passwords do not match');
          return false;
        }
        if (pass.length < 8) {
          setError('Password must be at least 8 characters');
          return false;
        }
        setError('');
        return true;
      };
      
  return (
    <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Password Reset</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={!successfulCreation ? create : reset} className="space-y-4">
                        {!successfulCreation && (
                            <div className="space-y-2">
                                <Label htmlFor='email'>Email</Label>
                                <Input
                                    type='email'
                                    placeholder='Enter your email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                 />
                                 <Button className='w-full'>Send Password Reset Code</Button>
                            </div>
                        )}

                        {successfulCreation && (
                            <>
                                <div className="space-y-2">
                                    <Label>New Password</Label>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            value={password}
                                            placeholder='Enter your password'
                                            onChange={(e) => setPassword(e.target.value)}
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
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <div className="relative">
                                        <Input
                                        type={showPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                            validatePasswords(password, e.target.value);
                                        }}
                                        placeholder="Confirm your password"
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
                                    <Label htmlFor='password'>Enter the password reset code that was sent to your email</Label>
                                    <Input 
                                        type='text'
                                        placeholder='Enter the code'
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                    />
                                </div>
                                <Button className='w-full'>Reset</Button>
                            </>
                            
                        )}
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                    
                </form>
            </CardContent>
        </Card>
    </div>
  )
}

export default ForgotPasswordPage
