import Logo from "@/components/ui/Logo";
import ToastNotificaciones from "@/components/ui/notificaciones";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>  
        <div className=" lg:grid lg:grid-cols-2 lg:min-h-screen">
            <div className="flex justify-center bg-blue-600/80 bg-auth bg-30 bg-no-repeat bg-left-bottom  ">

                <div className="w-full flex justify-center items-center py-100">

                    <Logo />
                </div>

            </div>
            <div className="p-10 lg:py-28">
                <div className=" max-w-3xl"></div>
                 {children}
            </div>

        </div>
        <ToastNotificaciones></ToastNotificaciones>
       
    </>
    
  );
}

