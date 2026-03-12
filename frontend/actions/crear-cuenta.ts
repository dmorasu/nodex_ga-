"use server";

import { ErrorResponoseSchema, RegistroSchema, SuccessSchema } from "@/src/schemas";
import { success } from "zod";
type ActionStateType={
    errors:string[],
    success:string

} 
export async function registrarUsuario(prevSatate:ActionStateType,formData: FormData) {
  const datosRegistro = {
    correoUsuario: formData.get("correoUsuario"),
    nombreUsuario: formData.get("nombreUsuario"),
    contrasena: formData.get("contrasena"),
    confirmacion_contrasena: formData.get("confirmacion_contrasena"),
  };
  // Valdacion
  const registro = RegistroSchema.safeParse(datosRegistro);

  

  if(!registro.success){
    const errors = registro.error.issues.map((error) => error.message);
    return{
        errors,
        success:prevSatate.success
    };

  }
  

  const url = `${process.env.API_URL}/auth/create-account`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      correoUsuario: registro.data.correoUsuario,
      nombreUsuario: registro.data.nombreUsuario,
      contrasena: registro.data.contrasena
      
    }),
  });

  const json =await req.json()
  if(req.status=== 409){
      const error = ErrorResponoseSchema.parse(json)

      return{
        errors:[error.error],
        success:''
      }
  }
  
  const success = SuccessSchema.parse(json)
  return {
    errors:[],
    success:success
  }

  

}
