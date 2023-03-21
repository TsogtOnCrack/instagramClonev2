import axios from 'axios'
import React, { useState } from 'react'

const baseURL = "https://9v1lx40li1.execute-api.ap-southeast-1.amazonaws.com/dev/userGet/@tsogt"


async function postImage ({ image }:any) {
  const formData = new FormData () ;
  formData.append ( "myimage", image) ;
  const result = await axios.post ("/ images", formData);
  console.log(result)

}


export default function Home() {


  const [file, setFile] = useState("")


  return (


    <div>
      <div>
        <input type="file" onChange={(e) => {
          console.log(e.target.files)
          setFile(URL.createObjectURL(e.target.files[0]))
        }} />

        <button >Send!</button>

      </div>

      <img className=' w-[300px]' src={file} alt="" />
    </div>

  )
}
