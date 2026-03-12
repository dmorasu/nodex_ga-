"use client"
import { Fragment } from "react"
import Link from "next/link"
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import { SolicitudTramites } from "@/src/schemas"
import { useRouter } from "next/navigation"


export default function SolicitudTramiteMenu({solicitudId}:{solicitudId:SolicitudTramites['id']}) {
  const router =useRouter()
  return (
    <>
      <Menu as="div" className="relative flex-none">
        <MenuButton className="-m-2.5 block p-2.5 rounded-2xl bg-gray-100 text-gray-500 hover:text-gray-900">
          <span className="sr-only">opciones</span>
          <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
        </MenuButton>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
            <MenuItem>
              <Link
                href={`/center/solicitudTramites/${solicitudId}`}
                className='block px-3 py-1 text-sm leading-6 text-gray-900'
              >
                Ver Trámite
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                href={`/center/solicitudTramites/${solicitudId}/edit`}
                className='block px-3 py-1 text-sm leading-6 text-sky-500 font-semibold hover:text-red-500'
              >
                Editar 
              </Link>
            </MenuItem>
            
            

            
          </MenuItems>
        </Transition>
      </Menu>
    </>
  )
}