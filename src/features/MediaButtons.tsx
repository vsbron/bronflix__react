import { useDispatch } from "react-redux";
import { arrayUnion, arrayRemove, doc } from "@firebase/firestore";
import { EyeIcon, HeartIcon } from "@heroicons/react/24/solid";

import { ModalProvider } from "@/context/ModalContext";
import useTrailer from "@/hooks/useTrailer";
import { BASE_GAP_CLASS } from "@/lib/constants";
import { MediaButtonsProps } from "@/lib/types";
import { AppDispatch } from "@/lib/typesRedux";
import { updateUserData, useUser } from "@/redux/reducers/userReducer";
import { auth, db } from "@/utils/firebase";

import TrailerButton from "@/components/TrailerButton";
import Button from "@/components/ui/Button";

function MediaButtons({ type, media }: MediaButtonsProps) {
  // Getting user data from Redux store
  const { uid, likedMovies, watchlistMovies, likedShows, watchlistShows } =
    useUser();

  // Getting the trailer from the custom hook
  const trailer = useTrailer(media.id, type);

  // Setting the lists to work with
  const isMovie = type === "movie";
  let likedList, watchList;
  switch (type) {
    case "movie":
      likedList = likedMovies;
      watchList = watchlistMovies;
      break;
    default:
      likedList = likedShows;
      watchList = watchlistShows;
  }

  // Checking if media already in any lists
  const isLiked = likedList.some((id) => id === media.id);
  const isInWatchList = watchList.some((id) => id === media.id);

  // Getting the navigate and dispatch functions
  const dispatch = useDispatch<AppDispatch>();

  // User lists buttons handlers
  const addToFavoritesHandler = async () => {
    // Check if user still authenticated
    if (!auth.currentUser) {
      console.error("No authenticated user found");
      return;
    }

    try {
      // Check if we have movie or show data
      const field = isMovie ? "likedMovies" : "likedShows";

      // Update the user with new favorite item
      dispatch(
        updateUserData({
          updatedData: {
            [field]: isLiked ? arrayRemove(media.id) : arrayUnion(media.id),
          },
        }),
      );
    } catch (e: unknown) {
      console.error(e);
      throw new Error(
        `Couldn't update the Favorite ${type} list due to unknown error`,
      );
    }
  };

  const addToWatchListHandler = async () => {
    // Check if user still authenticated
    if (!auth.currentUser) {
      console.error("No authenticated user found");
      return;
    }

    try {
      // Check if we have movie or show data
      const field = isMovie ? "watchlistMovies" : "watchlistShows";

      // Update the user with new watch item
      dispatch(
        updateUserData({
          updatedData: {
            [field]: isInWatchList
              ? arrayRemove(media.id)
              : arrayUnion(media.id),
          },
        }),
      );
    } catch (e: unknown) {
      console.error(e);
      throw new Error(
        `Couldn't update the ${type} Watchlist due to unknown error`,
      );
    }
  };

  // Returned JSX
  return (
    <div className={`flex ${BASE_GAP_CLASS} gap-y-4 flex-wrap`}>
      <ModalProvider>
        <TrailerButton video={trailer!} />
      </ModalProvider>
      {uid && (
        <>
          <Button onClick={addToFavoritesHandler} label="Add to favorites">
            <span>
              <HeartIcon className="w-8 inline-block pb-1 mr-2" />
              {isLiked ? "Remove from" : "Add to"} Favorites
            </span>
          </Button>
          <Button onClick={addToWatchListHandler} label="Add to watchlist">
            <span>
              <EyeIcon className="w-8 inline-block pb-1 mr-2" />
              {isInWatchList ? "Remove from" : "Add to"} Watch list
            </span>
          </Button>
        </>
      )}
    </div>
  );
}

export default MediaButtons;
