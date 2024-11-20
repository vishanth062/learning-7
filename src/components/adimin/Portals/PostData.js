

const PostData=async (portaldata,setCheckUpadte)=>{

   

    try{
        console.log( 'its imageeeeeeeeeee',portaldata.images)
        const response= await fetch('https://api.escuelajs.co/api/v1/products/',{
            method: 'POST',
            headers:{
                'content-type': 'application/json',
            },
            body:JSON.stringify({
                title:portaldata.title,
                price:portaldata.price,
                description:portaldata.description,
                categoryId:portaldata.id,
                images:portaldata.images ? [portaldata.images] : []
            })
        }
        )

        
        const data =await response.json()
        console.log(data)

        setCheckUpadte((prev)=>prev+1)

    }
    catch(error){

    }


}

export default PostData