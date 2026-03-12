"use client"

import Link from "next/link"
import PanelControl from "./PanelControl"
import { useEffect, useState } from "react"

export default function TorreControlClient() {

    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const [search, setSearch] = useState("")
    const [searchDebounced, setSearchDebounced] = useState("")

    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const [semaforoFiltro, setSemaforoFiltro] = useState<string | null>(null)


    // ==============================
    // DEBOUNCE BUSCADOR
    // ==============================

    useEffect(() => {

        const timeout = setTimeout(() => {
            setSearchDebounced(search)
        }, 500)

        return () => clearTimeout(timeout)

    }, [search])


    // ==============================
    // FETCH DATOS
    // ==============================

    useEffect(() => {

        setLoading(true)

        const query = new URLSearchParams()

        if (semaforoFiltro) {
            query.append("semaforo", semaforoFiltro)
        }

        if (searchDebounced) {
            query.append("search", searchDebounced)
        }

        query.append("page", String(page))

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/solicitudTramites/torre-control?${query}`)
            .then(res => res.json())
            .then(res => {
                setData(res.data)
                setTotalPages(res.totalPages)
            })
            .finally(() => setLoading(false))

    }, [semaforoFiltro, page, searchDebounced])


    // ==============================
    // COLORES
    // ==============================

    const semaforoColor: any = {
        VENCIDO: "bg-red-500",
        VENCE_HOY: "bg-orange-500",
        PROXIMO_A_VENCER: "bg-yellow-400",
        AL_DIA: "bg-blue-500",
        CUMPLIDO: "bg-green-500"
    }

    const semaforoEmoji: any = {
        VENCIDO: "🔴",
        VENCE_HOY: "🟠",
        PROXIMO_A_VENCER: "🟡",
        AL_DIA: "🟢",
        CUMPLIDO: "✅",
        SIN_FECHA: "⚪"
    }


    // ==============================
    // LOADING
    // ==============================

    if (loading) {
        return <p className="text-center mt-20">Cargando Torre de Control...</p>
    }


    // ==============================
    // UI
    // ==============================

    return (

        <div className="max-w-6xl mx-auto">

            <h1 className="text-xl font-bold text-center my-8">
                🛰 Torre de Control
            </h1>

           


            {/* ==============================
BUSCADOR
============================== */}

            <div className="flex justify-center my-6 gap-6">

                <div className="relative">

                    <input
                        type="text"
                        placeholder="Buscar solicitud..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setPage(1)
                        }}
                        className="border px-4 py-2 rounded-lg w-80 shadow pl-10"
                    />

                    <span className="absolute left-3 top-2.5">🔎</span>

                </div>

                <div>
                        <Link
      href="/center/dashboard"
      className="
        px-4 py-2 
        bg-red-400 text-slate-50 font-medium rounded-md
        hover:bg-white hover:text-slate-600 
        hover:border hover:border-red-400
        transition
        text-center
        block
      "
    >
      Ver Dashboard
    </Link>
                </div>

            </div>


            {/* ==============================
PANEL CONTROL
============================== */}

            <PanelControl setSemaforoFiltro={setSemaforoFiltro} />


            {/* ==============================
LISTA
============================== */}

            <ul className="grid md:grid-cols-2 gap-6">

                {data.map((solicitud: any) => (

                    <li
                        key={solicitud.id}
                        className="bg-white border shadow-lg rounded-xl p-6 hover:shadow-xl transition"
                    >

                        <Link
                            href={`/center/solicitudTramites/${solicitud.id}`}
                            className="text-lg font-bold text-red-500 hover:underline"
                        >
                            Solicitud Trámite N: {solicitud.id}
                        </Link>

                        <div className="mt-4 flex items-center gap-3">

                            <span className="text-xl">
                                {semaforoEmoji[solicitud.semaforo] || "⚪"}
                            </span>

                            <span
                                className={`px-3 py-1 text-white rounded-lg text-sm font-semibold ${semaforoColor[solicitud.semaforo] || "bg-gray-400"
                                    }`}
                            >
                                {solicitud.semaforo}
                            </span>

                        </div>

                        <p className="mt-3 text-gray-600">
                            📌 Estado: <strong>{solicitud.estado}</strong>
                        </p>

                        <p className="text-gray-600">
                            📊 Cumplimiento ANS: <strong>{solicitud.cumplimiento_ans}</strong>
                        </p>

                        <p className="text-gray-600">
                            ⏱ Días ANS: <strong>{solicitud.dias_ans}</strong>
                        </p>

                        <p className="text-gray-600">
                            📅 Días Caso: <strong>{solicitud.dias_caso}</strong>
                        </p>

                    </li>

                ))}

            </ul>


            {/* ==============================
PAGINACIÓN
============================== */}

            <div className="flex justify-center items-center gap-4 mt-10">

                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
                >
                    ← Anterior
                </button>

                <span className="font-semibold">
                    Página {page} de {totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
                >
                    Siguiente →
                </button>

            </div>

        </div>

    )

}