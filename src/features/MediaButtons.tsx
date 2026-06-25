import { useDispatch } from "react-redux";
import { doc, getDoc } from "@firebase/firestore";
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
    try {
      // Fetch the latest user data from Firestore
      const userRef = doc(db, "users", auth!.currentUser!.uid);
      const userSnap = await getDoc(userRef);

      // Guard clause
      if (!userSnap.exists()) return;

      // Extracting the actual data
      const currentData = userSnap.data();

      // Setting the current watch lists to work with
      const updatedFavoritesList = isMovie
        ? currentData.likedMovies
        : currentData.likedShows;

      const currentLikedList = Array.isArray(updatedFavoritesList)
        ? updatedFavoritesList
        : [];

      // Checking whether we need to add or remove movie from the list
      const updatedList = currentLikedList.some((id) => id === media.id)
        ? currentLikedList.filter((id) => id !== media.id)
        : [...currentLikedList, media.id];
      // [
      //   ...currentLikedList,
      //   isMovie
      //     ? {
      //         id: media.id,
      //         title: media.title,
      //         poster_path: media.poster_path,
      //         vote_average: media.vote_average,
      //       }
      //     : {
      //         id: media.id,
      //         name: media.name,
      //         poster_path: media.poster_path,
      //         vote_average: media.vote_average,
      //       },
      // ];

      // Update the liked movies list in the state and firebase
      dispatch(
        updateUserData({
          updatedData: {
            [isMovie ? "likedMovies" : "likedShows"]: updatedList,
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
    try {
      // Fetch the latest user data from Firestore
      const userRef = doc(db, "users", auth!.currentUser!.uid);
      const userSnap = await getDoc(userRef);

      // Guard clause
      if (!userSnap.exists()) return;

      // Extracting the actual data
      const currentData = userSnap.data();

      // Setting the current watch lists to work with
      const updatedWatchList = isMovie
        ? currentData.watchlistMovies
        : currentData.watchlistShows;

      const currentWatchList = Array.isArray(updatedWatchList)
        ? updatedWatchList
        : [];

      // Checking whether we need to add or remove movie from the list
      const updatedList = currentWatchList.some((id) => id === media.id)
        ? currentWatchList.filter((id) => id !== media.id)
        : [...currentWatchList, media.id];

      // Update the watchlist in the state and firebase
      dispatch(
        updateUserData({
          updatedData: {
            [isMovie ? "watchlistMovies" : "watchlistShows"]: updatedList,
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
