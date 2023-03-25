import axios from 'axios'
import React, { useState } from 'react'

const baseURL = "https://a3pqa4p71g.execute-api.ap-southeast-1.amazonaws.com/dev/postMake/321/@tsogt/itsjustapostcc"

const sendImage = (file: any) => {

  let data = new FormData();
  data.append(file, "thisisfilename.jpeg");
  console.log(file, "sendImage")
 try {
  axios.post(baseURL, data, {
    headers: {
      'Content-Type': `multipart/form-data;`
    }
  })
    .then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error)
    });
 } catch(e) {
  console.log("error", e)
 }
};
  // return (dispatch: any) => {
  //   axios.post(baseURL, data, {
  //     headers: {
  //       'Content-Type': `multipart/form-data;`
  //     }
  //   })
  //     .then((response) => {
  //       console.log(response)
  //     }).catch((error) => {
  //       console.log(error)
  //     });
  // };



export default function Home() {


  const [file, setFile] = useState("")


  return (


    <div>
      <div>
        <input type="file" onChange={(e) => {
          // console.log(e.target.files)
          setFile(URL.createObjectURL(e.target.files[0]))
        }} />

        <button onClick={()=>{sendImage(file)}} >Send!</button>

      </div>

      <img className=' w-[300px]' src={file} alt="" />
    </div>

  )
}
