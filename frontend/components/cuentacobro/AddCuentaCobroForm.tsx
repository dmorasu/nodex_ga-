"use client"

import { DialogTitle } from "@headlessui/react"
import { useFormState } from "react-dom"
import ErrorMessage from "../ui/ErrorMessage"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import CrearCuentaCobro from "@/actions/crear-CuentaCobro-action"
import { CuentaCobroType } from "@/src/type/solicitudes"
import { toDateInput } from "@/src/ultis"
import { toDateOnly } from "@/src/ultis/fechasHabiles"

export default function AddCuentaCobroForm({ closeModal , cuentaCobro}:{ closeModal:()=>void ,cuentaCobro?:CuentaCobroType | null }) {

  const { id } = useParams()
  const crearCuentaCobroconId = CrearCuentaCobro.bind(null, +id)

  const [state, distpach] = useFormState(crearCuentaCobroconId,{
    errors:[],
    success:""
  })

  const [fechaPago, setFechaPago] = useState("")

  useEffect(()=>{
    if(state.success){
      toast.success(state.success)
      closeModal()
    }
  },[state])

  const handlePagadoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const hoy = new Date().toISOString().split("T")[0]
      setFechaPago(hoy)
    } else {
      setFechaPago("")
    }
  }

  return (
    <>
      <DialogTitle
        as="h3"
        className="font-black text-4xl text-sky-400 my-5"
      >
        Cuenta de Cobro :
      </DialogTitle>

      <p className="text-xl font-bold">
        Información de la Cuenta De Cobro:
        <span className="text-sky-400"> del Trámite</span>
      </p>

      {state.errors.map(error =>
        <ErrorMessage key={error}>{error}</ErrorMessage>
      )}

      <form
        className="shadow-lg rounded-lg p-10 mt-10 border"
        noValidate
        action={distpach}
      >
        <div className="py-3">
          <label className="text-sm uppercase font-bold">
            Número Cuenta de Cobro:
          </label>
          <input
            type="text"
            name="numeroCuentaCobro"
            className="w-full p-3 border border-gray-100 bg-slate-100"
            placeholder="Número de cuenta de cobro"
            defaultValue={cuentaCobro?.numeroCuentaCobro??""}
          />
        </div>

       <div className="py-3">
          <label className="text-sm uppercase font-bold">
            Valor de la Cuenta de Cobro:
          </label>
          <input
            type="text"
            name="valorCuentaCobro"
            className="w-full p-3 border border-gray-100 bg-slate-100"
            placeholder="Valor cuenta de cobro"
            defaultValue={cuentaCobro?.valorCuentaCobro??""}
          />
        </div>

        

       
        

        <div className="py-3">
          <label className="text-sm uppercase font-bold">
            Fecha Recibida Tramitador:
          </label>
          <input
            type="date"
            name="fechaRecibidaCuentaCobroTramitador"
            className="w-full p-3 border border-gray-100 bg-slate-100"
            defaultValue={toDateInput(cuentaCobro?.fechaRecibidaCuentaCobroTramitador??"") }
          />
        </div>

        <input
          type="submit"
          className="bg-sky-400 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value="Agregar"
        />
      </form>
    </>
  )
}
