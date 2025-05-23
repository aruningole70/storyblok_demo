import { storyblokEditable } from '@storyblok/react'
import React from 'react'

const Teaser = ({blok}: any) => {
  return (
    <h2 {...storyblokEditable(blok)}>{blok.headline}</h2>
  )
}

export default Teaser