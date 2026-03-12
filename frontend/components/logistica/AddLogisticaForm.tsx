import { DialogTitle } from "@headlessui/react";

import { useFormState } from "react-dom";
import { useParams } from "next/navigation";
import ErrorMessage from "../ui/ErrorMessage";
import { useEffect } from "react";

import { toast } from "react-toastify";
import CrearLogistica from "@/actions/crear-logistica-action";
import { LogisticaType } from "@/src/type/solicitudes";
import { toDateInput } from "@/src/ultis";


export default function AddLogisticaForm({closeModal, logistica}:{closeModal:()=>void , logistica?:LogisticaType | null}){
    const {id}=useParams()

    const crearLogisticaconId=CrearLogistica.bind(null,+id)

    const [state,distpach]=useFormState(crearLogisticaconId,{
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
             Programación Logistica 
          </DialogTitle>
    
          <p className="text-xl font-bold"> {''}
            <span className="text-sky-400">Trámite</span>
          </p>
          {state.errors.map(error=><ErrorMessage key={error}>{error}</ErrorMessage>)}
         <form
  className="shadow-lg rounded-lg p-10 mt-10 border"
  noValidate
  action={distpach}
>
  
  <div className="py-3">
    <label className="text-sm uppercase font-bold">
      Número de Guía:
    </label>
    <input
      type="text"
      name="numeroGuia"
      className="w-full p-3 border border-gray-100 bg-slate-100"
      placeholder="Ingrese número de guía"
      defaultValue={logistica?.numeroGuia??""}
    />
  </div>

  <div className="py-3">
    <label className="text-sm uppercase font-bold">
      Valor del Envío:
    </label>
    <input
      type="number"
      name="valorEnvio"
      className="w-full p-3 border border-gray-100 bg-slate-100"
      placeholder="Valor del envío"
      defaultValue={logistica?.valorEnvio??""}
    />
  </div>

  <div className="py-3">
    <label className="text-sm uppercase font-bold">
      Transportadora:
    </label>
    <input
      type="text"
      name="transportadora"
      className="w-full p-3 border border-gray-100 bg-slate-100"
      defaultValue={logistica?.transportadora??""}
    />
  </div>

  <div className="py-3">
    <label className="text-sm uppercase font-bold">
      Fecha de Programación:
    </label>
    <input
      type="date"
      name="fechaProgramacionLogistica"
      className="w-full p-3 border border-gray-100 bg-slate-100"
      defaultValue={toDateInput(logistica?.fechaProgramacionLogistica ?? "") }
    />
  </div>

  <div className="py-3">
    <label className="text-sm uppercase font-bold">
      Fecha de Entrega Transportadora:
    </label>
    <input
      type="date"
      name="fechaEntregaTransportadora"
      className="w-full p-3 border border-gray-100 bg-slate-100"
      defaultValue={toDateInput(logistica?.fechaEntregaTransportadora?? "")}
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