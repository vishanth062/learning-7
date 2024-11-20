const PostDelete =async(id,setCheckUpadte)=>{

    try{

        const response= await fetch(`https://api.escuelajs.co/api/v1/products/${id}`,{
            method:'DELETE'
        })
        console.log(response)
        setCheckUpadte((prev)=>prev+1)

    }
    catch(error){
        console.log('there is a error',error)

    }

}

const callDelete=(id,setCheckUpadte)=>{
    PostDelete(id,setCheckUpadte)

}

export default callDelete