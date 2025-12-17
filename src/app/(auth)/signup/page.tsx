import Image from "next/image"
import "@/src/styles/App.css"
import { SignupForm } from "@/src/components/user/signup-form"
import Link from "next/link"
import { GalleryVerticalEnd } from "lucide-react"

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left side - Form with background pattern */}
      <div className="relative bg-white ">
        <div className="pattern absolute inset-0 opacity-95" />
        <div className="relative z-10 flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <Link href="/" className="flex items-center gap-2 font-medium text-white">
              <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
              Cinemind
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-lg">
              <SignupForm />
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Image with background pattern */}
      <div className="relative hidden lg:flex lg:items-center lg:justify-center bg-primary">
        <div className="pattern absolute inset-0" />
        <div className="relative z-10">
          <Image
            src="/hero.png"
            alt="Signup"
            width={600}
            height={700}
            className="object-contain"
            unoptimized
          />
        </div>
      </div>
    </div>
  )
}
