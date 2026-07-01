import {
  BanknotesIcon,
  CalendarIcon,
  ClockIcon,
  GlobeAltIcon,
  FilmIcon,
  LanguageIcon,
} from "@heroicons/react/24/outline";

import { useResponsive } from "@/hooks/useResponsive";
import { COUNTRIES, LANGUAGES } from "@/lib/constantsGeo";
import { MovieDetailsProps } from "@/lib/types";
import { IGenre } from "@/lib/typesAPI";
import { useUser } from "@/redux/reducers/userReducer";
import { FormatTextBlock } from "@/utils/FormatTextBlock";
import { formatDate, formatRuntime } from "@/utils/helpers";

import IconWrapper from "@/components/IconWrapper";
import MediaHero from "@/components/MediaHero";
import ScorePreview from "@/components/ScorePreview";
import Heading from "@/components/ui/Heading";
import MediaButtons from "@/features/MediaButtons";
import MediaInList from "@/features/MediaInList";
import MovieCollectionLink from "@/features/movieDetails/MovieCollectionLink";

function MovieDetails({ movie }: MovieDetailsProps) {
  // Destructuring data
  const {
    title,
    tagline,
    release_date,
    genres,
    origin_country: country,
    original_language: language,
    runtime,
    vote_average: score,
    vote_count: count,
    budget,
    overview = "No overview available for this movie",
    production_companies: companies,
    belongs_to_collection: collection,
  } = movie;

  // Getting user data from Redux store
  const { uid } = useUser();

  // Getting a number of media queries from custom hook
  const { isMD, isLG } = useResponsive();

  // Handling some movie data
  const headingTitle = `${title} (${
    release_date ? new Date(release_date).getFullYear().toString() : "TBA"
  })`;
  const genresList = genres.map((genre: IGenre) => genre.name).join(", ");
  const originCountry = country.map((c: string) => COUNTRIES[c]).join(", ");
  const studio = companies.at(0);
  const formattedOverview = FormatTextBlock(overview);

  // Returned JSX
  return (
    <section>
      <Heading>{headingTitle}</Heading>
      <MediaHero media={movie}>
        {!!collection && !isMD && (
          <MovieCollectionLink collection={collection} />
        )}
        <div className="relative z-10 flex flex-col gap-3">
          <div className="text-gray-400">
            <ScorePreview
              score={score}
              count={count}
              isHighlighted={true}
              isBig={true}
            />
          </div>
          {uid && (
            <MediaInList type="movie" id={movie.id} name={headingTitle} />
          )}
          <div className="text-[2.5rem] lg:text-[3rem] xl:text-[4rem] leading-[1.1] -my-1 xl:my-0 font-heading">
            {title}
          </div>
          <div className="mb-1 xl:mb-3 text-[1.6rem] lg:text-[1.8rem] xl:text-[2rem] italic text-stone-400 leading-8">
            {tagline}
          </div>

          <div className="contents text-2xl">
            <div>{genresList}</div>
            <div className="flex gap-x-8 gap-y-1 flex-wrap">
              <IconWrapper icon={<CalendarIcon />}>
                {formatDate(release_date)}
              </IconWrapper>
              <IconWrapper icon={<LanguageIcon />}>
                {LANGUAGES[language]}
              </IconWrapper>
              <IconWrapper icon={<ClockIcon />}>
                {formatRuntime(runtime)}
              </IconWrapper>
            </div>
            <div className="flex gap-x-8 gap-y-1 mb-0 xl:mb-2 flex-wrap">
              {originCountry.length > 0 && (
                <IconWrapper icon={<GlobeAltIcon />}>
                  {originCountry}
                </IconWrapper>
              )}
              {studio && (
                <IconWrapper icon={<FilmIcon />}>{studio.name}</IconWrapper>
              )}
              {budget !== 0 && (
                <IconWrapper icon={<BanknotesIcon />}>
                  ${budget.toLocaleString()}
                </IconWrapper>
              )}
            </div>
          </div>
          {!isLG && (
            <>
              <div className="max-w-[65rem] mb-4 xl:mb-6 text-[1.4rem] xl:text-[1.6rem]">
                {formattedOverview}
              </div>
              <MediaButtons type={"movie"} media={movie} />
            </>
          )}
        </div>
      </MediaHero>
      {isLG && (
        <>
          <div className="max-w-[65rem] my-6 text-[1.4rem]">
            {formattedOverview}
          </div>
          <MediaButtons type={"movie"} media={movie} />
        </>
      )}
      {!!collection && isMD && <MovieCollectionLink collection={collection} />}
    </section>
  );
}

export default MovieDetails;
