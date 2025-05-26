import React, { useState } from "react";
import {
  SbBlokData,
  StoryblokComponent,
  storyblokEditable,
} from "@storyblok/react";
import axios from "axios";

interface PageProps {
  blok: SbBlokData & {
    body?: SbBlokData[];
  };
}

const Pages = ({ blok }: PageProps) => {
  console.log("pages blok =====", blok);
  const blockhHeader = {
    name: "new_test_3",
    display_name: null,
    schema: {
      headline: {
        type: "textarea",
        pos: 0,
        translatable: true,
        description: "This field is used to render an H1 title",
      },
      firstName: {
        type: "text",
        pos: 0,
        translatable: true,
        description: "This field is used to render an H2 title",
      },
      lastName: {
        type: "text",
        pos: 0,
        translatable: true,
        description: "This field is used to render an H3 title",
      },
      salary: {
        type: "number",
        pos: 0,
        translatable: true,
        description: "This field is used to render an H3 title",
      },
    },
    is_root: false,
    is_nestable: true,
  };
  const storyheaders = {
    name: "new_test_story_3",
    slug: "new_test_story_3",
    parent_id: null,
    content: {
      component: blockhHeader.name,
    },
    user_ids: [],
    space_role_ids: [],
    is_startpage: false,
    preset_id: null,
    translated_slugs_attributes: [],
  };
  const managementApi = axios.create({
    baseURL: "https://app.storyblok.com/v1",
    headers: {
      Authorization: "dVkWGfTr2LUoEQvimi7EHQtt-291155--aWMXgdEPN-BRm3Rzkkn",
    },
  });
  const createBlock = async () => {
    managementApi
      .post("/spaces/340036/components", {
        component: blockhHeader,
      })
      .then((response: any) => {
        console.log("block res ======", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const createStory = async () => {
    managementApi
      .post("/spaces/340036/stories", {
        ...storyheaders,
      })
      .then((response: any) => {
        console.log("block creation res====", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <main {...storyblokEditable(blok)}>
        {blok &&
          blok.body &&
          blok.body.map((nestedBlok) => (
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
          ))}
      </main>
      <button onClick={createBlock}>Creat block</button>
      <button onClick={createStory}>Creat story</button>
    </>
  );
};

export default Pages;
