import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";

import { META_SEARCH_DESC, META_SEARCH_TITLE } from "@/lib/metaTags";

import SearchResultsList from "@/features/search/SearchResultsList";

function SearchResults() {
  // Getting the searched query from search params
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  // Returned JSX
  return (
    <>
      {/* Meta data */}
      <Helmet>
        <title>
          "{query}" {META_SEARCH_TITLE}
        </title>
        <meta name="description" content={META_SEARCH_DESC} />
      </Helmet>

      {/*Content */}
      <SearchResultsList query={query!} />
    </>
  );
}

export default SearchResults;
