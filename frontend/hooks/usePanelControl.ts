import { useEffect, useState } from "react"

export function usePanelControl(){

 const [data,setData] = useState<any>(null)

 useEffect(()=>{

 fetch(`${process.env.NEXT_PUBLIC_API_URL}/solicitudTramites/panel-control`)
 .then(res=>res.json())
 .then(res=>setData(res))

 },[])

 return data
}