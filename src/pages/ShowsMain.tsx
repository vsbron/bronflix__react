import { Helmet } from "react-helmet-async";

import {
  META_MAIN_SHOWS_DESC,
  META_MAIN_SHOWS_KEYW,
  META_MAIN_SHOWS_TITLE,
} from "@/lib/metaTags";

import Heading from "@/components/ui/Heading";
import Separator from "@/components/ui/Separator";
import MediaMainBG from "@/features/MediaMainBG";
import ShowGenres from "@/features/showsMain/ShowGenres";
import ShowsOnAirToday from "@/features/showsMain/ShowsOnAirToday";
import ShowsRunning from "@/features/showsMain/ShowsRunning";
import ShowsPopular from "@/features/home/ShowsPopular";
import ShowsTopRated from "@/features/home/ShowsTopRated";

function ShowsMain() {
  // Returned JSX
  return (
    <>
      {/* Meta data */}
      <Helmet>
        <title>{META_MAIN_SHOWS_TITLE}</title>
        <meta name="description" content={META_MAIN_SHOWS_DESC} />
        <meta name="keywords" content={META_MAIN_SHOWS_KEYW} />
        {/* <meta name="robots" content="index, follow" /> */}
      </Helmet>

      {/* Content */}
      <section>
        <Heading>Explore shows</Heading>
        <MediaMainBG type="shows" />
        <ShowGenres />
        <ShowsOnAirToday />
        <ShowsRunning />
        <Separator className="my-12" />
        <ShowsTopRated />
        <ShowsPopular />
      </section>
    </>
  );
}

export default ShowsMain;
