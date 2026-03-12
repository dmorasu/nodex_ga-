"use client"

import { useEffect, useState } from "react"
import { OperacionesSchema, OperacionSchema,  } from "@/src/schemas"

type Props = {
  name: string
  defaultValue?: number
  
}

export default function OperacionesSelect({ name, defaultValue }: Props) {

  const [data, setData] = useState<{ id: number; nombreOperacion: string}[]>([])
  const [selected, setSelected] = useState("")

  // Cargar opciones
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/operaciones`)
      .then(res => {
        if (!res.ok) throw new Error("Error al cargar las Operaciones")
        return res.json()
      })
      .then(json => {
        const result = OperacionesSchema.parse(json)
        setData(result)
      })
      .catch(err => {
        console.error("Error cargando las Operaciones:", err)
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
      <option value="">Seleccione la Operacion</option>
      {data.map(op => (
        <option key={op.id} value={op.id}>
          {op.nombreOperacion}
        </option>
      ))}
    </select>
  )
}
