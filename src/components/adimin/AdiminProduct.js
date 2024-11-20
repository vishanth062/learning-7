import { useEffect, useState } from "react";
import Page from "./Ppage.js";
import PostURL from "./Portals/PostURL.js";
import callDelete from "./Portals/PostDelete.js";
import Portal from "./Portals/Portal.js";
import Filter from "./Portals/Filter.js";
import cancleImage from "./Portals/CancleImage.png"
import NoItemLandingPage from "./NoItemLandingPage.jpg"











const AdiminProduct = ({checkupdate,setCheckUpadte}) => {

  const [Data, setData] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  const [total, settotal] = useState(0);
  const [portal, setportal] = useState(false);
  const [getid, setgetid] = useState(0);
  const [filter, setfilter] = useState([]);
  const [serachQuery,setSearchQuery]=useState('')
  const isPortal = false;
  const postperpage = 10;

  const lastPost = currentpage * postperpage;
  const firstPost = lastPost - postperpage;

 
  //const getRandomDelay = (min, max) => Math.floor(Math.random() * (max - min + 1) + min) * 1000;



 const API = async () => {
    try {
      const api = await fetch(`https://api.escuelajs.co/api/v1/products`);
      if (!api.ok) {
        throw new Error('There is an error; API failed');
      }
      let data = await api.json();

      // Apply filter if it exists
      if (filter.length > 0) {
        data = data.filter(product => product.category.name === filter[0]&&product.price<=filter[1]);
      }
      if (serachQuery.length>0) {
        data = data.filter(product => 
          product.title.toLowerCase().includes(serachQuery.toLowerCase())
        );
      }

      // Set total count based on filtered data
      settotal(data.length);

      // Set paginated data based on filtered data
      setData(data.slice(firstPost, lastPost));

    } catch (error) {
      console.log('The error is ', error);
    }
  };

  

  useEffect(() => {
    API();
  }, [currentpage,filter,serachQuery,checkupdate]); // Removed Data from dependencies


  //setInterval(API,Math.floor(Math.random()*(60-5+1)+5)*1000)


  const updatePage = (items) => {
    setcurrentpage(items);
  };

  const onclose = () => {
    setportal(false);
  };

  const onClickFun = (id) => {
    setgetid(id);
    setportal(true);
  };

  const handleFilter = (data,removeFilter) => {
    console.log('Filter call received', data);
    if(removeFilter){
      setfilter([])
    }
    else{
      setfilter([...data]);
    }
    
  };

  const handleSearch=(event)=>{

    setSearchQuery(event.target.value)

  }

  return (
    <>
    <div className="flex gap-4 items-center ">
      <Filter handleFilter={handleFilter} />
      <div class=" w-screen max-w-screen-md  leading-6"> 
  <form class="relative mx-auto flex justify-between w-full max-w-2xl items-center  rounded-md border shadow-lg"> 
    <svg class="absolute left-2 block h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8" class=""></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65" class=""></line>
    </svg>
    <input type="name" name="search" class="h-14 w-full rounded-md py-4 pr-40 pl-12 outline-none focus:ring-2" placeholder="Search....." onChange={handleSearch} />
    <button type="submit" class="absolute right-0 mr-1 font-bold inline-flex h-full items-center justify-center rounded-lg bg-blue-700 px-10  text-white  " disabled>Search</button>
  </form>
</div>

      </div>
      {portal && <Portal Portal={Portal} onclose={onclose} isPortal={isPortal} id={getid} setCheckUpadte={setCheckUpadte}/>}
      {Data.length<=0&&<div className="flex justify-center"><img src={NoItemLandingPage} /></div>}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
{Data.length>0&&<thead>
            <tr className="p-2 shadow-lg rounded-md m-3 flex justify-between text-gray-400 font-semibold">
              <th className="flex-1 justify-start">Name</th>
              <th className="flex-1 justify-start">Category</th>
              <th className="flex-1 justify-start">Price</th>
              <th className="flex-1 justify-start">ID</th>
              <th className="flex-1 justify-start"></th>
              <th className="flex-1 justify-start items-start"></th>
            </tr>
          </thead>}
          <tbody >
            {Data.map((item, index) => (
              <tr key={index} className="p-2 shadow-lg rounded-md m-3 flex items-center justify-between">
                <td className="flex items-center flex-nowrap">
                  <img src={item.images[0]} className="w-10 h-10 rounded-full mr-2"  />
                  <div className=" flex flex-nowrap ">{item.title}</div>
                </td>
                <td>{item.category.name}</td>
                <td>
                  <span className="bg-green-200 font-bold pr-1 pl-1 h-1/2 w-fit rounded-lg text-green-950 flex inline-block">
                    ${item.price}
                  </span>
                </td>
                <td>{item.id}</td>
                <td><button className="text-blue-700" onClick={() => onClickFun(item.id)}>Edit</button></td>
                <td><button className="font-bold w-6 h-6 text-xlflex items-center justify-center" onClick={() => callDelete(item.id,setCheckUpadte)}>
  <img src={cancleImage}/>
</button>
<p>Right Arrow: &#8594;</p>
</td>
              </tr>
            ))}
          </tbody>
        </table>
       {total>10&&<Page total={total} postperpage={postperpage} updatePage={updatePage} />}
      </div>
    </>
  );
};

export default AdiminProduct;
