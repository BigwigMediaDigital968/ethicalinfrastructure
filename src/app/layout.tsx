import { Tinos } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../../components/theme-provider";
import Script from "next/script"; // ✅ Import Script from Next.js
import { PropertyProvider } from "@/context/PropertyContext";
import { Toaster } from "react-hot-toast";

const tinos = Tinos({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ Google Site Verification */}
        <meta
          name="google-site-verification"
          content="AFme-xhHRJUPSgBAh523Sn8uVOuWo-c6BAmIgLM7MFQ"
        />
        <Script
          id="realestate-schema"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "@id": "https://www.eipl.co/#localbusiness",
            name: "Ethical Infrastructures Pvt. Ltd.",
            image:
              "https://www.eipl.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.634a2fe3.png&w=256&q=75&dpl=dpl_5X1AyLqsAPQrT6GF5v8wvfvB2bvX",
            url: "https://www.eipl.co",
            telephone: ["+91-9999000183", "+91-9810010922"],
            priceRange: "₹₹₹",
            description:
              "The Real Estate market in India is complex in terms of distinctive demand and supply propellers, restrictive legislation, land use patterns and regional variations in property markets, which makes it indispensable to use specialized real estate services. With a team of experienced professionals, Ethical Infrastructures Pvt. Ltd. provides reliable and transparent property consulting services in Gurugram.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "A-26/12B, A Block, DLF Phase 1",
              addressLocality: "Gurugram",
              addressRegion: "Haryana",
              postalCode: "122001",
              addressCountry: "IN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 28.4667,
              longitude: 77.0837,
            },
            openingHours: "Mo-Sa 10:00-19:00",
            sameAs: [
              "https://www.facebook.com/profile.php?id=61581857552733",
              "https://www.linkedin.com/company/109224060/admin/dashboard/",
              "https://www.instagram.com/ethical.infrastructure?igsh=MXh4NWVpbmw5eTg0eQ%3D%3D&utm_source=qr",
              "https://www.youtube.com/channel/UC_PoUpH4pZvbWr7oTE8-BqQ",
            ],
            foundingDate: "2007",
            founder: {
              "@type": "Person",
              name: "Mr. Sorabh Chopra",
            },
          })}
        </Script>

        {/* ✅ FAQ Schema */}
        <Script
          id="faq-schema"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What services does Ethical Infrastructures Private Limited offer?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Ethical Infrastructures provides services across residential, commercial, industrial, leasing, pre-leased, and farmhouse properties.",
                },
              },
              {
                "@type": "Question",
                name: "How does Ethical Infrastructures ensure client satisfaction?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "They offer personalized property solutions, conduct in-depth market analysis, and maintain full transparency throughout the process to help clients make confident decisions.",
                },
              },
              {
                "@type": "Question",
                name: "What makes Ethical Infrastructures different from other real estate companies in Gurugram?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Ethical Infrastructures stands out for its ethical approach, research-based recommendations, verified listings, and customer-first property consultation process.",
                },
              },
              {
                "@type": "Question",
                name: "Does Ethical Infrastructures provide assistance with legal documentation?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, the team offers end-to-end assistance with document verification, legal formalities, and registration to ensure a hassle-free experience for buyers and investors.",
                },
              },
              {
                "@type": "Question",
                name: "Can clients invest in pre-leased or income-generating properties through Ethical Infrastructures?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Absolutely. The company offers verified pre-leased commercial spaces that ensure consistent rental income and long-term investment stability.",
                },
              },
              {
                "@type": "Question",
                name: "What makes Ethical Infrastructures different from other leasing agents?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Ethical Infrastructures prioritizes trust and transparency by offering verified listings, legal assistance, and personalized support for both tenants and landlords.",
                },
              },
              {
                "@type": "Question",
                name: "Are furnished and unfurnished options available for lease?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, clients can choose from fully furnished, semi-furnished, and unfurnished residential or commercial spaces across prime Gurugram locations.",
                },
              },
              {
                "@type": "Question",
                name: "What documents are required for residential leasing?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Generally, ID proof, address proof, passport-size photographs, and income proof are needed along with a duly signed lease agreement.",
                },
              },
              {
                "@type": "Question",
                name: "Can Ethical Infrastructures help property owners lease their properties?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, the company provides comprehensive leasing services for landlords, including property listing, tenant screening, negotiation, and complete documentation.",
                },
              },
              {
                "@type": "Question",
                name: "Why should I choose Ethical Infrastructures Private Limited?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Ethical Infrastructures is a trusted real estate company in Gurugram known for professional guidance, transparent dealings, and long-term value-driven property solutions.",
                },
              },
              {
                "@type": "Question",
                name: "How can I connect with Ethical Infrastructures Private Limited?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can contact the company through their official website or directly reach out to their expert consultants for personalized property recommendations and leasing assistance.",
                },
              },
              {
                "@type": "Question",
                name: "How does Ethical Infrastructures Pvt. Ltd. help with property verification in Gurugram?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The company verifies title deeds, sale deeds, RERA registrations, and ensures all legal documents are authentic before property transactions are finalized.",
                },
              },
            ],
          })}
        </Script>
      </head>

      <body className={`${tinos.className} antialiased`}>
        {/* ✅ Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-W8C8LM32TF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W8C8LM32TF');
          `}
        </Script>

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <PropertyProvider>
            <Toaster position="top-center" /> {children}
          </PropertyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
