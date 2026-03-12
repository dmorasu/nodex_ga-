import { useEffect, useState } from "react"

export function useTorreControl(){

 const [data,setData] = useState<any[]>([])
 const [loading,setLoading] = useState(true)

 useEffect(()=>{

 fetch(`${process.env.NEXT_PUBLIC_API_URL}/solicitudTramites/torre-control`)
 .then(res=>res.json())
 .then(res=>{
  setData(res)
  setLoading(false)
 })

 },[])

 return {data,loading}

}