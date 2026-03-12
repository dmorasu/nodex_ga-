'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel
} from '@headlessui/react'
import { useRouter } from 'next/navigation'

interface Estado {
  id: number
  nombreEstado: string
}

interface Props {
  onChange?: (estadoId: number | null) => void
  name?: string
  defaultValue?: number
  openExternally?: boolean         // 👈 NUEVO
  onCloseExternally?: () => void   // 👈 NUEVO
}

export default function EstadosLista({
  onChange,
  name = 'estadoId',
  defaultValue,
  openExternally,
  onCloseExternally
}: Props) {
  const [estados, setEstados] = useState<Estado[]>([])
  const [selectedEstado, setSelectedEstado] = useState<Estado | null>(null)
  const [open, setOpen] = useState(false)
  

  const router = useRouter()

  // Permitir que otro botón abra este modal
  useEffect(() => {
    if (openExternally) {
      setOpen(true)
    }
  }, [openExternally])

  // Cargar la lista
  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/estados`)
        const data = await r.json()

        setEstados(data)

        if (defaultValue) {
          const found = data.find((e: Estado) => e.id === defaultValue)
          if (found) setSelectedEstado(found)
        }
      } catch (error) {
        console.error("Error cargando estados:", error)
      }
    }

    fetchEstados()
  }, [defaultValue])

  const handleSelect = (estado: Estado) => {
    setSelectedEstado(estado)
    setOpen(false)
    onChange?.(estado.id)

    // Notificar cierre externo (si existe)
    onCloseExternally?.()
  }

  const closeModal = () => {
    setOpen(false)
    onCloseExternally?.()
  }

  return (
    <div>

      {/* BOTÓN INTERNO (solo si lo quieres seguir usando) */}
      {!openExternally && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full p-3 font-semibold border bg-white text-sky-600 rounded-xl"
        >
          {selectedEstado ? selectedEstado.nombreEstado : "Seleccionar Estado..."}
        </button>
      )}

      <input type="hidden" name={name} value={selectedEstado?.id ?? ''} />

      <Dialog open={open} onClose={closeModal} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        <div className="fixed inset-0 flex items-center justify-center p-6">
          <DialogPanel className="w-full max-w-md bg-white rounded-2xl shadow-lg p-4">

            <h2 className="text-gray-700 font-bold text-lg mb-3">
              Selecciona un Estado
            </h2>

            <div className="max-h-96 overflow-y-auto border rounded">
              {estados.map((estado) => (
                <button
                  key={estado.id}
                  onClick={() => handleSelect(estado)}
                  className={`w-full text-left px-4 py-2 border-b hover:bg-blue-100 ${
                    selectedEstado?.id === estado.id ? "bg-blue-50 font-semibold" : ""
                  }`}
                >
                  {estado.nombreEstado}
                </button>
              ))}
            </div>

            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-orange-500"
              >
                Cerrar
              </button>
            </div>

          </DialogPanel>
        </div>
      </Dialog>

    </div>
  )
}
