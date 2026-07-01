import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { META_ERROR_FORM_DESC, META_ERROR_FORM_TITLE } from "@/lib/metaTags";

import Heading from "@/components/ui/Heading";

function ErrorForm() {
  // Getting the navigate function from the hook
  const navigate = useNavigate();

  // Returned JSX
  return (
    <>
      {/* Meta data */}
      <Helmet>
        <title>{META_ERROR_FORM_TITLE}</title>
        <meta name="description" content={META_ERROR_FORM_DESC} />
      </Helmet>

      {/*Content */}
      <section>
        <Heading>Error Sending the Form</Heading>
        <p>
          We couldn't process your request due to an error.
          <br />
          Please{" "}
          <span className="link" onClick={() => navigate(-1)}>
            try again
          </span>{" "}
          later.
        </p>
      </section>
    </>
  );
}

export default ErrorForm;
