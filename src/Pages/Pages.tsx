import React from 'react'
import { SbBlokData, StoryblokComponent, storyblokEditable } from '@storyblok/react'
import axios from 'axios';
import { useStoryblokApi } from '@storyblok/react';

interface PageProps {
  blok: SbBlokData & {
    body?: SbBlokData[];
  };
}

const Pages = ({ blok }: PageProps) => {
  console.log("pages blok =====", blok);
  const storyblokApi = useStoryblokApi();
  const header = {
    name: "text4",
    is_nestable: true,
    is_root: false,
    internal_tag_ids: [],
    description: ""
  }
  const storyheaders ={
    name: "demo2",
    slug: "demo2",
    parent_id: null,
    content: {
        component: "page"
    },
    user_ids: [],
    space_role_ids: [],
    is_startpage: false,
    preset_id: null,
    translated_slugs_attributes: []
}
  const managementApi = axios.create({
    baseURL: 'https://app.storyblok.com/v1',
    headers: {
      Authorization: 'dVkWGfTr2LUoEQvimi7EHQtt-291155--aWMXgdEPN-BRm3Rzkkn',
    },
  });
  const createBlock = async () => {
    try {
      const response: any = await managementApi.post("/spaces/340036/components", {
        "component": header
      })
      console.log(response)
    } catch (err) {
      console.log(err);

    }
  }
  const createStory =async () => {
    try {
      const response: any = await managementApi.post("/spaces/340036/stories", {...storyheaders})
      console.log(response)
    } catch (err) {
      console.log(err);

    }
  }
  return (
    <>
      <main {...storyblokEditable(blok)}>
        {blok && blok.body && blok.body.map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </main>
      <button onClick={createBlock}>Creat block</button>
      <button onClick={createStory}>Creat story</button>
    </>
  )
}

export default Pages