import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";

import { ICollection, IMovie } from "@/lib/typesAPI";
import { getMovieCollection } from "@/services/apiCollections";

import CollectionDetails from "@/features/collectionDetails/CollectionDetails";
import CollectionMovies from "@/features/collectionDetails/CollectionMovies";
import { Helmet } from "react-helmet-async";
import { META_TITLE_END } from "@/lib/metaTags";

// Movie collection data loader
export const movieCollectionLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<ICollection> => {
  // Getting the collection using API function
  const collection = await getMovieCollection(params.collectionId!);
  // Return collection
  return collection;
};

// The component
function MovieCollection() {
  // Getting the collection data from the loader
  const collection = useLoaderData() as ICollection;

  // Destructuring collection's name
  const { name } = collection;

  // Returned JSX
  return (
    <>
      {/* Meta data */}
      <Helmet>
        <title>{`${name}${META_TITLE_END}`}</title>
        <meta
          name="description"
          content={`Uncover the ${name}, browse a curated selection of related movies, and delve into their overviews, and more.`}
        />
        <meta
          name="keywords"
          content={`${name}, collection, movies, films, related films, movie collection, genres, overview, titles`}
        />
        {/* <meta name="robots" content="index, follow" /> */}
      </Helmet>

      {/* Content */}
      <CollectionDetails collection={collection} />
      <CollectionMovies movies={collection.parts as IMovie[]} />
    </>
  );
}

export default MovieCollection;
