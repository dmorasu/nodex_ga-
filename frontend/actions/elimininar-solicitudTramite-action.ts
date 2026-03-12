"use server"

import { ContrasenaValidacionSchema, SolicitudTramites } from "@/src/schemas"

type ActiosStateType={
    errors:string[],
  
}
export async function EliminarSolicitudTramite(solicitudTramiteId:SolicitudTramites['id'],prevState:ActiosStateType,formData:FormData) {
    


    const  contrasenaActual= ContrasenaValidacionSchema.safeParse(formData.get('contrasena'))
    if(!contrasenaActual.success){
        return{
            errors: contrasenaActual.error.issues.map(issue =>issue.message)
        }
    }

    



    return{
        errors:[]
    }
}