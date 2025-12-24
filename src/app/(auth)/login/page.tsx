import { GalleryVerticalEnd } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { LoginForm } from "@/components/user/login-form"
import "@/styles/App.css"

export default function LoginPage() {
  return (
     <div className="grid min-h-svh lg:grid-cols-2">
    <div className="relative bg-white">
     <div className="pattern absolute inset-0 opacity-95" />
        <div className="relative z-10 flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Cinemind
          </Link>
        </div>
        <div className="flex flex-1  items-center justify-center">
          <div className="pt-20 w-full max-w-lg">
            <LoginForm />
          </div>
        </div>
    </div>
      </div>
   <div className="relative hidden lg:flex lg:items-center lg:justify-center bg-primary">
         <div className="pattern absolute inset-0" />
         <div className="relative z-10">
           <Image
             src="/hero.png"
             alt="login"
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