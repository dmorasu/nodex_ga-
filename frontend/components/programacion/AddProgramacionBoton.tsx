"use client"

import { useRouter, usePathname } from "next/navigation"
import { Calendar } from "lucide-react"

export default function AddProgramacionBoton() {

  const router = useRouter()
  const pathname = usePathname()

  return (
    <button
      type="button"
      className="
        flex items-center justify-center gap-2
        h-10 min-w-[140px]
        px-4
        bg-sky-400 text-white
        font-medium rounded-md
        transition-all
        hover:bg-white hover:text-sky-400
        hover:border border-sky-400
        focus:outline-none focus:ring-2 focus:ring-blue-400
      "
      onClick={() =>
        router.push(`${pathname}?addProgramacion=true&showModal=true`)
      }
    >
      <Calendar size={18} />
      Programación
    </button>
  )
}