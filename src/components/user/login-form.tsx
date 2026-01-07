"use client"

import { cn } from "@/lib/utils/utils"
import { Button } from "../ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  
} from "../ui/field"
import { Input } from "../ui/input"
import { useNotification } from "@/app/hooks/useNotification"
import { useRouter } from "next/navigation"
import { authAPI } from "@/lib/api/auth"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { setCurrentUser } from "@/lib/utils/auth-utils"

type LoginData = {
  email: string
  password: string
}

export function LoginForm({
  className,
  ...props
}: Omit<React.ComponentProps<"form">, "onSubmit">) {
  const router = useRouter()
  const notify = useNotification()
  const queryClient = useQueryClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const mutation = useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await authAPI.login(data.email, data.password)
      
      // Check if login failed
      if (!response?.success || !response.user) {
        const errorMsg = response?.error || 'Login failed'
        throw new Error(errorMsg)
      }
      
      // Login successful - Token is now in HTTP-only cookie (set by backend) - XSS safe!
      setCurrentUser(response.user)
      
      // CRITICAL: Invalidate auth cache so useAuthGate picks up the login immediately
      await queryClient.invalidateQueries({ queryKey: ['auth', 'user'] })
      
      notify.success('Login Successful', 'Welcome back!', 2000)
      router.push('/')
    },
    onError: (error: Error) => {
      setError(error.message)
      notify.loginFailed(error.message)
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    mutation.mutate({ email, password })
  }
  
  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        {error && (
          <div className="text-red-500 text-sm text-center">
            {error}
          </div>
        )}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input 
            id="email" 
            type="email" 
            placeholder="m@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline hover:text-purple-400"
            >
              Forgot your password?
            </a>
          </div>
          <Input 
            id="password" 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </Field>
        <Field>
          <Button className="bg-purple-500" type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Logging in...' : 'Login'}
          </Button>
        </Field>
      
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="underline underline-offset-4 hover:text-purple-400">
              Sign up
            </a>
          </FieldDescription>
        
      </FieldGroup>
    </form>
  )
}
