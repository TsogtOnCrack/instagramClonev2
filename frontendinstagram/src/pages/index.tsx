import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import axios from 'axios'

import React, { useState } from 'react'

const baseURL = "https://9v1lx40li1.execute-api.ap-southeast-1.amazonaws.com/dev/userGet/@tsogt"



const sendPost = async (e: any) =>{

  axios.post(baseURL, {
    data: e
  })
}

export default function Home() {


  const [file, setFile] = useState(null)

  
  return(


    <div>
    <div>Hellow</div>


    <input type="file" onChange={(e)=>{

      console.log(e.target.files)

    }} />

    <button>Send!</button>
    </div>

  )
}
