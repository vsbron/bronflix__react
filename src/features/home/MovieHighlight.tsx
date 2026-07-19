import { Link } from "react-router-dom";
import {
  BookOpenIcon,
  CalendarIcon,
  LanguageIcon,
} from "@heroicons/react/24/solid";

import { NO_MOVIE_COVER } from "@/lib/assets";
import { useGenres } from "@/context/GenresContext";
import { useResponsive } from "@/hooks/useResponsive";
import useTrailer from "@/hooks/useTrailer";
import { MEDIA_IMG_URL } from "@/lib/constants";
import { LANGUAGES } from "@/lib/constantsGeo";
import { MovieHighlightProps } from "@/lib/types";
import { IGenre } from "@/lib/typesAPI";
import { shortenText } from "@/utils/helpers";

import IconWrapper from "@/components/IconWrapper";
import ScorePreview from "@/components/ScorePreview";
import TrailerButton from "@/components/TrailerButton";
import Button from "@/components/ui/Button";
import {
  BlackGradientToRight,
  BlackGradientToTop,
} from "@/components/ui/Overlays";
import { NAV_LINKS_MAIN } from "@/lib/navLinks";

function MovieHighlight({ movie }: MovieHighlightProps) {
  // Destructuring data
  const {
    id,
    title,
    release_date,
    backdrop_path,
    original_language,
    genre_ids,
    vote_average: score,
    vote_count: count,
    overview = "",
  } = movie;

  // Getting the SM media query from custom hook
  const { isSM } = useResponsive();

  // Get the genres from Context API
  const { genres } = useGenres();
  const trailer = useTrailer(movie.id, "movie");

  // Handling the movie data
  // prettier-ignore
  const genreNames = genre_ids?.map((id: number | string) => {
    const genre = genres.find((genre: IGenre) => genre.id === id);
    return genre ? genre.name : null}).filter(Boolean).splice(0,3).join(", ") || "";
  const shortenOverview = shortenText(overview, 150);
  const backgroundImage = backdrop_path
    ? `url(${MEDIA_IMG_URL}/w1280/${backdrop_path})`
    : `url(${NO_MOVIE_COVER})`;

  // Returned JSX
  return (
    <div className="mb-[1.170rem] sm:mb-16 max-sm:h-[32rem] max-sm:flex">
      <div
        style={{ backgroundImage }}
        className="absolute top-0 right-0 w-full sm:w-3/4 h-[25rem] sm:h-4/6 xl:h-5/6 bg-no-repeat bg-cover bg-top sm:bg-center rounded-lg max-sm:-mb-20"
      >
        <BlackGradientToTop height={isSM ? "60%" : "25%"} />
        {!isSM && <BlackGradientToRight width="40%" />}
      </div>
      <div className="flex flex-col items-start justify-end gap-6 relative z-10 w-full h-auto sm:h-[35rem] sm:w-[45%] xl:w-[40%] xl:h-[50rem] max-sm:pl-3">
        <h2 className="text-[3.2rem] sm:text-6xl lg:text-7xl xl:text-8xl m-0">
          {title.toUpperCase()}
        </h2>
        <div className="flex max-lg:flex-col gap-2 lg:gap-8 items-start lg:items-center -mt-2 text-stone-400">
          <ScorePreview score={score} count={count} isHighlighted={true} />
          <div className="flex items-center gap-x-8 gap-y-0.5 text-[1.5rem] pb-0.5 max-lg:flex-wrap">
            <IconWrapper icon={<CalendarIcon />}>
              {new Date(release_date!).getFullYear()}
            </IconWrapper>
            <IconWrapper icon={<LanguageIcon />}>
              {LANGUAGES[original_language!]}
            </IconWrapper>
            <div className="w-auto max-sm:text-[1.4rem] sm:w-full md:w-auto text-nowrap">
              {genreNames}
            </div>
          </div>
        </div>
        <p className="mt-0 mb-2 xl:mb-6 max-sm:hidden max-lg:text-[1.4rem]">
          {shortenOverview}
        </p>
        <div className="flex max-sm:-mt-3 items-start gap-x-6 gap-y-3">
          <Button label={`Learn more about ${title}`}>
            <Link
              to={`${NAV_LINKS_MAIN.movies.path}/${id}`}
              aria-label={`Learn more about ${title}`}
            >
              {!isSM && <BookOpenIcon className="w-8 inline-block pb-1 mr-2" />}
              LEARN MORE
            </Link>
          </Button>
          <TrailerButton video={trailer!} index={true} />
        </div>
      </div>
    </div>
  );
}

export default MovieHighlight;
