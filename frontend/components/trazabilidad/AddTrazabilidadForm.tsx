import { DialogTitle } from "@headlessui/react";

import { useFormState } from "react-dom";
import { useParams } from "next/navigation";
import ErrorMessage from "../ui/ErrorMessage";
import { useEffect } from "react";

import { toast } from "react-toastify";
import CrearTrazabilidad from "@/actions/crear-Trazabilidad";

export default function AddTrazabilidadForm({closeModal}:{closeModal:()=>void}){
    const {id}=useParams()

    const crearTrazabilidadconId=CrearTrazabilidad.bind(null,+id)

    const [state,distpach]=useFormState(crearTrazabilidadconId,{
        errors:[],
        success:""
    })
    useEffect(()=>{
        if(state.success){
          toast.success(state.success)
          closeModal()
        }
      },[state])
      return (
        <>
          <DialogTitle
            as="h3"
            className="font-black text-4xl text-sky-400 my-5"
          >
             Trazabilidad
          </DialogTitle>
    
          <p className="text-xl font-bold">Registre las actualizaciones del {''}
            <span className="text-sky-400">Trámite</span>
          </p>
          {state.errors.map(error=><ErrorMessage key={error}>{error}</ErrorMessage>)}
          <form
            className="b shadow-lg rounded-lg p-10 mt-10 border"
            noValidate
            action={distpach}
          >
           <div className=" py-3">
                <label htmlFor="name" className="text-sm uppercase font-bold">
                    Observacion:
                </label>
                <textarea
                    id="observacionTrazabilidad"
                    className="w-full p-3 border border-gray-100 bg-slate-100"
                    rows={5}
                    placeholder="Detalle de la Observacion"
                    name="observacionTrazabilidad"
                    
                />
           </div>
            <input
              type="submit"
              className="bg-sky-400 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
              value='Agregar'
            />
          </form>
        </>
      )

  
}