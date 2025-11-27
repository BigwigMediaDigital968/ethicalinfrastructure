"use client";

import { div } from "framer-motion/client";
import React from "react";

import Footer from "../../../components/Footer";
import Navbar2 from "../../../components/Navbar2";

export default function TermsAndConditionsPage() {
  return (
    <div>
      {/* <!-- Open Graph Meta Tags --> */}
      <meta
        property="og:title"
        content="Terms & Conditions – Ethical Infrastructures"
      />
      <meta property="og:site_name" content="Ethical Infrastructures Pvt Ltd" />
      <meta
        property="og:url"
        content="https://www.ethicalinfrastructures.com/Terms&Conditions"
      />
      <meta
        property="og:description"
        content="Review the terms and conditions for Ethical Infrastructures’ trusted real estate services in Gurgaon."
      />
      <meta
        property="og:image"
        content="https://www.eipl.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.634a2fe3.png&w=256&q=75"
      />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_IN" />
      <link
        rel="canonical"
        href="https://www.ethicalinfrastructures.com/Terms&Conditions"
      />
      <title>Terms & Conditions – Ethical Infrastructures</title>
      <meta
        name="description"
        content="Review the terms and conditions for Ethical Infrastructures’ trusted real estate services in Gurgaon."
      />
      <Navbar2 />
      <main className="min-h-screen bg-[var(--white)] text-[var(--text)]">
        <section className="w-full py-16 px-6 md:px-24 lg:px-48">
          <div className=" rounded-3xl shadow-2xl p-8 md:p-16 border border-gray-100 mt-28">
            <header className="text-center mb-10 ">
              <h1 className="text-4xl font-bold text-[var(--primary-color)] mb-3">
                Terms and Conditions
              </h1>
              <p className="text-gray-600 text-lg">
                Ethical Infrastructures P Ltd - Website Terms and Conditions
              </p>
            </header>

            <article className="space-y-8 leading-relaxed">
              <p>
                Please read these Terms and Conditions (Terms) carefully before
                using the Ethical Infrastructures P Ltd website (the Website).
              </p>
              <p>
                By accessing or using the Website, you agree to be bound by
                these Terms. If you do not agree to these Terms, please do not
                use the Website.
              </p>

              <section>
                <h2 className="text-2xl font-semibold  mb-3">
                  Acceptance of Terms
                </h2>
                <p>
                  By accessing and using the Website, you acknowledge that you
                  have read, understood, and agree to be bound by these Terms
                  and all applicable laws and regulations. You agree to use the
                  Website only for lawful purposes and in a manner that does not
                  infringe the rights of, restrict, or inhibit the use and
                  enjoyment of the Website by any third party.
                </p>

                <p className="mt-3">
                  The Website provides information about the real estate
                  services offered by Ethical Infrastructures P Ltd, including
                  but not limited to:
                </p>
                <ul className="list-disc pl-8 mt-2 space-y-1">
                  <li>Property listing information</li>
                  <li>Real estate consultation services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold  mb-3">
                  Services Provided
                </h2>
                <p>
                  The information provided on the Website is for informational
                  purposes only and does not constitute legal, financial, or
                  real estate advice. You should consult with a qualified
                  professional for specific advice tailored to your situation.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold  mb-3">Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance
                  with the laws without regard to its conflict of law
                  provisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold  mb-3">Contact Us</h2>
                <p>
                  If you have any questions or concerns about these Terms,
                  please contact us at{" "}
                  <a
                    href="mailto:info@eiplin.com"
                    className="underline font-medium"
                  >
                    info@eipl.co
                  </a>
                  .
                </p>
              </section>
            </article>

            <footer className="text-center mt-16 border-t border-gray-200 pt-6 text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Ethical Infrastructures P Ltd.
              All rights reserved.
            </footer>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
