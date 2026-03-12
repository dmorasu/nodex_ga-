"use client"

import { useEffect, useState } from "react"
import { EntidadesSchema } from "@/src/schemas"

type Props = {
  name: string
  defaultValue?: number
}

export default function EntidadesSelect({ name, defaultValue }: Props) {

  const [data, setData] = useState<{ id: number; nombreEntidad: string }[]>([])
  const [selected, setSelected] = useState("")

  // Cargar entidades
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/entidad`)
      .then(res => {
        if (!res.ok) throw new Error("Error al cargar Entidades")
        return res.json()
      })
      .then(json => {
        const result = EntidadesSchema.parse(json)
        setData(result)
      })
      .catch(err => {
        console.error("Error cargando Entidades:", err)
        setData([])
      })
  }, [])

  // Aplicar valor por defecto cuando llegan los datos
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
      <option value="">Seleccione Entidad</option>
      {data.map(en => (
        <option key={en.id} value={en.id}>
          {en.nombreEntidad}
        </option>
      ))}
    </select>
  )
}
