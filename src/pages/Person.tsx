import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { META_TITLE_END } from "@/lib/metaTags";
import { IMediaCredit, IPerson } from "@/lib/typesAPI";
import { getPerson } from "@/services/apiPerson";

import Heading from "@/components/ui/Heading";
import Loader from "@/components/ui/Loader";
import PersonDetails from "@/features/personDetails/PersonDetails";
import PersonNotableWork from "@/features/personDetails/PersonNotableWork";
import PersonFilmography from "@/features/personDetails/PersonFilmography";
import { usePersonCredits } from "@/features/personDetails/usePersonCredits";

// Show data loader
export const personLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<IPerson> => {
  // Getting the person using API function
  const person = await getPerson(Number(params.personId));
  // Return show
  return person;
};

function Person() {
  // Getting the person data from the loader
  const person = useLoaderData() as IPerson;

  // Destructuring some person data
  const { name } = person;

  // Getting the movies data from React Query
  const { isLoading, data } = usePersonCredits(person.id);

  // Guard clauses
  if (isLoading) return <Loader />;

  // Destructuring and combining the fetched data (data is guaranteed as we catch the error in Router)
  const { movies, shows } = data!;
  const { cast: moviesCast, crew: moviesCrew } = movies;
  const { cast: showsCast, crew: showsCrew } = shows;

  // Combining data to work as a cast and work as a crew
  const cast = [
    ...moviesCast.map((movie: IMediaCredit) => ({
      ...movie,
      type: "movies",
      date: movie.release_date,
    })),
    ...showsCast.map((show: IMediaCredit) => ({
      ...show,
      type: "tv",
      date: show.first_air_date,
    })),
  ];
  const crew = [
    ...moviesCrew.map((movie: IMediaCredit) => ({
      ...movie,
      type: "movies",
      date: movie.release_date,
    })),
    ...showsCrew.map((show: IMediaCredit) => ({
      ...show,
      type: "tv",
      date: show.first_air_date,
    })),
  ];

  // Boolean indicator for correct work to be highlighted
  const isActor = person.known_for_department === "Acting";

  // Returned JSX
  return (
    <>
      {/* Meta data */}
      <Helmet>
        <title>{`${name} - Profile${META_TITLE_END}`}</title>
        <meta
          name="description"
          content={`Dive into ${name}'s profile, learn about their biography, birthdate, place of birth, notable works, and filmography.`}
        />
        <meta
          name="keywords"
          content={`${name}, biography, filmography, career, notable works, birthdate, place of birth, movies, shows`}
        />
        <meta name="robots" content="index,follow" />
      </Helmet>

      {/* Content */}
      <div className="grid grid-cols-1 xl:grid-cols-[55%_45%] gap-x-12">
        <Heading>{person.name}</Heading>
        <div className="flex flex-col gap-10">
          <PersonDetails person={person} />
          <PersonNotableWork
            credits={isActor ? cast : crew}
            personName={name}
          />
        </div>
        <PersonFilmography cast={cast} crew={crew} />
      </div>
    </>
  );
}

export default Person;
