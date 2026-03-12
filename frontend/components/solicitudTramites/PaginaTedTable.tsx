"use client"

import { useState } from "react"
import Link from "next/link"
import { formatoFecha } from "@/src/ultis"

interface PaginatedTableProps {
  solicitudes: any[]
  pageSize: number
  totalPages: number
}

export default function PaginatedTable({
  solicitudes,
  pageSize,
  totalPages,
}: PaginatedTableProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const startIndex = (currentPage - 1) * pageSize
  const currentItems = solicitudes.slice(startIndex, startIndex + pageSize)

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page)
  }

  return (
    <>
      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">#</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Cliente</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Fecha</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Estado</th>
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((solicitud, index) => (
            <tr key={solicitud.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{startIndex + index + 1}</td>
              <td className="px-4 py-2">{solicitud.clientes?.nombreCliente ?? "Sin cliente"}</td>
              <td className="px-4 py-2">{formatoFecha(solicitud.createdAt)}</td>
              <td className="px-4 py-2">
                <span className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-800">
                  {solicitud.estado ?? "Pendiente"}
                </span>
              </td>
              <td className="px-4 py-2 text-center">
                <Link
                  href={`/center/${solicitud.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Ver
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Anterior
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </>
  )
}
