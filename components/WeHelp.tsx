import React from "react";
import { Building2, Home, KeyRound } from "lucide-react";

type Service = {
  icon: React.ReactNode;
  label: string;
  title: string;
  description: string;
  redirected: string;
};

const services: Service[] = [
  {
    icon: <Home size={32} />,
    label: "Buy Property",
    title: "Buy Property",
    description:
      "Explore premium residential and commercial options including builder floors, villas, farmhouses and apartments across Delhi NCR. Our team of experts assists you at every step, ensuring ethical guidance, market-accurate insights and smooth transactions. If you're searching for a property dealer or broker in Gurgaon, we provide unmatched support for investment and home-buying decisions.",
    redirected: "/buy",
  },
  {
    icon: <Building2 size={32} />,
    label: "Sell Property",
    title: "Sell Property",
    description:
      "Sell your property faster with professional evaluation, strategic marketing and access to genuine buyers. Our consultants understand market trends, negotiate effectively and ensure transparent dealings, making us one of the most trusted property dealer agents in Gurgaon.",
    redirected: "/sell",
  },
  {
    icon: <KeyRound size={32} />,
    label: "Lease Property",
    title: "Lease Property",
    description:
      "We simplify leasing for landlords and tenants with verified listings, fair agreements and smooth documentation. Whether it’s residential or commercial leasing, Ethical Infrastructures ensures transparency and reliability at every step.",
    redirected: "/lease",
  },
];

const WhatWeDoSection: React.FC = () => {
  return (
    <div className="bg-[var(--white)] text-[var(--black)]">
      <section className="w-11/12 md:w-5/6 py-12 mx-auto">
        <div className="mb-6">
          <p className="text-[var(--primary-color)] text-sm uppercase tracking-widest">
            Our Services
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 tracking-widest text-[var(--title)]">
            Buy, Sell & Lease Properties with Ethical Guidance
          </h2>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <a
              href={service.redirected}
              key={idx}
              className="group bg-[var(--featured)] shadow-xl rounded-xl p-6 transition duration-300 flex flex-col space-y-4 md:space-y-6 hover:scale-[1.02]"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 text-[var(--primary-color)]">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold">{service.title}</h3>
              </div>
              <p className="text-sm text-[var(--title)] leading-relaxed text-justify">
                {service.description}
              </p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WhatWeDoSection;
