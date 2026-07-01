import { Helmet } from "react-helmet-async";
import { META_NOT_FOUND_DESC, META_NOT_FOUND_TITLE } from "@/lib/metaTags";

import Heading from "@/components/ui/Heading";
import ProceedOptions from "@/components/errorBoundary/ProceedOptions";

function NotFound() {
  // Returned JSX
  return (
    <>
      {/* Meta data */}
      <Helmet>
        <title>{META_NOT_FOUND_TITLE}</title>
        <meta name="description" content={META_NOT_FOUND_DESC} />
      </Helmet>

      {/* Content */}
      <section>
        <Heading>Page Not Found</Heading>
        <div>
          We apologize, but the page you're looking for cannot be found.
        </div>
        <ProceedOptions />
      </section>
    </>
  );
}

export default NotFound;
