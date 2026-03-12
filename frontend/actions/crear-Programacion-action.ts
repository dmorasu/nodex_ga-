"use server"

import { ErrorResponoseSchema,SuccessSchema,  ProgramacionSchema } from "@/src/schemas"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { formatoMoneda } from "@/src/ultis"


type ActionStateType ={
    errors:string[],
    success:string
}



export default async function CrearProgramacion(solicitudTramiteId:number,prevState:ActionStateType,formData:FormData) {
    const programacionData={
        solicitudTramiteId:solicitudTramiteId, 
        fechaProbableEntrega:formData.get('fechaProbableEntrega'),
        valorTramite:formData.get('valorTramite'),
        valorViaticos:formData.get("valorViaticos"),
        conceptoViaticos:formData.get('conceptoViaticos'),
        conceptoHonorarios:formData.get('conceptoHonorarios')
        
        

    }
    
    const programacion=ProgramacionSchema.safeParse(programacionData)

    if(!programacion.success){
        return{
            errors:programacion.error.issues.map(issue=>issue.message),
            success:''
        }
    }

    const token = cookies().get("TOKEN")?.value
    // Generar Trazabilidad
    const url =`${process.env.API_URL}/solicitudTramites/${solicitudTramiteId}/programacion`
    const req =await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
          
        },
        body:JSON.stringify({
            solicitudTramiteId:solicitudTramiteId,
            valorTramite:programacionData.valorTramite,
            valorViaticos:programacionData.valorViaticos,
            fechaProbableEntrega:programacionData.fechaProbableEntrega,
            conceptoHonorarios:programacionData.conceptoHonorarios,
            conceptoViaticos:programacionData.conceptoViaticos
           
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
    
    revalidatePath(`/center/solicitudTramites/${solicitudTramiteId}`)
    const success = SuccessSchema.parse(json)

    return{
        errors:[],
        success
    }
    
}
