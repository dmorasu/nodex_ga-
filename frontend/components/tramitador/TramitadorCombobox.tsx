"use client"

import { useEffect, useState } from "react"

type Tramitador = {
  id: number
  nombreTramitador: string
  identificacion: string
}

type Props = {
  name: string
  defaultValue?: number
  defaultLabel?: string   // 👈 nombre que llega desde ModalContainer
}

export default function TramitadorComboBox({
  name,
  defaultValue,
  defaultLabel
}: Props) {

  const [query, setQuery] = useState("")
  const [data, setData] = useState<Tramitador[]>([])
  const [selected, setSelected] = useState<Tramitador | null>(null)
  const [open, setOpen] = useState(false)

  // 🔹 Inicializar selección cuando ya hay tramitador asignado
  useEffect(() => {
    if (defaultValue !== undefined && defaultLabel) {
      setSelected({
        id: defaultValue,
        nombreTramitador: defaultLabel,
        identificacion: ""   // no es necesario para mostrar
      })
    }
  }, [defaultValue, defaultLabel])

  // 🔹 Búsqueda dinámica
  useEffect(() => {
    if (query.length < 2) {
      setData([])
      return
    }

    const controller = new AbortController()

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tramitador?search=${query}`, {
      signal: controller.signal
    })
      .then(res => res.json())
      .then(setData)
      .catch(() => setData([]))

    return () => controller.abort()
  }, [query])

  return (
    <div className="relative">

      {/* Input visible */}
      <input
        type="text"
        className="w-full p-2 border rounded-md"
        placeholder="Buscar tramitador por nombre..."
        value={
          selected
            ? selected.nombreTramitador
            : query
        }
        onChange={(e) => {
          setQuery(e.target.value)
          setSelected(null)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
      />

      {/* Input oculto que envía el ID */}
      <input type="hidden" name={name} value={selected?.id ?? ""} />

      {/* Dropdown */}
      {open && data.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded-md shadow mt-1 max-h-48 overflow-auto">
          {data.map(t => (
            <li
              key={t.id}
              className="px-3 py-2 hover:bg-slate-100 cursor-pointer"
              onClick={() => {
                setSelected(t)
                setOpen(false)
                setQuery("")
              }}
            >
              <span className="font-medium">{t.nombreTramitador}</span>
              <span className="text-sm text-slate-500 ml-2">
                {t.identificacion}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
