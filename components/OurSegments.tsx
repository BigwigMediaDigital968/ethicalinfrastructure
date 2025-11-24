"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";
import ButtonFill from "./Button";
import { useRouter } from "next/navigation"; // ✅ FIXED — correct import

const OurSegments = () => {
  const router = useRouter(); // ✅ useRouter hook

  const segments = [
    {
      title: "Builder Floors",
      href: "/buy", // 👈 added link
      images: [
        "https://res.cloudinary.com/dcq2oziz4/image/upload/v1761300453/IMG_3345_tuyjaj.jpg",
        "https://res.cloudinary.com/dcq2oziz4/image/upload/v1761300452/IMG_3351_c20c6n.jpg",
        "https://res.cloudinary.com/dcq2oziz4/image/upload/v1761300452/IMG_3346_g1azx4.jpg",
        "https://res.cloudinary.com/dcq2oziz4/image/upload/v1761300452/IMG_3355_my8dtn.jpg",
        "https://res.cloudinary.com/dcq2oziz4/image/upload/v1761300452/IMG_3354_pbab16.jpg",
        "https://res.cloudinary.com/dcq2oziz4/image/upload/v1761300451/IMG_3347_srj8mo.jpg",
        "https://res.cloudinary.com/dcq2oziz4/image/upload/v1761300451/IMG_3362_m8xs3o.jpg",
        "https://res.cloudinary.com/dcq2oziz4/image/upload/v1761300449/IMG_3358_mqtywu.jpg",
        "https://res.cloudinary.com/dcq2oziz4/image/upload/v1761300450/IMG_3357_tj4hkt.jpg",
        "https://res.cloudinary.com/dcq2oziz4/image/upload/v1761300449/IMG_3360_yygl4n.jpg",
      ],
    },
    {
      title: "Villa (Kothis)",
      href: "/buy", // 👈 added link

      images: [
        "https://res.cloudinary.com/dcq2oziz4/image/upload/v1761306318/IMG_1413_v989ao.jpg",
        "https://res.cloudinary.com/dcq2oziz4/image/upload/v1761306318/IMG_1416_untxuf.jpg",
        "https://res.cloudinary.com/dcq2oziz4/image/upload/v1761306318/IMG_1412_mpkhxg.jpg",
        "https://res.cloudinary.com/dcq2oziz4/image/upload/v1761306318/IMG_1411_imm5e9.jpg",
        "https://res.cloudinary.com/dcq2oziz4/image/upload/v1761306318/IMG_1415_ttzwtg.jpg",
        "https://res.cloudinary.com/dcq2oziz4/image/upload/v1761306319/IMG_1414_u1j3bz.jpg",
      ],
    },
    {
      title: "Apartments",
      href: "/buy", // 👈 added link

      images: [
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760357906/Ethical/images/Screenshot%202025-10-13%20131016.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760357907/Ethical/images/Screenshot%202025-10-13%20131307.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760357907/Ethical/images/Screenshot%202025-10-13%20131322.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760357908/Ethical/images/Screenshot%202025-10-13%20131340.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760357908/Ethical/images/Screenshot%202025-10-13%20131637.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760357909/Ethical/images/Screenshot%202025-10-13%20131700.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760357910/Ethical/images/Screenshot%202025-10-13%20131718.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760357909/Ethical/images/Screenshot%202025-10-13%20131735.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760357909/Ethical/images/Screenshot%202025-10-13%20131748.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760357909/Ethical/images/Screenshot%202025-10-13%20131801.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760357909/Ethical/images/Screenshot%202025-10-13%20131821.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760357910/Ethical/images/Screenshot%202025-10-13%20131840.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760357910/Ethical/images/Screenshot%202025-10-13%20131854.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760357910/Ethical/images/Screenshot%202025-10-13%20131914.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760357910/Ethical/images/Screenshot%202025-10-13%20131930.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760357910/Ethical/images/Screenshot%202025-10-13%20131957.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760700446/Ethical/images/MNB-Ananta-Vilasa.webp",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760700447/Ethical/images/ananta-vilasa-1-.webp",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760700447/Ethical/images/anata-vilasa-3.webp",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760360679/Ethical/images/Screenshot%202025-10-13%20134441.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760360679/Ethical/images/Screenshot%202025-10-13%20134624.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760360680/Ethical/images/Screenshot%202025-10-13%20134643.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760360680/Ethical/images/Screenshot%202025-10-13%20134710.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760360680/Ethical/images/Screenshot%202025-10-13%20134732.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760360681/Ethical/images/Screenshot%202025-10-13%20134756.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760360530/Ethical/images/Screenshot%202025-10-13%20134809.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760360531/Ethical/images/Screenshot%202025-10-13%20134857.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760360531/Ethical/images/Screenshot%202025-10-13%20134914.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760360531/Ethical/images/Screenshot%202025-10-13%20134931.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760360531/Ethical/images/Screenshot%202025-10-13%20134947.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760360531/Ethical/images/Screenshot%202025-10-13%20135015.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760360531/Ethical/images/Screenshot%202025-10-13%20135030.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760360531/Ethical/images/Screenshot%202025-10-13%20135045.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760532556/Ethical/images/Screenshot%202025-10-15%20180229.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760532557/Ethical/images/Screenshot%202025-10-15%20180241.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760532557/Ethical/images/Screenshot%202025-10-15%20180301.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760532557/Ethical/images/Screenshot%202025-10-15%20180310.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760532557/Ethical/images/Screenshot%202025-10-15%20180320.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760532558/Ethical/images/Screenshot%202025-10-15%20180334.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760532558/Ethical/images/Screenshot%202025-10-15%20180349.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760532558/Ethical/images/Screenshot%202025-10-15%20180424.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760532558/Ethical/images/Screenshot%202025-10-15%20180210.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760533568/Ethical/images/Screenshot%202025-10-15%20182337.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760533568/Ethical/images/Screenshot%202025-10-15%20182355.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760533569/Ethical/images/Screenshot%202025-10-15%20182411.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760533648/Ethical/images/Screenshot%202025-10-15%20182023.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760533649/Ethical/images/Screenshot%202025-10-15%20182118.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760533649/Ethical/images/Screenshot%202025-10-15%20182141.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760533649/Ethical/images/Screenshot%202025-10-15%20182233.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760684541/Ethical/images/silverglade%20%284%29.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760684540/Ethical/images/silverglade%20%281%29.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760684540/Ethical/images/silverglade%20%282%29.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760684540/Ethical/images/silverglade%20%283%29.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760684541/Ethical/images/silverglade%20%285%29.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760684541/Ethical/images/silverglade%20%286%29.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760684541/Ethical/images/silverglade%20%287%29.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760684542/Ethical/images/silverglade%20%288%29.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760684542/Ethical/images/silverglade%20%289%29.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760684542/Ethical/images/silverglade%20%2810%29.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760687071/Ethical/images/Screenshot%202025-10-17%20121336.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760687071/Ethical/images/Screenshot%202025-10-17%20121551.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760687071/Ethical/images/Screenshot%202025-10-17%20124445.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760687071/Ethical/images/Screenshot%202025-10-17%20124433.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760687072/Ethical/images/Screenshot%202025-10-17%20124422.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760687072/Ethical/images/Screenshot%202025-10-17%20124407.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760687072/Ethical/images/Screenshot%202025-10-17%20124351.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760687072/Ethical/images/Screenshot%202025-10-17%20121529.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760687072/Ethical/images/Screenshot%202025-10-17%20121604.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760687073/Ethical/images/Screenshot%202025-10-17%20121625.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760687073/Ethical/images/Screenshot%202025-10-17%20121637.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760687073/Ethical/images/Screenshot%202025-10-17%20121720.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760687073/Ethical/images/Screenshot%202025-10-17%20121748.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760687073/Ethical/images/Screenshot%202025-10-17%20121809.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760687073/Ethical/images/Screenshot%202025-10-17%20121824.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760687073/Ethical/images/Screenshot%202025-10-17%20121842.png",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760687344/Ethical/images/IMG_2492.jpg",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760687345/Ethical/images/IMG_2493.jpg",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760687344/Ethical/images/IMG_2513.jpg",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760687345/Ethical/images/IMG_2497.jpg",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760687345/Ethical/images/IMG_2500.jpg",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760687345/Ethical/images/IMG_2501.jpg",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760687345/Ethical/images/IMG_2507.jpg",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760687345/Ethical/images/IMG_2510.jpg",
        "https://res.cloudinary.com/dasczew6y/image/upload/v1760687345/Ethical/images/IMG_2515.jpg",
      ],
    },
  ];

  return (
    <section className="py-16 px-4 md:px-12 lg:px-20 bg-[var(--white)] text-center text-[var(--black)]">
      <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-[var(--black)] mb-12">
        Our Specializations
      </h2>

      <div className="flex flex-col md:flex-row justify-center items-center gap-5 flex-wrap">
        {segments.map((segment, index) => (
          <div
            key={index}
            className="group w-full sm:w-[90%] md:w-[90%] lg:w-[32%] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow bg-[var(--featured)] mx-auto cursor-pointer"
          >
            <div className="relative h-80 md:h-96 w-full">
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                loop
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                className="h-full w-full"
              >
                {segment.images.map((img, i) => (
                  <SwiperSlide key={i}>
                    <div className="relative h-80 md:h-96 w-full">
                      <Image
                        src={img}
                        alt={`${segment.title} ${i + 1}`}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <style jsx global>{`
                .swiper-button-next,
                .swiper-button-prev {
                  opacity: 0;
                  transition: opacity 0.3s ease;
                }
                .group:hover .swiper-button-next,
                .group:hover .swiper-button-prev {
                  opacity: 1;
                }
                .swiper-button-next,
                .swiper-button-prev {
                  color: #007aff !important;
                }
              `}</style>
            </div>

            <div className="p-5">
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold tracking-widest text-[var(--black)] mb-4">
                {segment.title}
              </h3>

              {/* 👇 View Details Button */}
              <Link href={`${segment.href}`}>
                <ButtonFill text="View Details" className="w-full" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurSegments;
