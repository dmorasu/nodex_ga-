"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import SolicitudTramiteMenu from "@/components/solicitudTramites/MenuSolicitudTramites"
import { formatoFecha, formatoFechaFinaizacion } from "@/src/ultis"
import { SolicitudTramites } from "@/src/schemas"
import EliminarSolicitudTramiteModal from "./EliminarSolicitudTramiteModal"
import clsx from "clsx"
import CargaMasivaSolicitudes from "./CargaMasivaSolicitudes"

import ModalContainer from "../ui/ModalContainer"

import { useOperaciones } from '@/hooks/useOperaciones'
import { useTramites } from '@/hooks/useTramites'
import { useTramitadores } from '@/hooks/useTramitadores'

interface Props {
  solicitudes: SolicitudTramites[]
  currentPage: number
  totalPages: number
  searchInitial: string
}

export default function CenterPageClient({
  solicitudes,
  currentPage,
  totalPages,
  searchInitial
}: Props) {


  const router = useRouter()
  const params = useSearchParams()

  const [search, setSearch] = useState(searchInitial)

  // 🔹 Ejecutar búsqueda en backend
  const ejecutarBusqueda = () => {
    const query = new URLSearchParams(params.toString())

    if (search) query.set("search", search)
    else query.delete("search")

    query.set("page", "1")
    router.push(`?${query.toString()}`)
  }

  // 🔹 Cambiar página en backend
  const cambiarPagina = (page: number) => {
    const query = new URLSearchParams(params.toString())
    query.set("page", page.toString())
    router.push(`?${query.toString()}`)
  }
  const { data: operaciones, loading: loadingOperaciones } = useOperaciones()
  const { data: tramites, loading: loadingTramites } = useTramites()
  const { data: tramitadores, loading: loadingTramitadores } = useTramitadores()

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row md:justify-between items-center">
        <div className="w-full md:w-auto">
          <h1 className=" text-3xl text-gray-900 my-5">
            Solicitudes Creadas
          </h1>
          <p className="text-l font-semibold">
            Tienes los siguientes{" "}
            <span className="text-sky-500">Trámites:</span>
          </p>
        </div>

        <Link
          href={"/center/solicitudTramites/nueva"}
          className="bg-gray-400 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center"
        >
          Crear Trámite
        </Link>
       
        
      </div>

      {/* 🔹 Barra de búsqueda */}
      <div className="my-6 flex gap-2">
        <input
          type="text"
          placeholder="Buscar por ID solicitud o identificación cliente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={ejecutarBusqueda}
          className="bg-sky-400 px-4 rounded-lg text-white font-bold"
        >
          Buscar
        </button>
      </div>

        


      {solicitudes.length ? (
        <>
          <ul
            role="list"
            className="divide-y divide-gray-300 border shadow-lg mt-4 bg-white p-4 shadow-blue-400 rounded-xl"
          >
            {solicitudes.map((solicitud) => (
              
              <li
                key={solicitud.id}
                className="flex justify-between gap-x-6 p-5 hover:bg-gray-50 transition"
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">

                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      <Link
                        href={`/center/solicitudTramites/${solicitud.id}`}
                        className="cursor-pointer hover:underline text-lg font-bold"
                      >
                        <span className="text-red-500">Solicitud de Trámite N: </span>: {solicitud.id}
                      </Link>
                    </p>

                    <p className="text-sm font-semibold leading-6 text-gray-600">
                      <span className="text-red-600">Cliente:</span>{" "}
                      {solicitud.clientes?.nombreCliente}
                    </p>

                    <p className="text-sm font-bold">
                      {solicitud.municipios?.nombreMunicipio}
                    </p>

                    <p className="text-sm font-semibold text-gray-600">
                      {solicitud.direccionTramite}
                    </p>

                    <p className="text-sm text-gray-500 text-justify">
                      {solicitud.detalleSolicitud}
                    </p>
                    <p className="text-gray-800 text-sm font-bold">
                     Asignado a:{" "}
                      <span className="font-normal text-gray-600">
                        {solicitud.tramite?.responsable??"El Trámite no tiene un analista asingado "}
                      </span>
                    </p>
                    <p className="text-gray-800 text-sm font-bold">
                      Operacion:{" "}
                      <span className="font-normal text-gray-600">
                        {solicitud.operaciones?.nombreOperacion}
                      </span>
                    </p>
                    <p className="text-gray-800 text-sm font-bold">
                      Fecha Espera Resultado:{" "}
                      <span className="font-normal text-gray-600">
                        {formatoFecha(solicitud.fechaEntregaResultado)}
                      </span>
                    </p>

                    <p className="text-gray-800 text-sm font-bold">
                      Creado por:{" "}
                      <span className=" text-gray-600 font-normal">
                        {solicitud.usuario?.nombreUsuario}
                      </span>
                    </p>
                    
                    <p className="text-gray-800 text-sm font-bold">
                      Fecha de Creacion:{" "}
                      <span className="font-normal text-gray-600 ">
                        {formatoFecha(solicitud.createdAt)}
                      </span>
                    </p>
                    <p className="text-gray-800 text-sm font-bold">
                      Última Actualizacion:{" "}
                      <span className="font-normal text-gray-600">
                        {formatoFecha(solicitud.updatedAt)}
                      </span>
                    </p>
                    <p className="text-red-500 text-sm font-bold">
                      Fecha de Finalización:{" "}
                      <span className="font-normal text-gray-600">
                        {formatoFechaFinaizacion(solicitud.programacion?.fechaFinalizacionServicio?? "")}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-y-8">
                  <div
                    className={clsx(
                      "p-2 rounded-lg font-bold w-full md:w-auto text-center",
                      {
                        "bg-red-400 text-white":
                          solicitud.estadosTramites?.[0]?.estado?.nombreEstado === "Sin Iniciar",
                        "bg-amber-400 text-white":
                          solicitud.estadosTramites?.[0]?.estado?.nombreEstado === "En Curso",
                        "bg-green-500 text-white":
                          solicitud.estadosTramites?.[0]?.estado?.nombreEstado === "Finalizado",
                        "bg-blue-500 text-white":
                          solicitud.estadosTramites?.[0]?.estado?.nombreEstado === "Novedad Subsanada Continuar Trámite",
                        "bg-orange-500 text-white":
                          solicitud.estadosTramites?.[0]?.estado?.nombreEstado === "Desistido",
                        "bg-purple-500 text-white":
                          solicitud.estadosTramites?.[0]?.estado?.nombreEstado === "En espera por novedad",
                        "bg-gray-400 text-white":
                          !["Sin Iniciar","En Curso","Finalizado","Novedad Subsanada Continuar Trámite","Desistido","En espera por novedad"]
                          .includes(solicitud.estadosTramites?.[0]?.estado?.nombreEstado ?? "")
                      }
                    )}
                  >
                    {solicitud.estadosTramites?.[0]?.estado?.nombreEstado ?? "Sin Iniciar"}
                  </div>

                  <SolicitudTramiteMenu solicitudId={solicitud.id} />
                </div>
              </li>
            ))}

            <EliminarSolicitudTramiteModal />
          </ul>

          {/* 🔹 Controles de paginación */}
          <div className="flex justify-center items-center gap-3 mt-6">
            <button
              onClick={() => cambiarPagina(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              ← Anterior
            </button>

            <span className="font-semibold">
              Página {currentPage} de {totalPages}
            </span>

            <button
              onClick={() => cambiarPagina(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Siguiente →
            </button>
          </div>
        </>
      ) : (
        <p className="text-center py-20">
          No hay solicitudes que coincidan con la búsqueda.{" "}
          <Link
            href={"/center/solicitudTramites/nueva"}
            className="bg-orange-500 px-2 py-1 rounded text-white font-bold"
          >
            Crea una solicitud
          </Link>
        </p>
        
      )}
    </>
  )
}
