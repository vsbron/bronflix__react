import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { META_TITLE_END } from "@/lib/metaTags";
import { IMovie } from "@/lib/typesAPI";
import { getMovie } from "@/services/apiMovies";

import MovieCastCrew from "@/features/movieDetails/MovieCastCrew";
import MovieDetails from "@/features/movieDetails/MovieDetails";
import MoviesSimilar from "@/features/movieDetails/MoviesSimilar";

// Movie data loader
export const movieLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<IMovie> => {
  // Getting the movie using API function
  const movie = await getMovie(Number(params.movieId));

  // Return movie
  return movie;
};

// The component
function Movie() {
  // Getting the movie data from the loader
  const movie = useLoaderData() as IMovie;

  // Destructuring some data
  const { title, release_date } = movie;

  // Returned JSX
  return (
    <>
      {/* Meta data */}
      <Helmet>
        <title>
          {`${title} (${new Date(
            release_date,
          ).getFullYear()}) - Movie${META_TITLE_END}`}
        </title>
        <meta
          name="description"
          content={`Explore the overview of ${title}, discover the cast and crew, see the trailer and delve into all the details about the movie's release.`}
        />
        <meta
          name="keywords"
          content={`${title}, movie, film, plot, cast, crew, release date, director, producer, actors, genres, rating, runtime, trailer`}
        />
        <meta name="robots" content="index,follow" />
      </Helmet>

      {/* Content */}
      <MovieDetails movie={movie} />
      <MovieCastCrew movieId={movie.id} />
      <MoviesSimilar movieId={movie.id} />
    </>
  );
}

export default Movie;
