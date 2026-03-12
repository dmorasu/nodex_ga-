"use client"

import { useState, useEffect } from "react"
import { crearEvaluacion } from "@/actions/crear-Evaluacion-action"

type Props = {
  closeModal: () => void
  solicitudId: number
}

type Pregunta = {
  id: number
  texto: string
}

export default function EvaluacionModal({ closeModal, solicitudId }: Props) {

  const [preguntas, setPreguntas] = useState<Pregunta[]>([])
  const [respuestas, setRespuestas] = useState<Record<number, number>>({})
  const [loading, setLoading] = useState(false)
  const [loadingPreguntas, setLoadingPreguntas] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  // ===============================
  // cargar preguntas desde backend
  // ===============================
  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/solicitudes/evaluacion/preguntas`,
          { credentials: "include" }
        )
        const data = await res.json()
        setPreguntas(data)
      } catch {
        setError("Error cargando preguntas")
      } finally {
        setLoadingPreguntas(false)
      }
    }

    fetchPreguntas()
  }, [])

  // ===============================
  // validar que todas respondidas
  // ===============================
  const todasRespondidas =
    preguntas.length > 0 &&
    preguntas.every(p => respuestas[p.id])

  // ===============================
  // enviar evaluación
  // ===============================
  const handleSubmit = async () => {

    if (!todasRespondidas) {
      setError("Debes responder todas las preguntas")
      return
    }

    setLoading(true)
    setError("")

    const data = Object.entries(respuestas).map(([preguntaId, calificacion]) => ({
      preguntaId: Number(preguntaId),
      calificacion
    }))

    try {
      await crearEvaluacion(solicitudId, data)

      // mostrar mensaje éxito
      setSuccess(true)

      // cerrar modal automáticamente
      setTimeout(() => {
        closeModal()
        window.history.replaceState({}, "", window.location.pathname)
window.location.reload()
      }, 1800)

    } catch {
      setError("Error enviando evaluación")
    } finally {
      setLoading(false)
    }
  }

  if (loadingPreguntas) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-pulse text-gray-500">
          Cargando encuesta...
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">

      {/* HEADER */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-sky-500">
          Evalúa el servicio
        </h2>
        <p className="text-gray-500">
          Tu opinión nos ayuda a mejorar
        </p>
      </div>

      {/* MENSAJE EXITO */}
      {success && (
        <div className="bg-green-100 text-green-700 p-4 rounded text-center font-semibold">
          ✅ Encuesta realizada correctamente. Gracias por tu opinión.
        </div>
      )}

      {/* ERROR */}
      {error && !success && (
        <div className="bg-red-100 text-red-600 p-3 rounded text-center">
          {error}
        </div>
      )}

      {/* PREGUNTAS */}
      <div className="space-y-6">

        {preguntas.map(p => (
          <div
            key={p.id}
            className="bg-gray-50 p-6 rounded-xl border space-y-4"
          >
            <p className="font-semibold text-lg text-gray-700">
              {p.texto}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">

              {[
                { value: 1, label: "Malo" },
                { value: 2, label: "Regular" },
                { value: 3, label: "Bueno" },
                { value: 4, label: "Excelente" }
              ].map(option => {

                const selected = respuestas[p.id] === option.value

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setRespuestas(prev => ({
                        ...prev,
                        [p.id]: option.value
                      }))
                    }
                    className={`
                      p-4 rounded-xl border transition-all
                      ${selected
                        ? "bg-sky-500 text-white border-sky-500 shadow-lg"
                        : "hover:bg-sky-50"
                      }
                    `}
                  >
                    <div className="text-2xl font-bold">{option.value}</div>
                    <div className="text-sm">{option.label}</div>
                  </button>
                )
              })}

            </div>
          </div>
        ))}

      </div>

      {/* BOTON ENVIAR */}
      {!success && (
        <div className="pt-6">
          <button
            disabled={!todasRespondidas || loading}
            onClick={handleSubmit}
            className={`
              w-full py-4 rounded-xl font-bold text-lg transition-all
              ${todasRespondidas
                ? "bg-sky-500 text-white hover:bg-sky-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            {loading ? "Enviando evaluación..." : "Enviar evaluación"}
          </button>
        </div>
      )}

    </div>
  )
}