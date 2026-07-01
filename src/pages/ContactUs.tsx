import { Helmet } from "react-helmet-async";

import { SITE_NAME } from "@/lib/constants";
import { META_CONTACT_DESC, META_CONTACT_TITLE } from "@/lib/metaTags";

import Heading from "@/components/ui/Heading";
import ContentWall from "@/components/ui/ContentWall";
import ContactForm from "@/components/Forms/ContactForm";

function ContactUs() {
  // Returned JSX
  return (
    <>
      {/* Meta data */}
      <Helmet>
        <title>{META_CONTACT_TITLE}</title>
        <meta name="description" content={META_CONTACT_DESC} />
        {/* <meta name="robots" content="index, follow" /> */}
      </Helmet>

      {/* Content */}
      <section>
        <Heading>Contact Us</Heading>
        <ContentWall>
          <p>
            Have questions, feedback, or suggestions? We'd love to hear from
            you! Whether you want to report an issue, share your thoughts on
            {SITE_NAME}, or just say hello, feel free to reach out.
          </p>

          <p>
            Our goal is to make {SITE_NAME} an enjoyable and seamless experience
            for movie lovers. If you have any ideas for improvements, feature
            requests, or general thoughts on how to enhance the platform, we're
            always open to suggestions. Found a bug? Noticed something that
            could be better? Let us know! Your input is invaluable in helping us
            refine the experience, ensuring smooth navigation, accurate
            information, and an overall engaging platform for all movie
            enthusiasts.
          </p>
          <ContactForm />
        </ContentWall>
      </section>
    </>
  );
}

export default ContactUs;
