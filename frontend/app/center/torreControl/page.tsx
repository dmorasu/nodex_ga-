import TorreControlClient from "@/components/torreControl/TorreControlClient"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Torre de Control",
}

export default function Page() {
  return <TorreControlClient />
}