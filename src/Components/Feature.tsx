import { storyblokEditable } from '@storyblok/react'
import React from 'react'

const Feature = ({blok}: any) => {
  return (
    <div {...storyblokEditable(blok)}>{blok.name}</div>
  )
}

export default Feature