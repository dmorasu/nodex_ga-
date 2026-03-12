"use server"

import { ErrorResponoseSchema,TrazabilidadSchema,SuccessSchema } from "@/src/schemas"
import { verificacionSesion } from "@/src/auth/dal"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"


type ActionStateType ={
    errors:string[],
    success:string
}

// 1. Validar sesión y obtener usuario
const { usuario } = await verificacionSesion()

export default async function CrearTrazabilidad(solicitudTramitesId:number,prevState:ActionStateType,formData:FormData) {
    const trazabilidadData={
        solicitudTramitesId:solicitudTramitesId, 
        observacionTrazabilidad:formData.get('observacionTrazabilidad')
    }
    
    const trazabilidad=TrazabilidadSchema.safeParse(trazabilidadData)

    if(!trazabilidad.success){
        return{
            errors:trazabilidad.error.issues.map(issue=>issue.message),
            success:''
        }
    }

    const token = cookies().get("TOKEN")?.value
    // Generar Trazabilidad
    const url =`${process.env.API_URL}/solicitudTramites/${solicitudTramitesId}/trazabilidad`
    const req =await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
        },
        body:JSON.stringify({
            solicitudTramitesId:solicitudTramitesId,
            nombreUsuario:usuario.nombreUsuario,
            observacionTrazabilidad:trazabilidadData.observacionTrazabilidad
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