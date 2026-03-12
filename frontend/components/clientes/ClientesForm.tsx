"use client";


import { SolicitudTramites } from "@/src/schemas";


export default function ClientesForm({ solicitud }: { solicitud?: SolicitudTramites }) {

 

  return (
    
    <div>

 

      <div className="space-y-3 mt-4">
        <label htmlFor="nombreCliente" className="text-sm uppercase font-bold">
          Nombre Completo Cliente
        </label>
        <input
          type="text"
          id="nombreCliente"
          className="w-full p-3 border border-gray-300 bg-white text-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all cursor-pointer"
          placeholder="Nombre Completo del Cliente"
          name="nombreCliente"
          defaultValue={solicitud?.direccionTramite}
        />
      </div>

       <div className="space-y-3 mt-4">
        <label htmlFor="identificacionCliente" className="text-sm uppercase font-bold">
         Identificacion
        </label>
        <input
          type="text"
          id="identificacionCliente"
          className="w-full p-3 border border-gray-300 bg-white text-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all cursor-pointer"
          placeholder="Identificación"
          name="identificacionCliente"
          defaultValue={solicitud?.direccionTramite}
        />
      </div>

      <div className="space-y-3 mt-4">
        <label htmlFor="telefono" className="text-sm uppercase font-bold">
         Telefono
        </label>
        <input
          type="text"
          id="telefono"
          className="w-full p-3 border border-gray-300 bg-white text-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all cursor-pointer"
          placeholder="Telefono Fijo"
          name="telefono"
          defaultValue={solicitud?.direccionTramite}
        />
      </div>

      <div className="space-y-3 mt-4">
        <label htmlFor="telefonoMovil" className="text-sm uppercase font-bold">
         telefono Movil
        </label>
        <input
          type="text"
          id="telefonoMovil"
          className="w-full p-3 border border-gray-300 bg-white text-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all cursor-pointer"
          placeholder="Telefono Movil"
          name="telefonoMovil"
          defaultValue={solicitud?.direccionTramite}
        />
      </div>

      

   


      
        

    </div>
   
  );
}
