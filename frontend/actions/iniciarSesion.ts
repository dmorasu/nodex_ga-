"use server"
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'
import { ErrorResponoseSchema, inicioSesionSchema } from "@/src/schemas"


type ActionStateType ={
    errors: string[]
}


export async function autenticacion(prevState:ActionStateType, formData:FormData) {

    const credenciales ={
        correoUsuario: formData.get("correoUsuario"),
        contrasena:formData.get("contrasena")
    }

    

    const  auth= inicioSesionSchema.safeParse(credenciales)
    if(!auth.success){
        return {
            errors:auth.error.issues.map((error)=>error.message)
        }
    }



    const url=`${process.env.API_URL}/auth/login`
    const req =await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contrasena:auth.data.contrasena,
            correoUsuario:auth.data.correoUsuario
        })
    })


    const json =await req.json()
    

    if(!req.ok){
        const {error}=ErrorResponoseSchema.parse(json)
        return{
            errors:[error]
        }
    }
    
    //Setear Cookies

    cookies().set({
        name:'TOKEN',
        value: json,
        httpOnly:true,
        path:'/'

    })
    redirect('/center')

    
    
}