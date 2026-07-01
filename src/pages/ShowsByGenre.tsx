import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { useGenreNameData } from "@/hooks/useGenreNameData";
import { META_SHOWS_GENRE_DESC, META_SHOWS_GENRE_TITLE } from "@/lib/metaTags";

import Heading from "@/components/ui/Heading";
import Loader from "@/components/ui/Loader";
import GenreMediaList from "@/features/GenreMediaList";

function ShowsByGenre() {
  // Getting the genre ID from params
  const { genreId } = useParams();
  const type = "tv";

  // Guard clause
  if (!genreId)
    return (
      <div className="text-red-500">Sorry, no show genre was provided</div>
    );

  // Use the custom hook
  const { genreName, error, isLoading } = useGenreNameData(type, genreId);

  // Show loader if data is still loading
  if (isLoading) return <Loader />;

  // Guard clause for errors or no genre
  if (error) return <div className="text-red-500">{error}</div>;

  // Returned JSX
  return (
    <>
      {/* Meta data */}
      <Helmet>
        <title>
          {genreName}
          {META_SHOWS_GENRE_TITLE}
        </title>
        <meta name="description" content={META_SHOWS_GENRE_DESC} />
        {/* <meta name="robots" content="index, follow" /> */}
      </Helmet>

      {/* Content */}
      <section>
        <Heading>{`Shows in the ${genreName} Genre`}</Heading>
        <GenreMediaList genreId={genreId} type={type} />
      </section>
    </>
  );
}

export default ShowsByGenre;
