import React from 'react'
import { SbBlokData , StoryblokComponent, storyblokEditable } from '@storyblok/react'

interface PageProps {
  blok: SbBlokData & {
    body?: SbBlokData[];
  };
}

const Pages = ({blok} :PageProps) => {
    console.log("pages blok =====", blok);
  return (
    <main {...storyblokEditable(blok)}>
    {blok && blok.body && blok.body.map((nestedBlok) => (
      <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
    ))}
  </main>
  )
}

export default Pages