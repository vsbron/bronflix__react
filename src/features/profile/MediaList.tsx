import { Link } from "react-router-dom";

import { MediaListProps } from "@/lib/types";

import PreviewImage from "@/components/previews/PreviewImage";
import { useMoviesList } from "@/features/profile/useMoviesList";
import { useShowsList } from "@/features/profile/useShowsList";

function MediaList({ items, type }: MediaListProps) {
  // Checking the type of content we got
  const isMovie = type === "movie" || type === "movies";

  // Calling both hooks - inactive one gets an empty array
  const {
    movies,
    isLoading: moviesLoading,
    error: moviesError,
  } = useMoviesList(isMovie ? items : []);
  const {
    shows,
    isLoading: showsLoading,
    error: showsError,
  } = useShowsList(!isMovie ? items : []);

  // Getting the constants that relevant to the content type
  const title = isMovie ? "Movies" : "Shows";
  const mediaList = isMovie ? movies : shows;
  const isLoading = isMovie ? moviesLoading : showsLoading;
  const error = isMovie ? moviesError : showsError;

  // Guard clauses
  if (items.length === 0)
    return (
      <p>
        Your {type} list is empty. You can navigate to our{" "}
        <Link to={`/${type}/`}>{type}</Link> section and start to fill it
      </p>
    );
  if (isLoading) return <p>Loading {title.toLowerCase()}...</p>;
  if (error)
    return <p>Something went wrong loading your {title.toLowerCase()}.</p>;

  // Returned JSX
  return (
    <>
      <div className="flex gap-2 md:gap-4 flex-wrap">
        {mediaList.map((media) => (
          <Link
            to={`/${type}/${media.id}`}
            className="basis-[10rem] md:basis-[11rem] xl:basis-[14rem] h-[15rem] md:h-[17rem] xl:h-[21rem]"
            key={media.id}
          >
            <PreviewImage media={media} type={type} hud={false} />
          </Link>
        ))}
      </div>
    </>
  );
}

export default MediaList;
