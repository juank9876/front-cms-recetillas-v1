// app/not-found.tsx
'use client'

import { Link } from "@/components/juankui/optionals/link"


export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-white text-black dark:text-white">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-2">The page does not exist.</p>
      <Link href="/" className="mt-4 text-blue-500 underline">
        Home
      </Link>
    </div>
  )
}
