'use client'

import { useEffect, useState } from 'react'

interface Filtros {
  search?: string
  estadoId?: string
  tramiteId?: string
  tramitadorId?: string
  operacionesId?: string
  placa?: string
  fechaFinalizacionDesde?: string
  fechaFinalizacionHasta?: string
  page?: number
}

export function useSolicitudesFiltradas(filtros: Filtros) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setLoading(true)

    const query = new URLSearchParams()

    Object.entries(filtros).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== '' &&
        value !== null
      ) {
        query.set(key, String(value))
      }
    })

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/solicitudTramites/filtrar?${query.toString()}`
    )
      .then(res => res.json())
      .then(res => {
        setData(Array.isArray(res.data) ? res.data : [])
        setTotalPages(res.totalPages ?? 1)
        setCurrentPage(res.currentPage ?? 1)
      })
      .catch(error => {
        console.error('Error cargando solicitudes:', error)
        setData([])
      })
      .finally(() => setLoading(false))

  }, [JSON.stringify(filtros)])

  return {
    data,
    loading,
    totalPages,
    currentPage
  }
}
