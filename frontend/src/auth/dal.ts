import "server-only"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { UserSchema } from "../schemas"

export const verificacionSesion = async () => {
  const token = cookies().get('TOKEN')?.value

  if (!token) {
    redirect('/auth/login')
  }

  const url = `${process.env.API_URL}/auth/user`

  const req = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    },
    cache: "no-store" // 🔹 evita cache de fetch
  })

  const session = await req.json()
  const resultado = UserSchema.safeParse(session)

  if (!resultado.success) {
    redirect('/auth/login')
  }

  return {
    usuario: resultado.data,
    isAuth: true
  }
}