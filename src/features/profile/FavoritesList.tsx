import { useUser } from "@/redux/reducers/userReducer";

import Heading from "@/components/ui/Heading";
import Previews from "@/components/previews/Previews";
import { useMoviesList } from "@/features/profile/useMoviesList";
import { useShowsList } from "@/features/profile/useShowsList";
import { usePeopleList } from "@/features/profile/usePeopleList";
import { Link } from "react-router-dom";

function FavoritesList() {
  // Getting the user's favorites from the Redux store
  const { likedMovies, likedPeople, likedShows } = useUser();

  // Calling both hooks - inactive one gets an empty array
  const {
    movies,
    isLoading: moviesLoading,
    error: moviesError,
  } = useMoviesList(likedMovies);
  const {
    shows,
    isLoading: showsLoading,
    error: showsError,
  } = useShowsList(likedShows);
  const {
    people,
    isLoading: peopleLoading,
    error: peopleError,
  } = usePeopleList(likedPeople);

  // Returned JSX
  return (
    <section>
      <div className="flex flex-col gap-6">
        <div>
          <Heading as="h3">Favorite Movies</Heading>
          {likedMovies.length === 0 ? (
            <p>
              You haven't liked any movies yet. Head over to our{" "}
              <Link to="/movies">movies</Link> section to start adding some.
            </p>
          ) : (
            <>
              {moviesLoading && <p>Loading movies...</p>}
              {moviesError && <p>Couldn't load your favorite movies.</p>}
              {!moviesLoading && !moviesError && (
                <Previews
                  rawPreviews={[...movies].reverse()}
                  width="20rem"
                  height="30rem"
                  type="movies"
                />
              )}
            </>
          )}
        </div>
        <div>
          <Heading as="h3">Favorite Shows</Heading>
          {likedShows.length === 0 ? (
            <p>
              You haven't liked any shows yet. Head over to our{" "}
              <Link to="/shows">shows</Link> section to start adding some.
            </p>
          ) : (
            <>
              {showsLoading && <p>Loading shows...</p>}
              {showsError && <p>Couldn't load your favorite shows.</p>}
              {!showsLoading && !showsError && (
                <Previews
                  rawPreviews={[...shows].reverse()}
                  width="18rem"
                  height="27rem"
                  type="shows"
                />
              )}
            </>
          )}
        </div>
        <div>
          <Heading as="h3">Favorite Actors / Crew Members</Heading>
          {likedPeople.length === 0 ? (
            <p>
              You haven't liked any actors or crew members yet. You can like
              them from a movie or show's detail page.
            </p>
          ) : (
            <>
              {peopleLoading && <p>Loading people...</p>}
              {peopleError && <p>Couldn't load your favorite actors/crew.</p>}
              {!peopleLoading && !peopleError && (
                <Previews
                  rawPreviews={[...people].reverse()}
                  width="15rem"
                  height="23rem"
                  type="person"
                />
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default FavoritesList;
