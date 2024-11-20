
import ReactDOM from 'react-dom'
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect,useState } from 'react';
import MyDropzone from '../MyDropZone';
import PostData from './PostData';
import EditPortal from './EditPortal';
import catagary from './Catagory';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:'auto',
    bgcolor: 'background.paper',
   
    boxShadow: 24,
    p: 4,
  };

//   api call get pro/20
//    removeEventListener.tilte 

const APICall=async(id)=>{
    try {
        const api = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
        const data = await api.json();
       
      
        if (!api.ok) {
          throw new Error('There is an error; API failed');
        }
        const stringdata=data.images[0]
       console.log(data,'myyyyyyyyyy data')
       return data
  
      
  
      } catch (error) {
        console.log('The error is ', error);
      }

     
}

  
const Portal=({Portal,onclose,isPortal,id,setCheckUpadte})=>{
    const [open, setOpen] = React.useState(false);
    const [editData,seteditData]=useState(null)
     const [getcat,setcat]=useState([])
   
   
      
   
    const [portaldata,setportaldata]=useState({
        title: '',
        category: '',
        price: 0,
        description: '',
        images: null,
        id:0
    })

    useEffect(()=>{
  
        const fetch=async()=>{
            try{
                const data123= await catagary()
               
                setcat(data123)
            }
            catch(error){
                console.log(error,"all the error")
                
            }
           
        }
        fetch()


        if(!isPortal){

            const fetchdata=async()=>{
                const data= await APICall(id)
                console.log("helloooooooooooo",data.images[0])
                //seteditData( APICall(id))

                if(data) {
                    seteditData(data);
                    setportaldata({
                        title: data.title || '',
                        category: data.category.name || '',
                        price: data.price || 0,
                        description: data.description || '',
                        images: data.images[0] || null,
                        id:0
                    });
                }

            }
            fetchdata();

           
         }

    },[])   
    const onchangeTitle=(event)=>{
        console.log('title:',event.target.value)
        setportaldata((prev)=>({
            ...prev,
            title:event.target.value
        }))

    }

    const onchnageCatagary=(event)=>{
        const [name, id] = event.target.value.split(',');
        const ID=parseInt(id,10)
        console.log('catagary seeeeeeeeeeeee:',ID)
        setportaldata((prev)=>({
            ...prev,
            category:name,
            id:ID
        }))

    }

    const onchangePrice=(event)=>{
        console.log('price:',event.target.value)
        setportaldata((prev)=>({
            ...prev,
            price:event.target.value
        }))

    }

    const onchangeDiscreption=(event)=>{
        console.log('discrption:',event.target.value)
        setportaldata((prev)=>({
            ...prev,
            description:event.target.value
        }))        

    }
    const getdataURLPortal=(dataURL)=>{
        console.log('recivied the url',dataURL)
        setportaldata((prev)=>({
            ...prev,
            images:dataURL
        }))
    }

    const handleOpen = () => setOpen(true);


    const handleClose = (event) =>
         { 
            const savebutton=document.getElementById('Save')
        setOpen(false); 
        onclose();
        if(event.target===savebutton){

console.log("its post request ")
if(isPortal){
    console.log(portaldata.images,'just to check the url')
      PostData(portaldata,setCheckUpadte)
}
else{
    EditPortal(portaldata,id,setCheckUpadte)
}
        }
    };
    useEffect(()=>{

handleOpen()
    },[Portal])




    console.log(getcat,'catagaryyyyyyyyyyyy')

    return ReactDOM.createPortal(
        <>
         <div>
    
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
       
      >
        <Box sx={style}  className='rounded-md p-4' >
            <div className='items-end flex justify-end ' onClick={handleClose}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 cursor-pointer text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        </div>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
           
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            
<div className='flex justify-between'>
    <div>
    <p class="mb-2 text-md font-bold" >Title</p>
    <input class="focus-within:border-blue-300 mb-2 h-12 rounded-md border-2 px-2 py-1 outline-none w-full" type="text"  onChange={onchangeTitle} value={portaldata.title} />
    </div>

<div>

<p class="mb-2 text-md font-bold">Price</p>
        <input class="focus-within:border-blue-300 mb-2 h-12 rounded-md border-2 px-2 py-1 outline-none  w-full" type="text" onChange={onchangePrice} value={portaldata.price}/>
</div>
</div>

<div>
    <p class="mb-2 text-md font-bold">Category</p>
    
    {/* <p>{portaldata.category}</p> */}
    <select value={portaldata.category} onChange={onchnageCatagary} className='p-2 font-medium w-full'>
        <option disabled>{portaldata.category||'choose from here'}</option>
            
            {
                getcat.map(item => (
                    portaldata.category!==item.name&&<option key={item.id} value={`${item.name},${item.id}`} className='hover:bg-blue-400'>{item.name}</option>
                ))
            }
        </select>
       
    {/* <input class="focus-within:border-blue-300 mb-2 h-12 rounded-md border-2 px-2 py-1 outline-none" type="text" onChange={onchnageCatagary}  value={portaldata.category.name} /> */}
    </div>

    <div>
    <p class="mb-2 text-md font-bold" >Discription</p>
    <textarea
        class="focus-within:border-blue-300 mb-2 h-24 rounded-md border-2 px-2 py-1 outline-none w-full"
        placeholder="Type your description here..."
        rows="4"  
        onChange={onchangeDiscreption}
        value={portaldata.description}
    >

    </textarea>
    </div>


    <div class="flex flex-col items-center justify-center rounded-lg border-4 border-dashed px-4 py-10">
     

      <p class="mt-4 text-center text-xl font-medium text-gray-800">

        <MyDropzone getdataURL={portaldata.images} getdataURLPortal={getdataURLPortal} isPortal={isPortal}/>
        {/* Drop Files here or
        <label class="shadow-blue-100 mt-2 block rounded-full border bg-white px-4 py-0.5 font-normal text-blue-500 shadow hover:bg-blue-50">
          <input class="hidden" type="file" name="file" id="" />
          browse</label
        > */}
      </p>
     
    </div>

    <div className='flex justify-end items-center'>
    <button id='Save' className="rounded-lg pr-2 pl-2 bg-blue-300 text-white mt-2" onClick={handleClose}>save</button>
    </div>
        
          </Typography>
        </Box>
      </Modal>
    </div>
        </>,
        document.body
    )
}

