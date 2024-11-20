import Portal from "./Portals/Portal.js";
import AdiminProduct from "./AdiminProduct.js";
import Filter from "./Portals/Filter.js";
import { useState } from "react";
 const Adimin=()=>{
    const [portal,setportal]=useState(false)
    const [checkupdate,setCheckUpadte]=useState(0)
    const isPortal=true

    function onclose(){
        
        setportal(false)
    }
    return (
        <>
       
       {portal&&<Portal portal={portal} onclose={onclose} isPortal={isPortal} id={0} setCheckUpadte={setCheckUpadte}/>}
   { <><div className="flex justify-between p-4 font-bold ">
            <h1 className="text-4xl">List Of Products</h1>
            <button className="bg-blue-700 rounded-lg p-2 text-white"  onClick={()=>setportal(true)}>+ Add product</button>
        </div>
          <AdiminProduct setCheckUpadte={setCheckUpadte} checkupdate={checkupdate}/>
          </>
   }
          
 
       
        </>
    )
}
export default Adimin