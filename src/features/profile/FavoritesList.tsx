import { useUser } from "@/redux/reducers/userReducer";

import Heading from "@/components/ui/Heading";
import Previews from "@/components/previews/Previews";

function FavoritesList() {
  // Getting the user's favorites from the Redux store
  const { likedMovies, likedPeople, likedShows } = useUser();

  // Returned JSX
  return (
    <section>
      <div className="flex flex-col gap-6">
        <div>
          <Heading as="h3">Favorite Movies</Heading>
          {/* <Previews
            rawPreviews={[...likedMovies].reverse()}
            width="20rem"
            height="30rem"
            type="movies"
          /> */}
        </div>
        <div>
          <Heading as="h3">Favorite Shows</Heading>
          {/* <Previews
            rawPreviews={[...likedShows].reverse()}
            width="18rem"
            height="27rem"
            type="shows"
          /> */}
        </div>
        <div>
          <Heading as="h3">Favorite Actors / Crew Members</Heading>
          {/* <Previews
            rawPreviews={[...likedPeople].reverse()}
            width="15rem"
            height="23rem"
            type="person"
          /> */}
        </div>
      </div>
    </section>
  );
}

export default FavoritesList;
