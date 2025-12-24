"use client";

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const DEBOUNCE_MS = 400

export default function Search() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const initialValue = useMemo(() => searchParams.get('q') ?? '', [searchParams])
  const [value, setValue] = useState(initialValue)

  // keep input in sync when the URL changes externally
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const handle = setTimeout(() => {
      const params = new URLSearchParams()
      if (value.trim()) {
        params.set('q', value.trim())
        params.set('page', '1')
      }
      
      const queryString = params.toString()
      const nextUrl = queryString ? `${pathname}?${queryString}` : pathname
      
      router.replace(nextUrl, { scroll: false })
    }, DEBOUNCE_MS)

    return () => clearTimeout(handle)
  }, [value, router, pathname])

  return (
    <div className="search">
      <div>
        <Image src="/search.svg" alt="search" width={20} height={20} />

        <input
          type="text"
          placeholder="Search through thousands of movies"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  )
}
