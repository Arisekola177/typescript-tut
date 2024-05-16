'use client'

import { useState } from "react";
import {ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage'
import { storage } from "./firebase";


export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
   const [downloadURL, setDownloadURL] = useState('')


   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files && event.target.files[0]){
      setFile(event.target.files[0])
    }
   }


   const handleUpload = () => {
    if(!file) return;

    const fileRef = ref(storage, `files/${file.name}`)
    const uploadTask = uploadBytesResumable(fileRef, file)

    uploadTask.on(
      "state_changed",
      (snapshot )=> {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error('Error uploading file', error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=> {
          setDownloadURL(downloadURL)
        } );
      }
    )
   }

   const handleDownload = () => {
    if(downloadURL){
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = file?.name || '';
      document.body.appendChild(link);
      link.click()
      document.body.removeChild(link)
    }
   }
  return (
    <main className='w-full'>
         <div className="w-[500px] flex justify-center items-center">
          
             <div className="flex flex-col gap-4">
             <h2>Upload Image to Firebase</h2>
               <input type="file" onChange={handleFileChange}  />
               <button onClick={handleUpload}>Upload</button>
             </div>
             {uploadProgress > 0 && (
                <progress value={uploadProgress} max='100' />
               ) }
             {downloadURL && (
                <div>
                  <p>File uploaded successfully</p>
                  <a href={downloadURL} target="_blank">Download url</a>
                  <button onClick={handleDownload}>Download</button>
                </div>
               
               )}
              
         </div>
    </main>
  );
}
