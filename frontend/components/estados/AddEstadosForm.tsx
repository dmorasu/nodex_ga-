"use client"

import { DialogTitle } from "@headlessui/react"
import EstadosComboBox from "./EstadosCombobox"
import CrearEstadoTramite from "@/actions/crear-estatoTramite"
import { useFormState } from "react-dom"
import { useParams, useRouter } from "next/navigation"
import ErrorMessage from "../ui/ErrorMessage"
import { useEffect } from "react"
import { toast } from "react-toastify"

export default function AddExpenseForm({ closeModal }: { closeModal: () => void }) {

  const router = useRouter()
  const { id } = useParams()

  const crearEstadoconId = CrearEstadoTramite.bind(null, +id)

  const [state, dispatch] = useFormState(crearEstadoconId, {
    errors: [],
    success: "",
    requiereEvaluacion: false
  })

  useEffect(() => {
  console.log("STATE:", state)

  if (state.success) {
    toast.success(state.success)

    if (state.requiereEvaluacion) {
      router.replace(`?evaluar=true&showModal=true`)
      return
    }

    closeModal()
    router.refresh()
  }
}, [state])

  return (
    <>
      <DialogTitle
        as="h3"
        className="font-black text-4xl text-sky-400 my-5"
      >
        Agregar Estado
      </DialogTitle>

      <p className="text-xl font-bold">
        Llena el formulario y registre un{" "}
        <span className="text-sky-400">Estado</span>
      </p>

      {state.errors.map(error => (
        <ErrorMessage key={error}>{error}</ErrorMessage>
      ))}

      <form
        className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
        noValidate
        action={dispatch}
      >
        <div className="py-5">
          <EstadosComboBox name="estadoId" />
        </div>

        <input
          type="submit"
          className="bg-sky-400 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer"
          value="Cambiar Estado"
        />
      </form>
    </>
  )
}