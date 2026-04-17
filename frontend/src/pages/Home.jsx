import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "../utils/api";
import { useGallery } from "../context/GalleryContext";
import { galleryImages } from "../data/dummyData";

const Home = () => {
  const { i18n } = useTranslation();
  const { getVisibleItems } = useGallery();

  const [featuredCauses, setFeaturedCauses] = useState([]);
  const liveGalleryPhotos = getVisibleItems().slice(0, 4);
  const glimpsePhotos =
    liveGalleryPhotos.length > 0
      ? liveGalleryPhotos
      : [galleryImages[0], galleryImages[1], galleryImages[4], galleryImages[5]].filter(Boolean);

  useEffect(() => {
    const fetchFeaturedCauses = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/public/donation-heads/featured?limit=4&lang=${i18n.language || "en"}`,
        );
        const data = await response.json();
        if (data?.success) {
          setFeaturedCauses(data.data || []);
        }
      } catch {
        setFeaturedCauses([]);
      }
    };

    fetchFeaturedCauses();
  }, [i18n.language]);

  return (
    <>
      <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-[#fcf9f4] px-6 py-24 md:px-12">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/assets/gurudev.jpg"
            alt="Ashram"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="mb-4 ml-0.5 text-xs tracking-[0.24em] text-[#7f6a5a] uppercase">
              Since 2020
            </p>

            <div className="flex items-start">
              <h1
                className="text-5xl leading-tight text-[#1c1c19] md:text-7xl"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Shanti Ashram
              </h1>
            </div>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#54433b] md:text-lg">
              Param Pujya Shri Swami Harichaitanyanand Saraswatiji Maharaj's seva
              kshetra for bhakti, gyan and nishkam seva
            </p>

            <p
              className="mt-5 text-lg italic text-[#7f664d] md:ml-2"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              राधे राधे <span className="text-base">🪈</span>
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/about"
                className="rounded-full border border-[#bda58f] bg-[#efe6da]/80 px-8 py-3 text-[#4d3f35] transition hover:bg-[#e6d8c7]"
              >
                About
              </Link>
              <Link
                to="/gurudev"
                className="rounded-full border border-[#cdb9a6] bg-[#f7f1e8] px-8 py-3 text-[#5e4a3d] transition hover:bg-[#efe5d7]"
              >
                Gurudev
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#efe8db] px-6 py-0 md:px-12">
        <div className="mx-auto max-w-screen-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="border-b border-r-0 border-[#e8ddd0] px-8 py-10 md:border-b-0 md:border-r md:px-10 md:py-12">
              <div className="mb-3 text-[11px] tracking-[0.2em] text-[#8a6550]">01</div>
              <div className="mb-2 text-2xl text-[#3d1f0a]" style={{ fontFamily: "Georgia, serif" }}>
                Bhakti
              </div>
              <div className="mb-3 text-sm tracking-[0.04em] text-[#d4874a]">भक्ति</div>
              <p className="text-[13.5px] leading-7 text-[#5a3820]">
                Pure devotion is the highest path. At Shanti Ashram, each day begins and ends in surrender - through aarti, kirtan, and the quiet remembrance of the Divine that flows beneath all activity.
              </p>
            </div>

            <div className="border-b border-r-0 border-[#e8ddd0] px-8 py-10 md:border-b-0 md:border-r md:px-10 md:py-12">
              <div className="mb-3 text-[11px] tracking-[0.2em] text-[#8a6550]">02</div>
              <div className="mb-2 text-2xl text-[#3d1f0a]" style={{ fontFamily: "Georgia, serif" }}>
                Gyan
              </div>
              <div className="mb-3 text-sm tracking-[0.04em] text-[#d4874a]">ज्ञान</div>
              <p className="text-[13.5px] leading-7 text-[#5a3820]">
                Wisdom traditions are studied here not merely as texts, but as living maps for the soul. The ashram holds regular satsangs, Gita study, and discourses rooted in the Vedantic lineage of Gurudev.
              </p>
            </div>

            <div className="px-8 py-10 md:px-10 md:py-12">
              <div className="mb-3 text-[11px] tracking-[0.2em] text-[#8a6550]">03</div>
              <div className="mb-2 text-2xl text-[#3d1f0a]" style={{ fontFamily: "Georgia, serif" }}>
                Nishkam Seva
              </div>
              <div className="mb-3 text-sm tracking-[0.04em] text-[#d4874a]">निष्काम सेवा</div>
              <p className="text-[13.5px] leading-7 text-[#5a3820]">
                Service without any desire for reward - this is the ashram's heartbeat. From the kitchen to the garden, from teaching children to caring for elders, every act of seva is offered as a flower at the feet of the Lord.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f3ee] px-6 py-24 md:px-12">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c97325]">
            Our Gurudev
          </div>

          <div className="mb-10 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#ded8cc]" />
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0 text-[#5f7742]"
            >
              <path d="M8 14V6" stroke="currentColor" strokeWidth="1" />
              <path d="M8 6C8 6 5 5 4.5 2.5C4.5 2.5 7 3 8 6Z" fill="currentColor" opacity="0.7" />
              <path d="M8 6C8 6 11 5 11.5 2.5C11.5 2.5 9 3 8 6Z" fill="currentColor" opacity="0.7" />
            </svg>
            <div className="h-px flex-1 bg-[#ded8cc]" />
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-[320px_1fr] md:items-start md:gap-16">
            <div className="relative mx-auto w-fit bg-[#e6dfd3] p-3">
              <img
                src="/assets/gurudev.jpg"
                alt="Param Pujya Shri Swami Harichaitanyanand Saraswatiji Maharaj"
                className="h-[340px] w-[255px] object-cover"
                style={{ objectPosition: "65% -38%" }}
              />
              <span className="pointer-events-none absolute -left-2 -top-2 h-8 w-8 border-l-2 border-t-2 border-[#c97325]" />
              <span className="pointer-events-none absolute -bottom-2 -right-2 h-8 w-8 border-b-2 border-r-2 border-[#c97325]" />
            </div>

            <div className="pt-2">
              <p className="mb-2 text-[14px] text-[#c97325]">Param Pujya</p>
              <h2
                className="mb-4 max-w-3xl text-[26px] font-semibold leading-[1.3] text-[#3d1f0a]"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Swami Harichaitanyanand
                <br />
                Saraswatiji Maharaj
              </h2>

              <p className="mb-5 max-w-5xl text-[13.5px] leading-[1.8] text-[#5a3820]">
                Founder and spiritual guide of Shri Gurudev Ashram (Palaskhed
                Sapkal, Chikhli, Buldhana) and Swami Harichaitanya Shanti
                Ashram Trust (Datala, Malkapur)
              </p>

              <p className="mb-5 max-w-5xl text-[13.5px] leading-[1.8] text-[#5a3820]">
                Gurudev ji showed the path of living with bhakti, gyan and
                selfless seva together. Through daily satsang, Gita path,
                Haripath, annadan, education, medical, gaushala, gurukulam,
                adivasi seva, anath ashram and Seva Tirth Dham, service is
                rendered to society at the ashram.
              </p>

              <p className="mb-5 max-w-5xl text-[13.5px] leading-[1.8] text-[#5a3820]">
                The purpose of every seva work is to purify the mind and uplift
                society. Branches and services inspired by Gurudev ji connect
                devotees across different parts of the country.
              </p>

              <Link
                to="/gurudev"
                className="text-[13px] text-[#c97325] underline underline-offset-4"
              >
                Know Gurudev →
              </Link>
            </div>
          </div>

          <div className="mt-16">
            <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[#c97325]">
              From the Ashram
            </p>
            <h2
              className="mb-10 text-[56px] leading-none text-[#3d1f0a]"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              A glimpse of life here
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
              {glimpsePhotos.map((photo, index) => {
                const isLarge = index === 0;
                return (
                  <figure
                    key={photo.id}
                    className={`group overflow-hidden rounded-[2rem] bg-white shadow-[0_12px_32px_rgba(60,47,47,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(60,47,47,0.16)] ${
                      isLarge ? "md:col-span-5 md:row-span-2 min-h-[420px]" : "md:col-span-3 min-h-[200px]"
                    }`}
                  >
                    <div className="relative h-full min-h-[200px] overflow-hidden">
                      <img
                        src={photo.src}
                        alt={photo.title || "Ashram gallery moment"}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </figure>
                );
              })}
            </div>

            <div className="mt-3 text-right">
              <Link
                to="/gallery"
                className="text-[12px] text-[#c97325] underline underline-offset-4"
              >
                View full gallery →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-12">
        <div className="mx-auto max-w-screen-2xl rounded-[3rem] bg-linear-to-br from-[#904819] to-[#af602f] p-10 text-white md:p-16">
          <h2 className="font-serif text-4xl md:text-5xl">
            Support the Shanti Mission
          </h2>
          <p className="mt-4 max-w-3xl text-white/90">
            Your contribution powers food, education, shelter, and spiritual
            guidance.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {featuredCauses.map((cause) => (
              <div
                key={cause._id}
                className="rounded-2xl bg-white/10 p-5 backdrop-blur-md"
              >
                <h4 className="font-serif text-2xl">{cause.name}</h4>
                <p className="mt-1 text-sm text-white/80 line-clamp-2">
                  {cause.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              to="/donate"
              className="rounded-full bg-white px-8 py-4 font-semibold text-[#904819]"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
