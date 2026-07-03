import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { INFO_EMAIL, SITE_NAME } from "@/lib/constants";
import { META_PRIVACY_DESC, META_PRIVACY_TITLE } from "@/lib/metaTags";

import AnchorTarget from "@/components/ui/AnchorTarget";
import ContentWall from "@/components/ui/ContentWall";
import Heading from "@/components/ui/Heading";

function Privacy() {
  // Returned JSX
  return (
    <>
      {/* Meta data */}
      <Helmet>
        <title>{META_PRIVACY_TITLE}</title>
        <meta name="description" content={META_PRIVACY_DESC} />
      </Helmet>

      {/* Content */}
      <section>
        <Heading>Privacy Policy</Heading>
        <ContentWall>
          <p>
            At {SITE_NAME}, your privacy is important to us. This Privacy Policy
            explains how we collect, use, and protect your information when you
            visit our website, register or log in, and use our contact form. By
            using our services, you agree to the terms of this Privacy Policy.
          </p>
          <Heading as="h2">Contents</Heading>
          <ul>
            <li>
              <a href="#information-collect">Information We Collect</a>
              <ul>
                <li>
                  <a href="#how-we-use-information">
                    How We Use Your Information
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#data-sharing">Data Sharing and Disclosure</a>
            </li>
            <li>
              <a href="#cookies-and-tracking">
                Cookies and Tracking Technologies
              </a>
            </li>
            <li>
              <a href="#data-security">Data Security</a>
              <ul>
                <li>
                  <a href="#your-rights">Your Rights</a>
                </li>
                <li>
                  <a href="#third-party-links">Third-Party Links</a>
                </li>
                <li>
                  <a href="#childrens-privacy">Children's Privacy</a>
                </li>
                <li>
                  <a href="#changes-to-policy">
                    Changes to This Privacy Policy
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#contact-us">Contact Us</a>
            </li>
          </ul>
          <AnchorTarget id="information-collect" />
          <Heading as="h2">Information We Collect</Heading>
          <p>We may collect the following types of information:</p>
          <ul>
            <li>
              <strong>Personal Information:</strong> When you register or log in
              to our website, we collect personal information such as your name,
              email address, and any other details you provide during
              registration or login.
            </li>
            <li>
              <strong>Contact Form Data:</strong> If you contact us through our
              contact form, we may collect the details you provide, including
              your name, email address, phone number, and any message or inquiry
              you submit.
            </li>
            <li>
              <strong>Cookies and System Information:</strong> We use cookies to
              collect data about your system and browsing activity, including
              your IP address, browser type, device information, and pages
              visited. This helps us improve user experience and analyze site
              usage.
            </li>
          </ul>

          <AnchorTarget id="how-we-use-information" />
          <Heading as="h3">How We Use Your Information</Heading>
          <p>
            We may use the information we collect for the following purposes:
          </p>
          <ul>
            <li>To provide and improve our services</li>
            <li>
              To respond to your inquiries or requests through the contact form
            </li>
            <li>To authenticate and manage your account</li>
            <li>To personalize your experience on our site</li>
            <li>
              To analyze website performance and enhance user experience through
              cookies and tracking technologies
            </li>
          </ul>

          <AnchorTarget id="data-sharing" />
          <Heading as="h2">Data Sharing and Disclosure</Heading>
          <p>
            We do not sell, trade, or rent your personal information to third
            parties. However, we may share your information in the following
            situations:
          </p>
          <ul>
            <li>
              With trusted third-party service providers who help us operate our
              website and services (e.g., hosting, analytics)
            </li>
            <li>
              To comply with legal obligations, such as responding to legal
              requests or subpoenas
            </li>
            <li>
              In the event of a merger, acquisition, or sale of all or part of
              our business
            </li>
          </ul>

          <AnchorTarget id="cookies-and-tracking" />
          <Heading as="h2">Cookies and Tracking Technologies</Heading>
          <p>
            We use cookies and similar tracking technologies to collect data
            about how you interact with our website. Cookies help us:
          </p>
          <ul>
            <li>Improve website functionality and user experience</li>
            <li>Track browsing behavior to provide personalized content</li>
            <li>
              Collect system information, including your device type, browser,
              and IP address
            </li>
          </ul>
          <p>
            You can manage your cookie preferences through your browser
            settings. However, disabling cookies may impact some features of the
            site.
          </p>

          <AnchorTarget id="data-security" />
          <Heading as="h2">Data Security</Heading>
          <p>
            We implement reasonable security measures to protect your personal
            information from unauthorized access or disclosure. While we strive
            to protect your information, no data transmission or storage system
            is 100% secure, and we cannot guarantee the absolute security of
            your data.
          </p>

          <AnchorTarget id="your-rights" />
          <Heading as="h3">Your Rights</Heading>
          <p>
            Depending on your location and applicable laws, you may have the
            right to access, update, or delete your personal information. If you
            wish to exercise any of these rights, please contact us at [Your
            Contact Email].
          </p>

          <AnchorTarget id="third-party-links" />
          <Heading as="h3">Third-Party Links</Heading>
          <p>
            Our website may contain links to third-party websites. We are not
            responsible for the privacy practices or content of those websites.
            We recommend reviewing their privacy policies before providing any
            personal information.
          </p>

          <AnchorTarget id="childrens-privacy" />
          <Heading as="h3">Children's Privacy</Heading>
          <p>
            Our services are not intended for children under the age of 13, and
            we do not knowingly collect personal information from children. If
            we become aware that we have inadvertently collected data from a
            child under 13, we will take steps to delete that information.
          </p>

          <AnchorTarget id="changes-to-policy" />
          <Heading as="h3">Changes to This Privacy Policy</Heading>
          <p>
            We may update this Privacy Policy from time to time. When we make
            changes, we will update the "Effective Date" at the top of this
            page. We encourage you to review this policy periodically to stay
            informed about how we protect your information.
          </p>

          <AnchorTarget id="contact-us" />
          <Heading as="h2">Contact Us</Heading>
          <p>
            If you have any questions or concerns about this Privacy Policy, or
            how we handle your information, please contact us:
          </p>
          <ul>
            <li>
              <strong>{SITE_NAME}</strong>
            </li>
            <li>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${INFO_EMAIL}`}>{INFO_EMAIL}</a>
            </li>
            <li>
              Or use our <Link to="/contact-us">Contact Us</Link> page
            </li>
          </ul>
        </ContentWall>
      </section>
    </>
  );
}

export default Privacy;
