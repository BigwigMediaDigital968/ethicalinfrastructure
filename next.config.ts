import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com", "www.google.com", "www.eiplin.com"],
  },

  async redirects() {
    return [
      {
        source:
          "/blogs/luxury-living-in-gurgaon-top-residential-projects-recommended-by-ethical-infrastructures-private-limited",
        destination:
          "/blogs/real-estate-company-in-gurgaon-presenting-top-residential-projects",
        permanent: true, // 301 SEO redirect
      },
    ];
  },
};

export default nextConfig;
