import { Helmet } from "react-helmet-async";

import {
  META_MAIN_DESC,
  META_MAIN_KEYW,
  META_MAIN_TITLE,
} from "@/lib/metaTags";

import Separator from "@/components/ui/Separator";
import ActorsTrending from "@/features/home/ActorsTrending";
import ExploreMore from "@/features/home/ExploreMore";
import HeroSection from "@/features/home/HeroSection";
import MoviesAcclaimed from "@/features/home/MoviesAcclaimed";
import ShowsPopular from "@/features/home/ShowsPopular";
import ShowsTopRated from "@/features/home/ShowsTopRated";

function Home() {
  // Returned JSX
  return (
    <>
      {/* Meta data */}
      <Helmet>
        <title>{META_MAIN_TITLE}</title>
        <meta name="description" content={META_MAIN_DESC} />
        <meta name="keywords" content={META_MAIN_KEYW} />
        {/* <meta name="robots" content="index, follow" /> */}
      </Helmet>

      {/* Content */}
      <HeroSection />
      <ShowsPopular />
      <ActorsTrending />
      <Separator className="mt-6" />
      <ExploreMore />
      <Separator className="mt-6" />
      <MoviesAcclaimed />
      <ShowsTopRated />
    </>
  );
}

export default Home;
