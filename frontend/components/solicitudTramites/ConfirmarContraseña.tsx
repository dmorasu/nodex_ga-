import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { DialogTitle } from "@headlessui/react"
import { useFormState } from "react-dom"
import { EliminarSolicitudTramite } from "@/actions/elimininar-solicitudTramite-action"

export default function ConfirmarContrasenaForm() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const solicitudTarmiteId= +searchParams.get('eliminarSolicitudTramiteId')!
  console.log(solicitudTarmiteId)
  

  const eliminarSolicitudTramiteContrasena =EliminarSolicitudTramite.bind(null,solicitudTarmiteId)
  const[state,dispatch] =useFormState(eliminarSolicitudTramiteContrasena ,{
    errors:[]

  })

  const closeModal = () => {
    const hideModal = new URLSearchParams(searchParams.toString())
    hideModal.delete('deleteBudgetId')
    router.replace(`${pathname}?${hideModal}`)
  }

  return (
    <>
      <DialogTitle
        as="h3"
        className="font-black text-4xl text-sky-400 my-5"
      >
        Eliminar Solicitud
      </DialogTitle>
      <p className="text-xl font-bold">Ingresa tu Contraseñaa para {''}
        <span className="text-amber-500">eliminar la solicitud {''}</span>
      </p>
      <p className='text-gray-600 text-sm'>(Una solicitud eliminada no se pueden recuperar)</p>
      <form
        className=" mt-14 space-y-5"
        noValidate
        action={dispatch}
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-bold text-2xl"
            htmlFor="contrasena"
          >Ingresa tu Contraseña para eliminar</label>
          <input
            id="contrasena"
            type="contrasena"
            placeholder="contraseña"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name='contrasena'
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <input
            type="submit"
            value='Eliminar Presupuesto'
            className="bg-sky-400 hover:bg-gray-400 w-full p-3 rounded-lg text-white font-black cursor-pointer transition-colors"
          />
          <button
            className="bg-amber-500 hover:bg-amber-600 w-full p-3 rounded-lg text-white font-black cursor-pointer transition-colors"
            onClick={closeModal}
          >Cancelar</button>
        </div>
      </form>

    </>
  )
}