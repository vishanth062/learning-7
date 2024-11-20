import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import PostURL from "./Portals/PostURL";
import { useEffect } from "react";

const validURL=(getdataURL)=>{
    try{
        new URL(getdataURL)
        return true

    }
    catch(error){
        return false

    }
}

function MyDropzone({ getdataURL,getdataURLPortal,isPortal}) {
  const [dataURL, setDataURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(()=>{
    if(validURL(getdataURL)){
        setDataURL(getdataURL)
    }

  },[getdataURL])


  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("File reading was aborted");
      reader.onerror = () => console.log("File reading has failed");
      reader.onprogress = (event) => {
        if (event.loaded && event.total) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setProgress(percent);
        }
      };

      reader.onloadstart = () => {
        setLoading(true);
        setProgress(0);
      };

      reader.onload = () => {
        const fileDataURL = reader.result;
        console.log('okkkkkkkkkk',JSON.stringify(fileDataURL))
        setDataURL(fileDataURL);
        setLoading(false);

        if(validURL(getdataURL)){
         getdataURLPortal(getdataURL)
      }
       else{
        PostURL(file,getdataURLPortal).catch((error) => console.error('Error uploading file:', error));
       }
        
       
      };

      reader.readAsDataURL(file);
    });
  }, [getdataURL]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleDelete = () => {
    setDataURL(null);
  };

  return (
    <div {...getRootProps({ className: "dropzone" })} style={{  padding: '20px', textAlign: 'center' }}>
      <input {...getInputProps()} />
      {loading && (
        <div className="relative mt-2">
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg">
            <div className="relative w-full bg-gray-300 rounded">
              <div
                className="bg-blue-600 h-2 rounded"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="absolute text-blue-600">{progress}%</p>
          </div>
        </div>
      )}
      {dataURL ? (
        <>
          <img src={dataURL} className="max-w-full max-h-32 h-fit" alt="Preview" />
          <button onClick={handleDelete} className="rounded-lg p-2 bg-blue-300 text-white">Delete</button>
        </>
      ) : (
        <>
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <>
              <p>Drag 'n' drop some files here, or click to select files</p>
              <label className="shadow-blue-100 mt-2 block rounded-full border bg-white px-4 py-0.5 font-normal text-blue-500 shadow hover:bg-blue-50">
                <input className="hidden" type="file" />
                Browse
              </label>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default MyDropzone;
