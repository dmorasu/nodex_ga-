import CenterPageClient from "@/components/solicitudTramites/CenterPageClient"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nodex - Inicio",
}

// 🔹 Carga de solicitudes desde backend con paginación y búsqueda
async function getSolicitudes(searchParams: any) {
  const query = new URLSearchParams()

  if (searchParams.page) query.append("page", searchParams.page)
  if (searchParams.search) query.append("search", searchParams.search)

  const url = `${process.env.API_URL}/solicitudTramites?${query.toString()}`
  const req = await fetch(url, { cache: "no-store" })
  const json = await req.json()

  return json
}

export default async function CenterPage({ searchParams }: { searchParams: any }) {
  const response = await getSolicitudes(searchParams)

  return (
    <CenterPageClient
      solicitudes={response.data}
      totalPages={response.totalPages}
      currentPage={response.currentPage}
      searchInitial={searchParams.search || ""}
    />
  )
}
