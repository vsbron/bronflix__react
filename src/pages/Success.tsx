import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import {
  META_SUCCESS_FORM_DESC,
  META_SUCCESS_FORM_TITLE,
} from "@/lib/metaTags";

import Heading from "@/components/ui/Heading";

function Success() {
  // Returned JSX
  return (
    <>
      {/* Meta data */}
      <Helmet>
        <title>{META_SUCCESS_FORM_TITLE}</title>
        <meta name="description" content={META_SUCCESS_FORM_DESC} />
      </Helmet>

      {/*Content */}
      <section>
        <Heading>Form success</Heading>
        <p>
          Thank you for reaching out! Your message has been successfully sent.
          One of our representatives will contact you as soon as possible
        </p>
        <p>
          In the meantime, feel free to return to the{" "}
          <Link to="/">homepage</Link> and continue exploring our collection.
        </p>
      </section>
    </>
  );
}

export default Success;
