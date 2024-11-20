
import ReactPaginate from 'react-paginate'

const Page=({total,postperpage,updatePage})=>{

    let array=[];
    let n=Math.ceil(total/postperpage)

    for(let i=1;i<=n;i++){
        array.push(i)
    }

    const handleChange=(data)=>{
        const temp=data.selected+1
        
      updatePage(temp)
    }
    return(
        <ul className="flex justify-center items-center flex-wrap">
            <ReactPaginate previousLabel={'previous'} nextLabel={'next'} breakLabel={'...'} pageCount={array.length} pageRangeDisplayed={2} marginPagesDisplayed={2}
            onPageChange={handleChange}
            containerClassName='flex gap-4 sticky mt-4 mb-4'
            pageClassName='font-bold shadow-md bg-gray-100 p-2 mb-4 sticky'
            activeClassName='bg-red-200 sticky'
            breakClassName='font-bold shadow-md bg-gray-100 p-1 pr-3 pl-3 mb-4 sticky'
            previousClassName='font-bold shadow-md bg-gray-100 p-2 mb-4 sticky'
            nextClassName='font-bold shadow-md bg-gray-100 p-2 mb-4 sticky'
            />
            {/* {array.map((items,index)=>(

                <li key={index} className="m-1 p-3 border-solid shadow-md hover:bg-blue-400">
                    <button onClick={()=>updatePage(items)}>{items}</button>
                       
                </li>
            
            ))} */}

        </ul>
    )


}

export default Page;
