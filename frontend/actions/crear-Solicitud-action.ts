"use server"

import { CrearSolicitudSchema } from "@/src/schemas"
import { cookies } from "next/headers"
import { ErrorResponoseSchema, SuccessSchema } from "@/src/schemas";



type ActionStateType = {
    errors: string[],
    success: string

}


export async function crearSolicitud(prevState: ActionStateType, formData: FormData) {

    const solicitud = CrearSolicitudSchema.safeParse({
        detalleSolicitud: formData.get('detalleSolicitud'),
        direccionTramite: formData.get('direccionTramite'),
        municipiosId:formData.get('municipioId'),
        clienteId:formData.get('clienteId'),
        operacionesId:formData.get('operacionId'),
        tramiteId:formData.get('tramiteId'),
        entidadId:formData.get("entidadId"),
        fechaEntregaResultado:formData.get('fechaEntregaResultado'),
        placa:formData.get('placa'),
        matriculaInmobiliaria:formData.get('matricula'),
        documentosAportados:formData.get('documentosAportados'),
        usuarioId:formData.get('usuarioId')


        


    })
    if (!solicitud.success) {
        return {
            errors: solicitud.error.issues.map(issue => issue.message),
            success: ''
        }
    }


    const token = cookies().get('TOKEN')?.value  //- > almacenamiento del token en cookie para poder almacenar
    const url =`${process.env.API_URL}/solicitudTramites` //-> URL valida para hacer la peticion
    const req =  await fetch(url,{      
       method:'POST',                     // --> Se realiza la solicitud
       headers:{
            'Content-Type':'application/json',
            
            'Authorization':`Bearer ${token}`
       },
       body:JSON.stringify({
              detalleSolicitud:solicitud.data.detalleSolicitud,
              direccionTramite:solicitud.data.direccionTramite,
              municipiosId:solicitud.data.municipiosId,
              clienteId :solicitud.data.clienteId,
              operacionesId:solicitud.data.operacionesId,
              fechaEntregaResultado:solicitud.data.fechaEntregaResultado,
              placa:solicitud.data.placa,
              matriculaInmobiliaria:solicitud.data.matriculaInmobiliaria,
              entidadId:solicitud.data.entidadId,
              tramiteId:solicitud.data.tramiteId,
              documentosAportados:solicitud.data.documentosAportados,
              usuarioId:solicitud.data.usuarioId
             

       })
    })

    const json= await req.json()
    const success = SuccessSchema.parse(json)

    return {
        errors: [],
        success
    }
}