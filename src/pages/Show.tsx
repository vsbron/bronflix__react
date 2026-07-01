import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { META_TITLE_END } from "@/lib/metaTags";
import { IShow } from "@/lib/typesAPI";
import { getShow } from "@/services/apiShows";

import ShowDetails from "@/features/showDetails/ShowDetails";
import ShowCastCrew from "@/features/showDetails/ShowCastCrew";
import ShowSimilar from "@/features/showDetails/ShowSimilar";
import ShowSeasons from "@/features/showDetails/ShowSeasons";

// Show data loader
export const showLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<IShow> => {
  // Getting the show using API function
  const show = await getShow(Number(params.showId));
  // Return show
  return show;
};

function Show() {
  // Getting the show data from the loader
  const show = useLoaderData() as IShow;

  // Destructuring some data
  const { name, first_air_date, seasons } = show;

  // Returned JSX
  return (
    <>
      {/* Meta data */}
      <Helmet>
        <title>
          {`${name} (${new Date(
            first_air_date,
          ).getFullYear()}) - Show${META_TITLE_END}`}
        </title>
        <meta
          name="description"
          content={`Discover the overview of ${name}, explore the cast and crew, watch the trailer, and dive into all the details about the show's release.`}
        />
        <meta
          name="keywords"
          content={`${name}, show, TV series, plot, cast, crew, release date, creator, director, actors, genres, rating, episodes, seasons, trailer`}
        />
        {/* <meta name="robots" content="index, follow" /> */}
      </Helmet>

      {/* Content */}
      <ShowDetails show={show} />
      {seasons && <ShowSeasons seasons={seasons} />}
      <ShowCastCrew showId={show.id} />
      <ShowSimilar showId={show.id} />
    </>
  );
}

export default Show;
