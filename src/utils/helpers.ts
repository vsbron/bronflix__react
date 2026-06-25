import {
  NO_MOVIE_COVER,
  NO_MOVIE_POSTER,
  NO_PERSON_PHOTO,
  NO_SHOW_POSTER,
} from "@/lib/assets";
import { MEDIA_IMG_URL } from "@/lib/constants";
import { MediaTypeAndId } from "@/lib/types";
import { IBase, ISearchedMediaSmall } from "@/lib/typesAPI";
import { useUser } from "@/redux/reducers/userReducer";

// Function that shuffles the array
export function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

// Function that determines the color for the score display
export function scoreColor(score: number) {
  let bgColor, color;
  switch (true) {
    case score >= 7:
      bgColor = "bg-green-900";
      color = "text-green-400";
      break;
    case score >= 4:
      bgColor = "bg-yellow-800";
      color = "text-yellow-200";
      break;
    case score > 0:
      bgColor = "bg-red-900";
      color = "text-red-200";
      break;
    default:
      bgColor = "bg-stone-700";
      color = "text-stone-100";
  }

  // Return colors
  return { bgColor, color };
}

// Function that formats the date
export function formatDate(dateString: string) {
  // Guard clause
  if (!dateString) return "TBA";

  // Returned formatted date
  return new Date(dateString).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// Function that formats the runtime
export function formatRuntime(runtime: number) {
  // Calculating hours and minutes
  const hours = Math.floor(runtime / 60);
  const minutes = Math.floor(runtime % 60);

  // Guard clause
  if (hours === 0 && minutes === 0) return "Unknown";

  // Returned runtime
  return `${hours}h ${minutes}m`;
}

// Function that limits large texts
export function shortenText(text: string, limit: number) {
  const shortenedText =
    text.length > limit
      ? text.slice(0, 250).trim().split(" ").slice(0, -1).join(" ") + "..."
      : text;
  return shortenedText;
}

// Helper function to build poster and cover image paths
export function getMediaImages<T extends IBase>(media: T, type?: string) {
  // Building images paths
  const posterPath =
    type !== "person"
      ? media.poster_path
        ? `${MEDIA_IMG_URL}w300${media.poster_path}`
        : NO_MOVIE_POSTER
      : media.profile_path
        ? `${MEDIA_IMG_URL}w300${media.profile_path}`
        : NO_PERSON_PHOTO;

  const backgroundImage =
    type !== "person"
      ? `url(${
          media.backdrop_path
            ? `${MEDIA_IMG_URL}original${media.backdrop_path}`
            : NO_MOVIE_COVER
        })`
      : "";

  return { posterPath, backgroundImage };
}

// Helper function to get the data for search results
export function getSearchMediaData(media: ISearchedMediaSmall) {
  // Destructuring some media data
  const {
    title,
    name,
    media_type,
    poster_path,
    profile_path,
    release_date,
    first_air_date,
  } = media;

  let mediaTitle, mediaType, mediaImage;
  switch (media_type) {
    case "tv":
      mediaTitle = name;
      mediaType = "shows";
      mediaImage = getMediaImagesSearch(poster_path, NO_SHOW_POSTER);
      break;
    case "person":
      mediaTitle = name;
      mediaType = "person";
      mediaImage = getMediaImagesSearch(profile_path, NO_PERSON_PHOTO);
      break;
    default:
      mediaTitle = title;
      mediaType = "movies";
      mediaImage = getMediaImagesSearch(poster_path, NO_MOVIE_POSTER);
  }
  const date = release_date || first_air_date;
  const releaseDate = date ? new Date(date).getFullYear() : "TBA";
  mediaTitle = `${mediaTitle} ${
    mediaType !== "person" ? `(${releaseDate})` : ""
  }`;

  // Return the object with data
  return { mediaTitle, mediaType, mediaImage };
}

// Helper function to set the correct image
export function getMediaImagesSearch(
  path: string | undefined,
  defaultImage: string,
): string {
  return path ? `${MEDIA_IMG_URL}w300${path}` : defaultImage;
}

//
export const getUserListsInfo = ({ type, id: mediaId }: MediaTypeAndId) => {
  // Getting all the relevant lists from user store
  const {
    likedMovies,
    likedShows,
    likedPeople,
    watchlistMovies,
    watchlistShows,
    ratedMovies,
    ratedShows,
  } = useUser();

  // TODO

  // Checking whether media is liked or is in watch list
  let isLiked, isInWatchList, isRated;
  switch (type) {
    case "movie":
    case "movies":
      isLiked = likedMovies.some((id) => id === mediaId);
      isInWatchList = watchlistMovies.some((id) => id === mediaId);
      // isRated = ratedMovies.find((id) => id === mediaId);
      break;
    case "tv":
      isLiked = likedShows.some((id) => id === mediaId);
      isInWatchList = watchlistShows.some((id) => id === mediaId);
      // isRated = ratedShows.find((id) => id === mediaId);
      break;
    case "person":
      isLiked = likedPeople.some((id) => id === mediaId);
      break;
    default:
      isLiked = false;
      isInWatchList = false;
  }

  // Return the lists
  return { isLiked, isInWatchList, isRated };
};
