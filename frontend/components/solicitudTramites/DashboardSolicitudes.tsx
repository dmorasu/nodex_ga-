'use client'

import { useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { Search, Filter, Trash2, Plus, Radar } from 'lucide-react'

import { useTramites } from '@/hooks/useTramites'
import { useTramitadores } from '@/hooks/useTramitadores'
import { useOperaciones } from '@/hooks/useOperaciones'
import { useEstados } from '@/hooks/useEstadosSelect'
import { useSolicitudesFiltradas } from '@/hooks/useSolicitudesFiltradas'

import SolicitudTramiteMenu from '@/components/solicitudTramites/MenuSolicitudTramites'
import EliminarSolicitudTramiteModal from '@/components/solicitudTramites/EliminarSolicitudTramiteModal'
import { formatoFecha, formatoFechaFinaizacion } from '@/src/ultis'

export default function DashboardPageClient() {

  const [search, setSearch] = useState('')
  const [estadoId, setEstadoId] = useState('')
  const [tramiteId, setTramiteId] = useState('')
  const [tramitadorId, setTramitadorId] = useState('')
  const [operacionesId, setOperacionesId] = useState('')
  const [placa, setPlaca] = useState('')
  const [fechaFinalizacionDesde, setFechaFinalizacionDesde] = useState('')
  const [fechaFinalizacionHasta, setFechaFinalizacionHasta] = useState('')
  const [page, setPage] = useState(1)

  const { data: tramites } = useTramites()
  const { data: tramitadores } = useTramitadores()
  const { data: operaciones } = useOperaciones()
  const { data: estados } = useEstados()

  const {
    data: solicitudes,
    loading,
    totalPages,
    currentPage
  } = useSolicitudesFiltradas({
    search,
    estadoId,
    tramiteId,
    tramitadorId,
    operacionesId,
    placa,
    fechaFinalizacionDesde,
    fechaFinalizacionHasta,
    page
  })

  const aplicarFiltros = () => setPage(1)

  const borrarFiltros = () => {
    setSearch('')
    setEstadoId('')
    setTramiteId('')
    setTramitadorId('')
    setOperacionesId('')
    setPlaca('')
    setFechaFinalizacionDesde('')
    setFechaFinalizacionHasta('')
    setPage(1)
  }

  return (
    <>
      <div className="w-full md:w-auto">
          <h1 className=" text-3xl text-gray-900 my-5 text-center">
            Dashboard - Torre de Control
          </h1>
          
        </div>
      {/* ===================== BUSCADOR ===================== */}
<div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center my-6">

  {/* INPUT BUSCAR - MISMO ANCHO QUE FECHAS */}
  <div className="md:col-span-3">
    <input
      placeholder="Buscar por ID o identificación"
      value={search}
      onChange={e => setSearch(e.target.value)}
      className="w-full border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>

  {/* BOTONES - MISMA ESTRUCTURA QUE FILA 2 */}
  <div className="md:col-span-2 flex justify-center items-center">
    <div className="flex gap-4">

      {/* Buscar */}
      <div className="relative group">
        <button
          onClick={aplicarFiltros}
          className="bg-blue-500 hover:bg-blue-600 transition text-white p-2 rounded-md"
        >
          <Search size={16} />
        </button>
        <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
          Buscar
        </span>
      </div>

      {/* Crear */}
      <div className="relative group">
        <Link
          href="/center/solicitudTramites/nueva"
          className="bg-red-500 hover:bg-red-600 transition text-white p-2 rounded-md flex items-center justify-center"
        >
          <Plus size={16} />
        </Link>
        <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
          Crear trámite
        </span>
        
        
      </div>
      {/* Torre Control */}
      <div className="relative group">
          <Link
          href="/center/torreControl"
          className="bg-emerald-400 hover:bg-sky-400 transition text-white p-2 rounded-md flex items-center justify-center"
        >
          <Radar size={16} />
        </Link>
        <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
          Torre Control
        </span>
      </div>

    </div>
  </div>

</div>


      {/* ===================== FILTROS ===================== */}
      <div className="my-8 space-y-6">

        {/* FILA 1 */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

          <input
            placeholder="Placa"
            value={placa}
            onChange={e => setPlaca(e.target.value)}
            className="border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
          />

          <select
            value={estadoId}
            onChange={e => setEstadoId(e.target.value)}
            className="border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <option value="">Estado</option>
            {estados.map(e => (
              <option key={e.id} value={e.id}>{e.nombreEstado}</option>
            ))}
          </select>

          <select
            value={tramiteId}
            onChange={e => setTramiteId(e.target.value)}
            className="border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <option value="">Trámite</option>
            {tramites.map(t => (
              <option key={t.id} value={t.id}>{t.nombreTramite}</option>
            ))}
          </select>

          <select
            value={tramitadorId}
            onChange={e => setTramitadorId(e.target.value)}
            className="border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <option value="">Tramitador</option>
            {tramitadores.map(t => (
              <option key={t.id} value={t.id}>{t.nombreTramitador}</option>
            ))}
          </select>

          <select
            value={operacionesId}
            onChange={e => setOperacionesId(e.target.value)}
            className="border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <option value="">Operación</option>
            {operaciones.map(o => (
              <option key={o.id} value={o.id}>{o.nombreOperacion}</option>
            ))}
          </select>
        </div>

        {/* FILA 2 */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">

          {/* FECHA */}
          <div className="md:col-span-3 bg-gray-100 border rounded-lg px-4 py-3">

            <p className="text-sm font-medium text-gray-700 mb-3 text-center">
              Fecha Finalización Servicio
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="flex flex-col items-center">
                <label className="text-xs text-gray-600 mb-1">Desde</label>
                <input
                  type="date"
                  value={fechaFinalizacionDesde}
                  onChange={e => setFechaFinalizacionDesde(e.target.value)}
                  className="border px-3 py-1.5 rounded-md text-sm text-center w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              <div className="flex flex-col items-center">
                <label className="text-xs text-gray-600 mb-1">Hasta</label>
                <input
                  type="date"
                  value={fechaFinalizacionHasta}
                  onChange={e => setFechaFinalizacionHasta(e.target.value)}
                  className="border px-3 py-1.5 rounded-md text-sm text-center w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

            </div>
          </div>

          {/* BOTONES */}
          <div className="md:col-span-2 flex justify-center items-center">
            <div className="flex gap-3">

              {/* Buscar */}
              <div className="relative group">
                <button
                  onClick={aplicarFiltros}
                  className="bg-blue-500 hover:bg-blue-600 transition text-white p-2 rounded-md"
                >
                  <Search size={16} />
                </button>
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                  Buscar
                </span>
              </div>

              {/* Filtrar */}
              <div className="relative group">
                <button
                  onClick={aplicarFiltros}
                  className="bg-sky-500 hover:bg-sky-600 transition text-white p-2 rounded-md"
                >
                  <Filter size={16} />
                </button>
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                  Filtrar
                </span>
              </div>

              {/* Borrar */}
              <div className="relative group">
                <button
                  onClick={borrarFiltros}
                  className="bg-gray-400 hover:bg-gray-500 transition text-white p-2 rounded-md"
                >
                  <Trash2 size={16} />
                </button>
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                  Borrar filtros
                </span>
              </div>

              {/* Crear */}
              <div className="relative group">
                <Link
                  href="/center/solicitudTramites/nueva"
                  className="bg-red-500 hover:bg-red-600 transition text-white p-2 rounded-md flex items-center justify-center"
                >
                  <Plus size={16} />
                </Link>
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                  Crear trámite
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>

     
      {/* ===================== LISTADO ===================== */}
      {loading ? (
        <p className="text-center py-10">Cargando...</p>
      ) : solicitudes.length ? (
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
                      Fecha en la que se debe Entregar Resultado:{" "}
                      <span className="font-normal text-gray-600">
                        {formatoFecha(solicitud.fechaEntregaResultado)}
                      </span>
                    </p>
                    
                    <p className="text-red-500 text-sm font-bold">
                      Fecha en la que se Finaliza el Servicio:{" "}
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

          {/* ===================== PAGINACIÓN ===================== */}
          <div className="flex justify-center items-center gap-3 mt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setPage(p => p - 1)}
              className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
            >
              ← Anterior
            </button>

            <span className="font-semibold">
              Página {currentPage} de {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setPage(p => p + 1)}
              className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
            >
              Siguiente →
            </button>
          </div>

        </>
      ) : (
        <p className="text-center py-20">
          No hay solicitudes que coincidan con la búsqueda.
        </p>
      )}
    </>
  )
}