"use client"

import { usePanelControl } from "@/hooks/usePanelControl"
import Link from "next/link"

export default function PanelControl({setSemaforoFiltro}:any){

const data = usePanelControl()

if(!data) return null

return(

<div className="grid md:grid-cols-5 gap-4 mb-10">

<Card titulo="🔴 Vencidos" valor={data.vencidos} color="bg-red-500" filtro="VENCIDO" setSemaforoFiltro={setSemaforoFiltro}/>

<Card titulo="🟠 Vence Hoy" valor={data.vencen_hoy} color="bg-orange-500" filtro="VENCE_HOY" setSemaforoFiltro={setSemaforoFiltro}/>

<Card titulo="🟡 Próximos" valor={data.proximos} color="bg-yellow-400" filtro="PROXIMO_A_VENCER" setSemaforoFiltro={setSemaforoFiltro}/>

<Card titulo="🟢 Al Día" valor={data.al_dia} color="bg-green-500" filtro="AL_DIA" setSemaforoFiltro={setSemaforoFiltro}/>

 
<button
onClick={()=>setSemaforoFiltro(null)}
className="bg-gray-500 text-white px-3 py-2 rounded-lg"
>
Ver todos
</button>
    

</div>


)


}

function Card({titulo,valor,color,filtro,setSemaforoFiltro}:any){

return(

<div
onClick={()=>setSemaforoFiltro(filtro)}
className={`${color} text-white p-4 rounded-xl shadow-lg text-center cursor-pointer hover:scale-105 transition`}
>

<p className="text-sm">{titulo}</p>

<p className="text-3xl font-bold">{valor}</p>

</div>

)

}