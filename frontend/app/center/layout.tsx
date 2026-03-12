import CenterMenu from "@/components/menuCenter/centerMenu";
import LogoEncabezado from "@/components/ui/LogoEncabezado";
import ToastNotificaciones from "@/components/ui/notificaciones";
import { verificacionSesion } from "@/src/auth/dal";
import Link from "next/link";

export default async function CenterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {usuario}=await verificacionSesion()
 
  return (
    <>
      <header className='bg-blue-600/80 py-1'>
        <div className='max-w-4xl mx-auto flex flex-col lg:flex-row justify-end items-center'>
          <div className='w-96'>
            <Link href={'/center'}>
                <LogoEncabezado />
            </Link>
          </div>
          <CenterMenu
              usuario={usuario}
          />
        </div>
      </header>
      <section className='max-w-5xl mx-auto mt-20 p-3 py-10'>
        {children }
      </section>
      <ToastNotificaciones/>

      <footer className='py-5'>
        <p className='text-center'>
          Todos los Derechos Reservados {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
}