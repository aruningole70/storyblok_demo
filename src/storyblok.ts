import { storyblokInit, apiPlugin } from '@storyblok/react';
import Pages from './Pages/Pages';
// import ZensarTour from './Components/ZensarTour';
import Zen1 from './Components/Zen1';
import Teaser from './Components/Teaser';
import Grid from './Components/Grid';
import Feature from './Components/Feature';
import Test from './Components/Test';
import Test2 from './Components/Test2';


storyblokInit({
    accessToken: `${import.meta.env.VITE_STORYBLOK_ACCESS_TOKAN}`,
    use: [apiPlugin],
    components: {
      page: Pages,
      grid:Grid,
      teaser: Teaser,
      feature: Feature,
      test : Test,
      test2:Test2
    },
  });