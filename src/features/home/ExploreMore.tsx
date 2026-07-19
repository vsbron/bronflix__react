import { Link } from "react-router-dom";

import { useUser } from "@/redux/reducers/userReducer";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";

import { NAV_LINKS_OTHER, NAV_LINKS_MAIN } from "@/lib/navLinks";

function ExploreMore() {
  // Getting the id from user store
  const { uid } = useUser();

  // Returned JSX
  return (
    <div className="relative">
      <Heading as="h2">More content to explore</Heading>
      <div className="w-full md:w-3/5 max-md:text-[1.4rem]">
        <p>
          Dive into our expansive collection of movies and TV shows. Explore
          everything from action-packed blockbusters and heartwarming dramas to
          mind-bending thrillers. You'll find detailed information on each
          title, including plot summaries, cast, and ratings. Discover trending
          movies and shows, top-rated classics, or search for something specific
          using the <strong>search bar</strong> at the top. Browse through our{" "}
          <strong>genres</strong> for a wide variety of options, and explore
          curated <strong>collections</strong> and <strong>seasons</strong> of
          your favorite shows. Not sure what to watch next? Try our{" "}
          <strong>AI Mode</strong> for personalized recommendations based on
          your mood or taste.
        </p>
        <p>
          If you're a member, you can save movies and shows to your{" "}
          <strong>favorites</strong> list, add items to your{" "}
          <strong>future watch list</strong> to track what you're excited to
          see, or even grade the movies you've watched to share your thoughts.
          Stay up-to-date with everything trending in the world of
          entertainment, whether you're discovering new content, revisiting
          timeless classics, or sharing your ratings and reviews with the
          community.
        </p>
      </div>
      <div className="flex gap-8 mt-8 mb-1">
        <Button>
          <Link
            className="inline-block py-3 px-6"
            to={NAV_LINKS_MAIN.movies.path}
          >
            MOVIES
          </Link>
        </Button>
        <Button>
          <Link
            className="inline-block py-3 px-6"
            to={NAV_LINKS_MAIN.shows.path}
          >
            SERIES
          </Link>
        </Button>
        <Button>
          <Link
            className="inline-block py-3 px-6"
            to={NAV_LINKS_MAIN.aiMode.path}
          >
            AI MODE
          </Link>
        </Button>
        {uid && (
          <Button>
            <Link
              className="inline-block py-3 px-6"
              to={NAV_LINKS_OTHER.profile.path}
            >
              PROFILE
            </Link>
          </Button>
        )}
      </div>
      <div
        className="absolute -top-10 -bottom-16 right-0 w-[100%] md:w-[50%] -z-10 bg-center overflow-hidden opacity-80"
        style={{ perspective: "50rem" }}
      >
        <div
          className="absolute -top-1/4 right-0 h-[150%] w-[40rem] lg:w-[60rem] xl:w-[80rem] bg-[100%_auto] exploreMoreBg animate-exploreMoreBg max-md:opacity-30"
          style={{
            transform: "rotateY(-15deg)",
            transformOrigin: "right center",
          }}
        />
      </div>
    </div>
  );
}

export default ExploreMore;
