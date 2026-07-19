import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { SITE_NAME } from "@/lib/constants";
import { META_SITEMAP_DESC, META_SITEMAP_TITLE } from "@/lib/metaTags";

import ContentWall from "@/components/ui/ContentWall";
import Heading from "@/components/ui/Heading";

function Sitemap() {
  // Returned JSX
  return (
    <>
      {/* Meta data */}
      <Helmet>
        <title>{META_SITEMAP_TITLE}</title>
        <meta name="description" content={META_SITEMAP_DESC} />
        {/* <meta name="robots" content="index, follow" /> */}
      </Helmet>

      {/* Content */}
      <section>
        <Heading>Site Map</Heading>
        <ContentWall>
          <p>
            Welcome to the Sitemap of {SITE_NAME}! Here, you'll find an
            organized layout of all the key sections and pages available on the
            platform, designed to help you easily navigate and discover the
            content you're looking for, whether it's movies, TV shows, actors,
            or more.
          </p>
          <p>
            The Sitemap includes links to our main sections, such as the Index
            Page, where you can explore trending and popular content. You'll
            also find separate sections for movies, shows, and actors, each
            offering a curated list of content to browse through. These sections
            provide an easy way to discover new movies, TV shows, and actors
            without diving into individual pages. Additionally, you'll find
            information about upcoming features, ensuring that {SITE_NAME}
            continues to evolve and improve.
          </p>
          <div className="flex max-xs:flex-col gap-x-48">
            <div>
              <h4>Main pages</h4>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/movies">Movies</Link>
                </li>
                <li>
                  <Link to="/shows">Shows</Link>
                </li>
                <li>
                  <Link to="/ai-mode">AI Mode</Link>
                </li>
                <li>
                  <Link to="/about-us">About Us</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4>Additional pages</h4>
              <ul>
                <li>
                  <Link to="/app-info">App Info</Link>
                </li>
                <li>
                  <Link to="/contact-us">Contact Us</Link>
                </li>
                <li>
                  <Link to="/terms">Terms Of Use</Link>
                </li>
                <li>
                  <Link to="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/site-map">Site Map</Link>
                </li>
              </ul>
            </div>
          </div>
          <h4>Social accounts</h4>
          <ul>
            <li>
              <a href="" target="_blank">
                Facebook
              </a>
            </li>
            <li>
              <a href="" target="_blank">
                X (Twitter)
              </a>
            </li>
            <li>
              <a href="" target="_blank">
                Instagram
              </a>
            </li>
            <li>
              <a href="" target="_blank">
                YouTube
              </a>
            </li>
          </ul>
        </ContentWall>
      </section>
    </>
  );
}

export default Sitemap;
