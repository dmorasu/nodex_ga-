"use client"

import { Fragment } from 'react'
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { Usuario } from '@/src/schemas'
import { cerrarSesion } from '@/actions/cerrarSesion'

export default function CenterMenu({ usuario }: { usuario: Usuario }) {
  return (
    <Popover className="relative">
      {({ close }) => (
        <>
          <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg bg-gray-400">
            <Bars3Icon className="w-8 h-8 text-white" />
          </PopoverButton>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <PopoverPanel className="absolute left-1/2 z-10 mt-5 flex w-screen lg:max-w-min -translate-x-1/2 lg:-translate-x-48">
              <div className="w-full lg:w-56 shrink rounded-xl bg-white p-4 text-sm  leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">

                <p className="text-center mb-2 font-semibold">
                  Hola:{" "}
                  <span className="text-orange-600 font-semibold">
                    {usuario.nombreUsuario.split(" ")[0]}
                  </span>
                </p>
                {/** 
                <Link
                  href="/center/dashboard"
                  onClick={() => close()}
                  className="block p-2 hover:text-orange-500"
                >
                  Dashboard
                </Link>
                
                <Link
                  href="/center/torreControl"
                  onClick={() => close()}
                  className="block p-2 hover:text-orange-500"
                >
                  Torre de Control
                </Link>
                */}
                <Link
                  href="/center"
                  onClick={() => close()}
                  className="block p-2 hover:text-orange-500"
                >
                  Tramites
                </Link>

                <Link
                  href="/center/clientes/nuevo"
                  onClick={() => close()}
                  className="block p-2 hover:text-orange-500"
                >
                  Clientes
                </Link>
                <Link
                  href="/center/cargueMasiva"
                  onClick={() => close()}
                  className="block p-2 hover:text-orange-500"
                >
                  Cargue Masivo Trámites
                </Link>
                <Link
                  href="/center/cargueMasivoClientes"
                  onClick={() => close()}
                  className="block p-2 hover:text-orange-500"
                >
                  Cargue Masivo Clientes
                </Link>

                <button
                  className="block w-full text-left p-2 hover:text-sky-500 text-orange-500 font-semibold"
                  type="button"
                  onClick={async () => {
                    close()   // ← cierra el menú inmediatamente
                    await cerrarSesion()
                  }}
                >
                  Cerrar Sesión
                </button>

              </div>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
