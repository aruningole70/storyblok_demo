import { useEffect, useState } from 'react';
import { useStoryblok } from '@storyblok/react'
import { StoryblokComponent, useStoryblokApi, SbBlokData } from '@storyblok/react';
import './App.css'
import Pages from './Pages/Pages'
import "./storyblok"

function App() {
  const [story, setStory] = useState<{ content: any } | null>(null);
  const storyblokApi = useStoryblokApi();

  useEffect(() => {
    const fetchStory = async () => {
      const { data } = await storyblokApi.get('cdn/stories/home', {
        version: 'draft',
      });
      setStory(data.story);
    };

    fetchStory();
  }, [storyblokApi]);

  // let slug = window.location.pathname === "/" ? "home" : window.location.pathname.replace("/","")
  // const story = useStoryblok(slug,{version:"draft"})
  // if (!story|| !story.content) {
  //   return <div>loading....</div>
  // };
  return (
    <div>
    {story ? <StoryblokComponent blok={story.content} /> : <p>Loading...</p>}
  </div>
  )
  
  
  // <Pages blok={story.content} />
}

export default App
