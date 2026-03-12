"use server"

import { ErrorResponoseSchema,TrazabilidadSchema,SuccessSchema, logisticaSchema } from "@/src/schemas"
import { verificacionSesion } from "@/src/auth/dal"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"


type ActionStateType ={
    errors:string[],
    success:string
}



export default async function CrearLogistica(solicitudTramitesId:number,prevState:ActionStateType,formData:FormData) {
    const logisticaData={
        solicitudTramitesId:solicitudTramitesId, 
        numeroGuia:formData.get('numeroGuia'),
        valorEnvio:formData.get('valorEnvio'),
        transportadora:formData.get('transportadora'),
        fechaProgramacionLogistica:formData.get("fechaProgramacionLogistica"),
        fechaEntregaTransportadora:formData.get('fechaEntregaTransportadora'),

    }
    
    const logistica=logisticaSchema.safeParse(logisticaData)

    if(!logistica.success){
        return{
            errors:logistica.error.issues.map(issue=>issue.message),
            success:''
        }
    }

    const token = cookies().get("TOKEN")?.value
    // Generar Trazabilidad
    const url =`${process.env.API_URL}/solicitudTramites/${solicitudTramitesId}/logistica`
    const req =await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
          
        },
        body:JSON.stringify({
            solicitudTramitesId:solicitudTramitesId,
            numeroGuia:logisticaData.numeroGuia,
            valorEnvio:logisticaData.valorEnvio,
            transportadora:logisticaData.transportadora,
            fechaProgramacionLogistica:logisticaData.fechaProgramacionLogistica,
            fechaEntregaTransportadora:logisticaData.fechaEntregaTransportadora,
        })
    })

    const json =await req.json()
    console.log(json)
    if(!req.ok){
        const {error}=ErrorResponoseSchema.parse(json)
        return{
            errors:[error],
            success:''
        }
    }
    
    revalidatePath(`/center/solicitudTramites/${solicitudTramitesId}`)
    const success = SuccessSchema.parse(json)

    return{
        errors:[],
        success
    }
    
}