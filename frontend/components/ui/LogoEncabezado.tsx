import React from 'react'
import Image from 'next/image'

export default function Logo() {
  return (
    <Image
  src="/logoblanconodex_.png"
  alt="Logo Nodex"
  width={300}
  height={600}
  className="h-auto w-56 "  // agrega h-auto para mantener proporción
  priority
/>
  )
}
