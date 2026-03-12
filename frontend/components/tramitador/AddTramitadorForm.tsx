"use client"

import { DialogTitle } from "@headlessui/react"
import TramitadorComboBox from "./TramitadorCombobox"
import { useFormState } from "react-dom"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { toast } from "react-toastify"
import ErrorMessage from "../ui/ErrorMessage"

// 👉 Server Action que asigna tramitador
import  AsignarTramitadorSolicitud from "@/actions/asignar-Tramitador-action"
import { TramitadorType } from "@/src/type/solicitudes"

export default function AddTramitadorForm({  closeModal,
  tramitador
}: {
  closeModal: () => void
  tramitador?: TramitadorType | null
}) {

  const { id } = useParams()

  // Bind del Server Action con el id de la solicitud
  const asignarTramitadorConId = AsignarTramitadorSolicitud.bind(null, Number(id))

  const [state, dispatch] = useFormState(asignarTramitadorConId, {
    errors: [],
    success: ""
  })

  useEffect(() => {
    if (state.success) {
      toast.success(state.success)
      closeModal()
    }
  }, [state, closeModal])

  return (
    <>
      <DialogTitle
        as="h3"
        className="font-black text-4xl text-sky-400 my-5"
      >
        Asignar Tramitador
      </DialogTitle>

      <p className="text-xl font-bold">
        Busca y asigna un{" "}
        <span className="text-sky-400">Tramitador</span>
      </p>

      {state.errors.map(error => (
        <ErrorMessage key={error}>{error}</ErrorMessage>
      ))}

      <form
        className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
        noValidate
        action={dispatch}
      >

        {/* 🔹 Combobox de búsqueda inteligente */}
        <div className="space-y-3">
          <label className="text-sm uppercase font-bold">
            Tramitador
          </label>

          <TramitadorComboBox 
            name="tramitadorId"
            defaultValue={tramitador?.id}
            defaultLabel={tramitador?.nombreTramitador}
/>
        </div>

        <input
          type="submit"
          className="bg-sky-400 w-full p-3 mt-6 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value="Asignar Tramitador"
        />
      </form>
    </>
  )
}
