'use client'

import { useState } from 'react'

type ErrorExcel = {
  fila: number
  error: string
}

type ResultadoCarga = {
  message: string
  totalProcesados: number
  creados: number[]
  errores: ErrorExcel[]
}

export default function CargaMasivaClientes() {

  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)
  const [modo, setModo] = useState<'validar' | 'cargar' | null>(null)

  const [resultado, setResultado] = useState<ResultadoCarga>({
    message: '',
    totalProcesados: 0,
    creados: [],
    errores: []
  })

  // ==========================
  // 📄 Descargar plantilla
  // ==========================
  const descargarPlantilla = () => {
    window.location.href =
      `${process.env.NEXT_PUBLIC_API_URL}/clientes/plantilla`
  }

  // ==========================
  // ✅ VALIDAR
  // ==========================
  const validarArchivo = async () => {
    if (!file) return

    try {
      setLoading(true)
      setModo('validar')

      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/clientes/validar-excel`,
        {
          method: 'POST',
          body: formData,
          credentials: 'include'
        }
      )

      const json = await res.json()

      if (!res.ok) {
        alert(json.message || 'Error validando archivo')
        return
      }

      setResultado({
        message: json.message ?? '',
        totalProcesados: json.totalProcesados ?? 0,
        creados: [],
        errores: json.errores ?? []
      })

    } catch (error) {
      alert('Error validando archivo')
    } finally {
      setLoading(false)
    }
  }

  // ==========================
  // 📥 CARGAR
  // ==========================
  const subirArchivo = () => {
    if (!file) return

    setLoading(true)
    setProgress(0)
    setModo('cargar')

    const formData = new FormData()
    formData.append('file', file)

    const xhr = new XMLHttpRequest()

    xhr.open(
      'POST',
      `${process.env.NEXT_PUBLIC_API_URL}/clientes/carga-masiva`
    )

    xhr.withCredentials = true

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100)
        setProgress(percent)
      }
    }

    xhr.onload = () => {
      try {
        const json = JSON.parse(xhr.responseText)

        if (xhr.status !== 200) {
          alert(json.message || 'Error del servidor')
          setLoading(false)
          return
        }

        setResultado({
          message: json.message ?? '',
          totalProcesados: json.totalProcesados ?? 0,
          creados: json.creados ?? [],
          errores: json.errores ?? []
        })

      } catch {
        alert('Respuesta inválida del servidor')
      } finally {
        setLoading(false)
      }
    }

    xhr.onerror = () => {
      setLoading(false)
      alert('Error en la carga')
    }

    xhr.send(formData)
  }

  const { totalProcesados, creados, errores } = resultado

  return (
    <div className="border p-6 rounded-xl shadow-lg space-y-6 max-w-xl bg-white">

      <h2 className="text-xl font-bold text-gray-800">
        Carga masiva de Clientes
      </h2>

      <button
        onClick={descargarPlantilla}
        className="w-full bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 font-medium py-2 rounded-lg transition"
      >
        📄 Descargar plantilla Excel
      </button>

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="w-full border rounded-lg p-2"
      />

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={validarArchivo}
          disabled={!file || loading}
          className="bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg font-semibold disabled:bg-gray-400 transition"
        >
          Validar Excel
        </button>

        <button
          onClick={subirArchivo}
          disabled={!file || loading}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold disabled:bg-gray-400 transition"
        >
          Cargar Excel
        </button>
      </div>

      {loading && modo === 'cargar' && (
        <div className="space-y-2">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-blue-600 h-3 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 text-center">
            Subiendo archivo... {progress}%
          </p>
        </div>
      )}

      {(modo === 'validar' || modo === 'cargar') && (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm space-y-1">

          <p>
            <span className="font-semibold">Total filas:</span> {totalProcesados}
          </p>

          {modo === 'cargar' && (
            <>
              <p className="text-green-600 font-semibold">
                Guardadas: {creados.length}
              </p>
              <p className="text-red-500 font-semibold">
                Errores: {errores.length}
              </p>
            </>
          )}

          {modo === 'validar' && (
            <p className="font-semibold">
              Errores encontrados:
              <span className="text-red-600"> {errores.length}</span>
            </p>
          )}
        </div>
      )}

      {errores.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm space-y-2">
          <p className="font-semibold text-red-700">
            Detalle de errores:
          </p>

          <div className="max-h-40 overflow-y-auto space-y-1">
            {errores.map((err, index) => (
              <div key={index} className="text-red-600">
                Fila {err.fila}: {err.error}
              </div>
            ))}
          </div>
        </div>
      )}

      {modo === 'validar' && errores.length === 0 && (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 text-sm font-semibold text-center">
          Archivo validado correctamente. Ya puedes cargarlo.
        </div>
      )}
    </div>
  )
}
