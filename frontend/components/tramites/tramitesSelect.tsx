"use client"

import { useEffect, useState } from "react"
import { TramitesSchema } from "@/src/schemas"

type Props = {
  name: string
  defaultValue?: number
}

export default function TramitesSelect({ name, defaultValue }: Props) {

  const [data, setData] = useState<{ id: number; nombreTramite: string }[]>([])
  const [selected, setSelected] = useState("")

  // Cargar opciones
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tramites`)
      .then(res => {
        if (!res.ok) throw new Error("Error al cargar Trámites")
        return res.json()
      })
      .then(json => {
        const result = TramitesSchema.parse(json)
        setData(result)
      })
      .catch(err => {
        console.error("Error cargando Trámites:", err)
        setData([])
      })
  }, [])

  // Aplicar defaultValue cuando llegan los datos
  useEffect(() => {
    if (defaultValue && data.length > 0) {
      setSelected(String(defaultValue))
    }
  }, [defaultValue, data])

  return (
    <select
      name={name}
      value={selected}
      onChange={(e) => setSelected(e.target.value)}
      className="w-full p-2 border rounded-md"
    >
      <option value="">Seleccione el Trámite</option>
      {data.map(op => (
        <option key={op.id} value={op.id}>
          {op.nombreTramite}
        </option>
      ))}
    </select>
  )
}
