'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, Combobox, ComboboxInput, ComboboxOption } from '@headlessui/react'
import { useMunicipiosSearch } from '@/hooks/useMunicipiosSearch'

interface Municipio {
  id: number
  nombreMunicipio: string
  departamento: string
}

interface Props {
  onChange?: (value: number | null) => void
  defaultValue?: number
  name?: string
}

export default function MunicipiosModalSelect({ onChange, defaultValue, name = 'municipioId' }: Props) {
  const { search, setSearch, results, loading } = useMunicipiosSearch()
  const [selected, setSelected] = useState<Municipio | null>(null)
  const [open, setOpen] = useState(false)

  // cargar defaultValue
  useEffect(() => {
    const loadDefault = async () => {
      if (!defaultValue) return
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/municipios/${defaultValue}`)
      const data = await res.json()
      setSelected(data)
    }
    loadDefault()
  }, [defaultValue])

  const selectMunicipio = (m: Municipio | null) => {
    setSelected(m)
    onChange?.(m ? m.id : null)
    setSearch('')
    setOpen(false) // cerrar modal
  }

  return (
    <div className="w-full">
      
      {/* BOTÓN */}
      <button 
        type="button" 
        onClick={() => setOpen(true)}
        className="w-full px-4 py-3 rounded-lg border bg-white text-gray-700 font-medium"
      >
        {selected ? selected.nombreMunicipio : "Seleccionar municipio"}
      </button>

      <input type="hidden" name={name} value={selected?.id ?? ''} />

      {/* MODAL */}
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-5">

            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Seleccionar municipio
            </h2>

            <Combobox value={selected} onChange={selectMunicipio}>
              
              <ComboboxInput
                className="w-full border p-3 rounded-lg mb-2"
                placeholder="Buscar municipio..."
                onChange={(e) => setSearch(e.target.value)}
                displayValue={(m: Municipio) => m?.nombreMunicipio ?? ''}
              />

              {/* LISTA DE RESULTADOS */}
              {search.length >= 2 && (
                <div className="border rounded-lg max-h-80 overflow-y-auto shadow-inner">
                  {loading && (
                    <div className="p-3 text-gray-500 text-sm">Buscando...</div>
                  )}

                  {!loading && results.length === 0 && (
                    <div className="p-3 text-gray-500 text-sm">No se encontraron municipios</div>
                  )}

                  {!loading && results.map((m) => (
                    <ComboboxOption
                      key={m.id}
                      value={m}
                      className="cursor-pointer px-4 py-2 hover:bg-blue-100"
                    >
                      <div className="font-medium">{m.nombreMunicipio}</div>
                      <div className="text-xs text-gray-500">{m.departamento}</div>
                    </ComboboxOption>
                  ))}
                </div>
              )}
            </Combobox>

            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-200 px-4 py-2 rounded-lg"
                onClick={() => setOpen(false)}
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
