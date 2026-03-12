import LoginForm from '@/components/auth/LoginForm'
import React from 'react'

export default function RegisterPage() {
  return (
    <>
        
        <h1 className='font-black text-6xl  text-gray-900 '>Iniciar Sesion</h1>
        <p className='text-3xl font-bold'>Gestión de Activos <span className='text-sky-400'>GPA</span></p> 
        <LoginForm />
    </>
  )
}
