import { storyblokEditable } from '@storyblok/react'
import React from 'react'

const Test = ({blok}: any) => {
  console.log("test blok====",blok);
  
  return (
    <section {...storyblokEditable(blok)} className="custom-block">
      <h1>{blok.name}</h1>
      <h3>{blok.price}</h3>
  </section>
  )
}

export default Test