export default Portal





// import ReactDOM from 'react-dom';
// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Typography from '@mui/material/Typography';
// import { useState, useEffect } from 'react';

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 'auto',
//     bgcolor: 'background.paper',
//     boxShadow: 24,
//     p: 4,
// };

// const Portal = ({ Portal: isOpen, onclose }) => {
//     const [open, setOpen] = React.useState(isOpen);
//     const [title, setTitle] = useState('');
//     const [price, setPrice] = useState('');
//     const [category, setCategory] = useState('');
//     const [description, setDescription] = useState('');
//     const [file, setFile] = useState(null);
//     const [isFormValid, setIsFormValid] = useState(false);

//     const handleOpen = () => setOpen(true);
//     const handleClose = () => { setOpen(false); onclose(); };

//     const handleFileDrop = (event) => {
//         event.preventDefault();
//         const droppedFiles = event.dataTransfer.files;
//         if (droppedFiles.length > 0) {
//             setFile(droppedFiles[0]);
//         }
//     };

//     const handleFileSelect = (event) => {
//         setFile(event.target.files[0]);
//     };

//     const handleSave = () => {
//         if (isFormValid) {
//             // Handle save logic here
//             console.log("Saved data:", { title, price, category, description, file });
//         }
//     };

//     const validateForm = () => {
//         setIsFormValid(title && price && category && description && file);
//     };

//     useEffect(() => {
//         handleOpen();
//     }, [isOpen]);

//     useEffect(() => {
//         validateForm();
//     }, [title, price, category, description, file]);

