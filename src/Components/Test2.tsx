import React from 'react'
import { storyblokEditable } from '@storyblok/react';
import { Card , CardHeader ,CardContent   } from '@mui/material';
const Test2 = ({blok}: any) => {
    console.log("test2 blok object ====",blok);    
  return (
    <Card {...storyblokEditable(blok)}>
        <CardContent>
            <h1>{blok.title}</h1>
            <div>hello test 2</div>
        </CardContent>
    </Card>
  )
}

export default Test2