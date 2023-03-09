import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import axios from 'axios'

import React from 'react'

const baseURL = "https://9v1lx40li1.execute-api.ap-southeast-1.amazonaws.com/dev/userGet/@tsogt"

export default function Home() {

  const [post, setPost] = React.useState(null);
  const [click, setClick] = React.useState(0);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, [click]);

  if (!post) return null;
  return (
    <>
      enter File:

      <input type="file" />
      

      <button onClick={()=>{
        setClick(click+1)
      }}>Send!</button>

      <p>
        {post}
      </p>
          </>
  )
}
