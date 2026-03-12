"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function cerrarSesion() {
  cookies().delete("TOKEN")

  // 🔹 Invalida cualquier ruta que haya usado sesión previa
  revalidatePath("/center")

  redirect("/auth/login")
}