//     return ReactDOM.createPortal(
//         <>
//             <Modal
//                 keepMounted
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="keep-mounted-modal-title"
//                 aria-describedby="keep-mounted-modal-description"
//             >
//                 <Box sx={style} className='rounded-md'>
//                     <div className='items-end flex justify-end'>
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-5 w-5 cursor-pointer text-gray-400"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             onClick={handleClose}
//                         >
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                     </div>
//                     <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
//                         Add New Item
//                     </Typography>
//                     <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
//                         <div className='flex flex-col gap-3'>
//                             <div>
//                                 <p className="mb-2 text-md font-bold">Title</p>
//                                 <input
//                                     className="focus-within:border-blue-300 mb-2 h-12 rounded-md border-2 px-2 py-1 outline-none"
//                                     type="text"
//                                     value={title}
//                                     onChange={(e) => setTitle(e.target.value)}
//                                 />
//                             </div>

//                             <div>
//                                 <p className="mb-2 text-md font-bold">Price</p>
//                                 <input
//                                     className="focus-within:border-blue-300 mb-2 h-12 rounded-md border-2 px-2 py-1 outline-none"
//                                     type="text"
//                                     value={price}
//                                     onChange={(e) => setPrice(e.target.value)}
//                                 />
//                             </div>

//                             <div>
//                                 <p className="mb-2 text-md font-bold">Category</p>
//                                 <input
//                                     className="focus-within:border-blue-300 mb-2 h-12 rounded-md border-2 px-2 py-1 outline-none"
//                                     type="text"
//                                     value={category}
//                                     onChange={(e) => setCategory(e.target.value)}
//                                 />
//                             </div>

//                             <div>
//                                 <p className="mb-2 text-md font-bold">Description</p>
//                                 <textarea
//                                     className="focus-within:border-blue-300 mb-2 h-24 rounded-md border-2 px-2 py-1 outline-none"
//                                     placeholder="Type your description here..."
//                                     rows="4"
//                                     value={description}
//                                     onChange={(e) => setDescription(e.target.value)}
//                                 />
//                             </div>

//                             <div
//                                 className="flex flex-col items-center justify-center rounded-lg border-4 border-dashed px-4 py-10"
//                                 onDrop={handleFileDrop}
//                                 onDragOver={(e) => e.preventDefault()}
//                             >
//                                 <p className="mt-4 text-center text-xl font-medium text-gray-800">
//                                     Drop Files here or
//                                     <label
//                                         className="shadow-blue-100 mt-2 block rounded-full border bg-white px-4 py-0.5 font-normal text-blue-500 shadow hover:bg-blue-50"
//                                     >
//                                         <input
//                                             className="hidden"
//                                             type="file"
//                                             onChange={handleFileSelect}
//                                         />
//                                         browse
//                                     </label>
//                                 </p>
//                                 {file && (
//                                     <div className="mt-2 text-gray-600">
//                                         {file.name}
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                         <div className="flex justify-end mt-4">
//                             <button
//                                 variant="contained"
//                                 color="primary"
//                                 onClick={handleSave}
//                                 disabled={!isFormValid}
//                             >
//                                 Save
//                             </button>
//                         </div>
//                     </Typography>
//                 </Box>
//             </Modal>
//         </>,
//         document.body
//     );
// };

// export default Portal;








// const postData = async () => {
//     try {
//       const response = await fetch('https://api.escuelajs.co/api/v1/products/', {
//         method: 'POST', // Specify the request method
//         headers: {
//           'Content-Type': 'application/json', // Indicate the type of content being sent
//         },
//         body: JSON.stringify({
//           // The data you want to send in the request body
//           title: 'New Product',
//           price: 100,
//           description: 'This is a description of the new product.',
//           categoryId: 1,
//           images: ['https://example.com/image.jpg']
//         }),
//       });
  
//       if (!response.ok) {
//         // Handle HTTP errors
//         throw new Error('Network response was not ok');
//       }
  
//       const data = await response.json();
//       console.log('Success:', data);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
  
//   postData();
  