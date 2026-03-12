import CrearSolicitudesForm from "@/components/solicitudTramites/CrearSolicitudes";
import Link from "next/link";
import {Metadata} from 'next'

import CrearCargueMasivaForm from "@/components/cargueMasiva/cargueMasivaForm";

export const metadata :Metadata={
  title:'Nodex - Centro Admin',
  description: 'Nodex - Centro Admin'
}

export default function CargueMasivoPage() {
  return (
    <>
      <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
        <div className='w-full md:w-auto'>
          <h1 className='font-black text-4xl text-gray-900  my-5'>
            Ingresas Solicitudes de Trámites Masivas:
          </h1>
          <p className="text-xl font-bold">Procecimiento: {''}
            <span className="text-blue-600">Para Cargue Másivo</span>
          </p>
        </div>
        
        
        

        <Link
          href={'/center'}
          className='bg-gray-400 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center'
        >
          Volver
        </Link>
      </div>

      <div className='p-10 mt-10  shadow-lg  border-2 shadow-blue-400'>
            <div>
              <p className="text-small ">1. Descargue la plantilla de Excel {''}</p>
        <p className="text-small ">2. Registre lo datos a cargar en la plantilla, Verifique que el ID de Cliente, Municipio, Entidad, Tramite concuerdan con la Base de Datos {''}</p>
        <p className="text-small ">3. Cargue el Archivo con los datos guardados {''}</p>
        <p className="text-small ">4. Valide los datos cargados{''}</p>
        <p className="text-small ">5. Guarde  los datos cargados{''}</p>
            </div>
            <CrearCargueMasivaForm/>
      </div>
    </>
  )
}