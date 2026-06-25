import { useUser } from "@/redux/reducers/userReducer";

import Heading from "@/components/ui/Heading";
import ListTitle from "@/features/profile/ListTitle";
import MediaList from "@/features/profile/MediaList";

function WatchList() {
  // Getting the user's watch lists from the Redux store
  const { watchlistMovies, watchlistShows } = useUser();

  // Returned JSX
  return (
    <section>
      <Heading as="h2">Watch list</Heading>
      <div className="flex flex-col md:grid grid-cols-2 gap-12">
        <div>
          <ListTitle>Movies</ListTitle>
          <MediaList items={watchlistMovies} type="movies" />
        </div>
        <div>
          <ListTitle>Shows</ListTitle>
          <MediaList items={watchlistShows} type="shows" />
        </div>
      </div>
    </section>
  );
}

export default WatchList;
