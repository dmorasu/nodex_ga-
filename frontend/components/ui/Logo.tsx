import React from 'react'
import Image from 'next/image'

export default function Logo() {
  return (
    <Image src="/logonodexsimple.png" alt="Logo Nodex" width={400} height={100} priority/>
  )
}
