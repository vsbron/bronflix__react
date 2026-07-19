import { Link } from "react-router-dom";

import { NO_MOVIE_COVER } from "@/lib/assets";
import { MEDIA_IMG_URL } from "@/lib/constants";
import { MovieCollectionLinkProps } from "@/lib/types";

import { BlackGradientToTop } from "@/components/ui/Overlays";
import { NAV_LINKS_MAIN } from "@/lib/navLinks";

function MovieCollectionLink({ collection }: MovieCollectionLinkProps) {
  // Setting the cover image for the collection link
  const coverImg = `url(${
    collection.backdrop_path
      ? `${MEDIA_IMG_URL}/w300/${collection.backdrop_path}`
      : `${NO_MOVIE_COVER}`
  }`;

  // Returned JSX
  return (
    <div className="md:absolute top-2 lg:top-4 xxl:top-auto xxl:bottom-8 right-4 lg:right-8 z-20 max-md:mt-10">
      <div className="text-2xl md:text-xl mb-2 text-left md:text-center">
        Check out the related movies from
      </div>
      <Link
        to={`${NAV_LINKS_MAIN.movies.path}/collection/${collection.id}`}
        style={{ backgroundImage: coverImg }}
        className="max-w-[40rem] md:min-w-[25rem] relative bg-center bg-cover bg-no-repeat rounded-xl flex justify-center overflow-hidden hover:scale-95 transition-transform border-red-900 border-2"
      >
        <BlackGradientToTop height="50%" />
        <div className="relative z-10 px-3 lg:px-5 xxl:px-8 pb-0 pt-[10rem] md:pt-[4rem] lg:pt-[5rem] xl:pt-[6rem] xxl:pb-4 xxl:pt-52">
          <h4 className="text-center text-[1.7rem] xs:text-[2rem] md:text-[1.5rem] lg:text-[1.6rem] xxl:text-[2rem] leading-8 font-medium relative top-0 md:top-2 lg:top-0">
            {collection.name}
          </h4>
        </div>
      </Link>
    </div>
  );
}

export default MovieCollectionLink;
