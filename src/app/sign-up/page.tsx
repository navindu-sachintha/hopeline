/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

const SignUp = () => {
    const {isLoaded, signUp, setActive} = useSignUp();
    const nsbmEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]*nsbm\.ac\.lk$/;

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [pendingVerification, setPendingVerification] = React.useState(false);
    const [verificationCode, setVerificationCode] = React.useState('');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const [error, setError] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);

    const router = useRouter();

    const validateEmail = (email: string) => {
        return nsbmEmailRegex.test(email);
    };
    // validate password
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

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    async function submit(e: React.FormEvent) {
        e.preventDefault();

        if(!isLoaded) return;

        try {
            // sign up user with clerk
            await signUp.create({
                emailAddress: email,
                password: password
            })

            // set clerk verification
            await signUp.prepareEmailAddressVerification({
                strategy: 'email_code'
            })
            setPendingVerification(true);
        }catch(e:any) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            console.log(JSON.stringify(e));
            setError(e.errors[0].message);
        }
    }

    async function verify(e: React.FormEvent) {
        e.preventDefault();

        if(!isLoaded) return;
        try{
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code: verificationCode
            })

            if(completeSignUp.status !== 'complete'){
                console.log('Verification failed: ', JSON.stringify(completeSignUp));
            }
            if(completeSignUp.status === 'complete'){
                await setActive({session:completeSignUp.createdSessionId})
                router.push('/dashboard');
            }
        
        }catch(e:any) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            console.log(JSON.stringify(e));
            setError(e.errors[0].message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Sign Up for Keep Hopes Alive
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!pendingVerification ? (
            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (!validateEmail(e.target.value) && e.target.value) {
                      setError('Please use a valid NSBM email address (@nsbm.ac.lk)');
                    } else {
                      setError('');
                    }
                  }}
                  placeholder="Enter your NSBM email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
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
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button 
                type="submit"
                className="w-full"
                disabled={!!error}
                variant={error ? "secondary" : "default"}>
                Sign Up
              </Button>
            </form>
          ) : (
            <form onSubmit={verify} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter verification code"
                  required
                />
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full">
                Verify Email
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
    )
  
}

export default SignUp