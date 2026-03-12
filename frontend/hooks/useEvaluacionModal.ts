import { useState } from "react"

export function useEvaluacionModal() {
  const [open, setOpen] = useState(false)
  const [solicitudId, setSolicitudId] = useState<number | null>(null)

  const abrir = (id: number) => {
    setSolicitudId(id)
    setOpen(true)
  }

  const cerrar = () => {
    setOpen(false)
    setSolicitudId(null)
  }

  return { open, solicitudId, abrir, cerrar }
}