"use client"

import { Textarea } from "@headlessui/react"
import MunicipiosComboBox from "../municipios/municipiosCombobox"
import { useActionState, useEffect } from "react"
import { useFormState } from "react-dom"
import { crearSolicitud } from "@/actions/crear-Solicitud-action"

import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import ClientesComboBox from "../clientes/clientesCombobox"
import SolicitudTramitesForm from "./SolicitudTramitesForm"
import { Usuario } from "@/src/schemas";



export default function CrearSolicitudesForm({ usuario }: { usuario?: Usuario }) {
  const router =useRouter()
  const[state,dispatch] =useFormState(crearSolicitud,{
    errors:[],
    success:''
  })

  useEffect(()=>{
    if(state.errors){
       state.errors.forEach(error =>{
            toast.error(error)
       })
    }

    if(state.success){
       toast.success(state.success,{
         autoClose:1200,
         onClose:()=>{
            router.push('/center')
            router.refresh()
         },
         onClick:()=>{
            router.push('/center')
            router.refresh()
         }

       })
    }
    

  },[state])
  


  return (
    <form
      className="mt-10 space-y-3  "
      noValidate
      action={dispatch}
    >
       

      <SolicitudTramitesForm/>
      <div className="space-y-3 mt-4">
       
        <input
          type="hidden"
          id="usuarioId"
          className="w-full p-3 border border-gray-300 bg-white text-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all cursor-pointer"
          
          name="usuarioId"
          defaultValue={usuario?.id}
          
        />
      </div>
      <input
        type="submit"
        className="bg-blue-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
        value='Crear Solicitud'
      />
    </form>
  )
}