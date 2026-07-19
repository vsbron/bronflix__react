import { Helmet } from "react-helmet-async";

import { SITE_NAME } from "@/lib/constants";
import { META_APP_INFO_DESC, META_APP_INFO_TITLE } from "@/lib/metaTags";

import AnchorTarget from "@/components/ui/AnchorTarget";
import Heading from "@/components/ui/Heading";
import ContentWall from "@/components/ui/ContentWall";

function AppInfo() {
  // Returned JSX
  return (
    <>
      {/* Meta data */}
      <Helmet>
        <title>{META_APP_INFO_TITLE}</title>
        <meta name="description" content={META_APP_INFO_DESC} />
        {/* <meta name="robots" content="index, follow" /> */}
      </Helmet>

      {/* Content */}
      <section>
        <Heading>App Info</Heading>
        <ContentWall>
          <p>
            This is a Netflix-inspired application built with modern
            technologies, providing an interactive platform for exploring
            movies, shows, and actors.
          </p>
          <p>
            It features an index page, as well as separate pages for movies,
            shows, and people, along with additional technical pages. Key
            functionalities include dynamic content from the TMDB API, a sleek
            and responsive UI, and intuitive navigation.
          </p>
          <Heading as="h2">Contents</Heading>
          <ul>
            <li>
              <a href="#project-overview">Project Overview</a>
            </li>
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#page-descriptions">Page Descriptions</a>
              <ul>
                <li>
                  <a href="#index-page">Index Page</a>
                </li>
                <li>
                  <a href="#movie-page">Movie Page</a>
                </li>
                <li>
                  <a href="#show-page">Show Page</a>
                </li>
                <li>
                  <a href="#person-page">Person Page</a>
                </li>
                <li>
                  <a href="#collection-page">Collection Page</a>
                </li>
                <li>
                  <a href="#ai-mode-page">AI Mode Page</a>
                </li>
                <li>
                  <a href="#profile-page">Profile Page</a>
                </li>
                <li>
                  <a href="#main-movies-page">Main Movies Page</a>
                </li>
                <li>
                  <a href="#main-shows-page">Main Shows Page</a>
                </li>
                <li>
                  <a href="#genres-media-page">Genres Media Page</a>
                </li>
                <li>
                  <a href="#additional-pages">Additional Pages</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#technical-details">Technical Details</a>
            </li>
          </ul>
          <AnchorTarget id="project-overview" />
          <Heading as="h2">Project Overview</Heading>
          <p>
            {SITE_NAME} allows users to explore movies, TV shows, and actors
            with dynamic content fetched from the TMDB API. It includes:
          </p>
          <ul>
            <li>
              <strong>Core Components</strong>: A responsive header, side
              navigation, and footer for smooth navigation.
            </li>
            <li>
              <strong>Dynamic Content</strong>: Movies, shows, and actors are
              fetched from the TMDB API and shuffled on every visit, providing a
              fresh set of recommendations.
            </li>
            <li>
              <strong>Modern UI/UX</strong>: Sleek design with a responsive
              layout and intuitive navigation.
            </li>
          </ul>
          <AnchorTarget id="features" />
          <Heading as="h2">Features</Heading>
          <ul>
            <li>
              <strong>Interactive Content</strong>: The index page includes a
              variety of sections such as 'What's Hot?', 'Trending Shows',
              'Trending Actors', and more, offering a dynamic browsing
              experience. Each section presents a carousel of movies, shows, and
              actors, offering users a variety of recommendations.
            </li>
            <li>
              <strong>Detailed Pages</strong>: Each movie, show, and actor has
              its dedicated page with rich information, including posters,
              overviews, cast/crew, and similar recommendations.
            </li>
            <li>
              <strong>Seamless Navigation</strong>: Users can click on items to
              navigate to their respective pages for more detailed information.
            </li>
            <li>
              <strong>AI Mode</strong>: An AI-powered chat assistant that
              recommends movies, TV shows, and actors based on natural-language
              questions, keeping the conversation focused on entertainment
              topics.
            </li>
            <li>
              <strong>User Authentication</strong>: Users can sign up, log in,
              and access their personalized profile, enhancing their experience
              with saved preferences and recommendations.
            </li>
            <li>
              <strong>Responsive Design</strong>: Supports mobile devices with a
              minimum width of 360px.
            </li>
          </ul>
          <AnchorTarget id="page-descriptions" />
          <Heading as="h2">Page Descriptions</Heading>
          <AnchorTarget id="index-page" />
          <Heading as="h3">Index Page</Heading>
          <p>The main page features several sections, including:</p>
          <ul>
            <li>
              <strong>What's Hot?</strong>: A carousel showcasing movies, where
              the selected movie displays detailed information like name, score,
              genres, and offers options to view the trailer or navigate to its
              page.
            </li>
            <li>
              <strong>Trending Content</strong>: A dynamic mix of carousels
              featuring trending shows, actors, top-rated movies, and top-rated
              shows, allowing users to explore popular content across various
              categories. Each item in the carousels is clickable and takes the
              user to the respective movie, show, or actor page. All content on
              the index page is shuffled for a fresh set of recommendations with
              every visit.
            </li>
          </ul>
          <AnchorTarget id="movie-page" />
          <Heading as="h3">Movie Page</Heading>
          <p>Displays comprehensive information about a movie, including:</p>
          <ul>
            <li>
              Movie poster, cover image, ratings, release information, and other
              essential details.
            </li>
            <li>Ability to rate the movie on a scale from 1 to 5.</li>
            <li>A button to watch the trailer.</li>
            <li>
              Buttons to add or remove the movie from favorites or watch lists.
            </li>
            <li>
              If the movie is part of a collection, a button to explore the
              collection.
            </li>
            <li>Cast carousel featuring actors photos and their roles.</li>
            <li>
              Crew section highlighting key contributors such as the director,
              writer, and producer.
            </li>
            <li>
              "Movies You May Also Like" carousel with genre-based
              recommendations.
            </li>
          </ul>
          <AnchorTarget id="show-page" />
          <Heading as="h3">Show Page</Heading>
          <p>Similar to the movie page, but with additional details:</p>
          <ul>
            <li>
              Displays the series' timespan, current status, and number of
              episodes.
            </li>
            <li>
              Ability to rate the show on a scale from 1 to 5, just like with
              the movies.
            </li>
            <li>A button to watch the trailer.</li>
            <li>
              Buttons to add or remove the show from favorites or watch lists,
              similar to the movie.
            </li>
            <li>
              An episode guide, where users can choose a season and view
              episodes with overviews, air dates, and snapshot.
            </li>
            <li>
              Series cast carousel featuring actors photos and their roles.
            </li>
            <li>
              Crew section highlighting key contributors such as producers.
            </li>
            <li>"Shows You May Also Like" carousel for recommendations.</li>
          </ul>
          <AnchorTarget id="person-page" />
          <Heading as="h3">Person Page</Heading>
          <p>Provides in-depth details about an actor or crew member:</p>
          <ul>
            <li>
              Displays a profile image, name, gender, birthday, and biography.
            </li>
            <li>
              A "Notable Work" carousel featuring the movies and shows they are
              most known for.
            </li>
            <li>
              A complete filmography list, including both acting and crew roles,
              with each entry clickable for more details.
            </li>
          </ul>
          <AnchorTarget id="collection-page" />
          <Heading as="h3">Collection Page</Heading>
          <p>
            Accessed from a movie page within a collection. Displays the movie's
            poster, a brief overview, and a list of movies included in the
            collection.
          </p>
          <AnchorTarget id="ai-mode-page" />
          <Heading as="h3">AI Mode Page</Heading>
          <p>
            A conversational interface where users can ask for movie, show, or
            actor recommendations in natural language.
          </p>
          <p>
            Powered by Google's Gemini API through a serverless function,
            keeping the API key secure server-side.
          </p>
          <p>
            Maintains short-term conversation context (last 10 messages) for
            natural back-and-forth follow-ups.
          </p>
          <p>
            Chat history persists for the browser session via sessionStorage.
          </p>
          <p>
            Responses are rendered with Markdown formatting for readable,
            structured recommendations.
          </p>
          <AnchorTarget id="profile-page" />
          <Heading as="h3">Profile Page</Heading>
          <p>
            The Profile Page serves as the user's hub, displaying their personal
            details and curated lists.
          </p>
          <ul>
            <li>
              User Information: Shows the user's avatar, name, and other basic
              details.
            </li>
            <li>
              Profile Editing: Allows users to update their personal details,
              such as name and other fields.
            </li>
            <li>
              Clicking on the avatar lets the user select a new one from the
              available options.
            </li>
            <li>
              Password Update: Provides an option to change the account password
              securely.
            </li>
            <li>
              Watchlist: A section where users can track movies and TV shows
              they plan to watch.
            </li>
            <li>
              Favorites: Separate lists for favorite movies, TV shows, and
              people (actors/crew).
            </li>
            <li>
              If a movie, show, or person is included in any of the user's
              lists, the corresponding icon will be displayed on the media's
              preview across the site.
            </li>
          </ul>
          <AnchorTarget id="main-movies-page" />
          <Heading as="h3">Main Movies Page</Heading>
          <p>
            The Main Movies Page is your gateway to a world of cinema, offering
            curated lists, trending films, and more:
          </p>
          <ul>
            <li>
              Movie Genres: A section featuring different movie genres, helping
              users explore films based on their preferred style or mood.
            </li>
            <li>
              Now Playing: A dynamic list showcasing movies currently in
              theaters, so you can keep up with the latest releases.
            </li>
            <li>
              Upcoming Movies: A preview of upcoming movies with their release
              dates, trailers, and summaries, giving you a glimpse of what's
              coming soon.
            </li>
            <li>
              Collections: A curated selection of movie collections, from
              franchises to themed lists, perfect for binge-watching or
              discovering films in the same category.
            </li>
            <li>
              Acclaimed Movies: A list of highly-rated and critically acclaimed
              movies, ensuring you're up-to-date with the best in cinema.
            </li>
          </ul>
          <AnchorTarget id="main-shows-page" />
          <Heading as="h3">Main Shows Page</Heading>
          <p>
            The Main Shows Page offers a comprehensive guide to TV series,
            making it easy to discover new shows and follow your favorites:
          </p>
          <ul>
            <li>
              Show Genres: A section that categorizes TV shows by genre, helping
              users find new shows based on what they love to watch.
            </li>
            <li>
              On Air Today: A dynamic list of TV shows currently airing, so you
              never miss an episode of your favorite series.
            </li>
            <li>
              Currently Running Shows: A selection of ongoing TV shows, updated
              regularly to keep track of the latest seasons and episodes.
            </li>
            <li>
              Popular Shows: A carousel featuring trending and most popular TV
              shows, giving you a quick view of what's buzzing in the TV world.
            </li>
            <li>
              Top Rated Shows: A curated list of top-rated TV shows, offering
              highly recommended content for those looking for critically
              acclaimed series.
            </li>
          </ul>
          <AnchorTarget id="genres-media-page" />
          <Heading as="h3">Genres Media Page</Heading>
          <p>
            A page that lists media based on the selected genre from the Main
            Movies or Main Shows pages
          </p>
          <ul>
            <li>Uses a 2-column layout, similar to the Search Results page.</li>
            <li>
              Displays up to 10,000 results across 500 pages (TMDB's limit).
            </li>
          </ul>
          <AnchorTarget id="additional-pages" />
          <Heading as="h3">Additional Pages</Heading>
          <p>
            Includes supplementary pages such as Contact Us, App Info, About Us,
            Site Map, Terms of Use and Privacy Policy.
          </p>
          <AnchorTarget id="technical-details" />
          <Heading as="h2">Technical Details</Heading>
          <ul>
            <li>
              <strong>Framework</strong>: React with TypeScript for type safety
              and scalability.
            </li>
            <li>
              <strong>Routing</strong>: React Router v6.4 for seamless
              navigation.
            </li>
            <li>
              <strong>State Management</strong>: Redux for managing global
              state.
            </li>
            <li>
              <strong>Authentication</strong>: Firebase Authentication and
              Firestore are used to handle secure user sign-up, login, and
              persistent user data for personalized experiences.
            </li>
            <li>
              <strong>Icons</strong>: HeroIcons for modern and consistent UI
              elements.
            </li>
            <li>
              <strong>API</strong>: TMDB API for fetching movies, shows, and
              actor data.
            </li>
            <li>
              <strong>AI</strong>: Google Gemini API (via a serverless proxy)
              powers the AI Mode chat, providing natural-language movie, show,
              and actor recommendations.
            </li>
            <li>
              <strong>Meta Management</strong>: React Helmet Async is used to
              manage dynamic meta tags, improving SEO and social sharing by
              dynamically adjusting the title, description, and other meta
              information based on the page the user is on.
            </li>
            <li>
              <strong>Form Handling</strong>: React Hook Form is used for
              handling the contact form, with Zod providing schema-based
              validation to ensure form data integrity.
            </li>
            <li>
              <strong>Code Splitting</strong>: The app optimizes its initial
              load time by dynamically loading components as needed, reducing
              the overall bundle size and improving performance.
            </li>
          </ul>
        </ContentWall>
      </section>
    </>
  );
}

export default AppInfo;
