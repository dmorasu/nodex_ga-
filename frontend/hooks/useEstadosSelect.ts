'use client'
import { useEffect, useState } from 'react'

export function useEstados() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/estados`)
      .then(res => res.json())
      .then(setData)
  }, [])

  return { data }
}
