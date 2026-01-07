"use client"

import { cn } from "@/lib/utils/utils"
import { Button } from  "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "../ui/field"
import { Input } from "../ui/input"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useNotification } from "@/hooks/useNotification"
import { authAPI } from "@/lib/api"
import { setCurrentUser } from "@/lib/utils/auth-utils"

type SignupData = {
  email: string
  username: string
  password: string
}

export function SignupForm({
  className,
  initial = {},
  ...props
}: Omit<React.ComponentProps<"form">, "onSubmit"> & {
  initial?: Partial<SignupData>
}) {
  const router = useRouter()
  const notify = useNotification()
  
  const [formData, setFormData] = useState<SignupData>({
    email: "",
    password: "",
    username: "",
    ...initial,
  })
  const [error, setError] = useState("")

  const mutation = useMutation({
    mutationFn: async (data: SignupData) => {
      const response = await authAPI.register(data)
      // Token is now in HTTP-only cookie (set by backend) - XSS safe!
      if (response?.success && response.user) {
        setCurrentUser(response.user)
        notify.success("Account created successfully", "Welcome!", 2000)
        router.push("/")
      } else {
        const errorMsg = response?.error || "Signup failed"
        notify.error("Signup Failed", errorMsg)
        throw new Error(errorMsg)
      }
    },
    onError: (err: unknown) => {
      if (err instanceof Error) {
        setError(err.message)
      } else if (typeof err === "string") {
        setError(err)
      } else {
        setError("An error occurred")
      }
    },
    onSuccess: () => {
      setError("")
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    mutation.mutate(formData)
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold text-white">Create your account</h1>
          <p className="text-light-200 text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="username" className="text-white">Username</FieldLabel>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="john_doe"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email" className="text-white">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <FieldDescription className="text-light-200">
            We&apos;ll use this to contact you. We will not share your email
            with anyone else.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="password" className="text-white">Password</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <FieldDescription className="text-light-200">
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Field>
          <Button type="submit" disabled={mutation.isPending} className="bg-purple-600 hover:bg-purple-700 text-white">
            {mutation.isPending ? "Creating Account..." : "Create Account"}
          </Button>
        </Field>
    
          <FieldDescription className="text-center text-light-200">
            Already have an account? <a href="/login" className="text-white font-semibold hover:!text-purple-400 hover:underline">Sign in</a>
          </FieldDescription>
        
      </FieldGroup>
    </form>
  )
}
