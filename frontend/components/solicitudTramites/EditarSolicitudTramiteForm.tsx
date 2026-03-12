"use client"
import { SolicitudTramites, Usuario } from '@/src/schemas'
import SolicitudTramitesForm from './SolicitudTramitesForm'
import { useFormState } from 'react-dom'
import { EditarSolicitudTramite } from '@/actions/editar-Solicitud-action'
import { success } from 'zod'
import ErrorMessage from '../ui/ErrorMessage'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

type Props = {
  solicitud: SolicitudTramites
  usuario?: Usuario
}

export default function EditarSolicitudTramiteForm({solicitud,usuario}:Props ) {
  
  const router = useRouter()
  const  editarSolicitudTramiteid =EditarSolicitudTramite.bind(null,solicitud.id)
  const [state,dispatch] = useFormState(editarSolicitudTramiteid,{
    errors:[],
    success:''

  })

  useEffect(()=>{
    if(state.success){
      toast.success(state.success)
      router.push('/center')
    }


  },[state])
  
  return (
     <form
          className="mt-10 space-y-3  "
          noValidate
          action={dispatch}
        >
           
          {state.errors?.map(error=><ErrorMessage key={error}>{error}</ErrorMessage>)}
          <SolicitudTramitesForm
            solicitud={solicitud}
            
          
          />
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
            value='Guardar'
          />
        </form>
  )
}
