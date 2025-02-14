'use client'
import Link from 'next/link'
import { useState } from 'react'
import { photos } from './_data'

export default function page() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="flex flex-wrap items-center justify-center gap-8">
        {photos.map(({ id, src }) => (
          <Link key={id} href={`/agent/photo/${id}`} scroll={false}>
            <img width="200" src={src} className="m-1 cursor-pointer" />
          </Link>
        ))}
      </div>
    </div>
  )
}
