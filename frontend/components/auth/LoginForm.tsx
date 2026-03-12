"use client"
import { autenticacion } from "@/actions/iniciarSesion"
import { useEffect } from "react"
import { useFormState } from "react-dom"
import { toast } from "react-toastify"




export default function LoginForm() {

    const[state,dispatch]= useFormState(autenticacion,{
        errors:[]
    })

    useEffect(()=>{
        if(state.errors){
            state.errors.forEach(error=>{
                toast.error(error)
                
            })
        }

    },[state])

    return (
        <>
            <form
                action={dispatch}
                className="mt-14 space-y-5"
                noValidate
            >
                <div className="flex flex-col gap-2">
                    <label
                        className="font-bold text-2xl"
                    >Usuario</label>

                    <input
                        id="correoUsuario"
                        type="email"
                        placeholder="Correo Electronico"
                        className="w-full border border-gray-300 p-3 rounded-lg bg-background text-foreground"
                        name="correoUsuario"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        className="font-bold text-2xl"
                    >Contraseña</label>

                    <input
                        id="contrasena"
                        type="password"
                        placeholder="Contraseña"
                        className="w-full border border-gray-300 p-3 rounded-lg bg-background text-foreground"
                        name="contrasena"
                    />
                </div>

                <input
                    type="submit"
                    value='Iniciar Sesión'
                    className="bg-blue-600 hover:bg-blue-700 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
                />
            </form>
        </>
    )
}