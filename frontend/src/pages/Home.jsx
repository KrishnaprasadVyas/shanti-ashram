import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useActivities } from "../context/ActivitiesContext";
import { useEvents } from "../context/EventsContext";
import { API_BASE_URL } from "../utils/api";

const Home = () => {
  const { i18n } = useTranslation();
  const { getVisibleActivities } = useActivities();
  const { getVisibleEvents } = useEvents();
  const activities = getVisibleActivities().slice(0, 3);
  const events = getVisibleEvents().slice(0, 4);

  const [featuredCauses, setFeaturedCauses] = useState([]);

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
            <h1 className="font-serif text-5xl leading-tight text-[#1c1c19] md:text-7xl">
              Finding <span className="italic text-[#904819]">Inner Peace</span>{" "}
              in Compassion
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-[#54433b] md:text-xl">
              A digital sanctuary for spiritual growth and mindful living,
              connected directly to the living work of Shanti Ashram.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/donate"
                className="rounded-full bg-linear-to-br from-[#904819] to-[#af602f] px-8 py-4 text-white"
              >
                Give Grace
              </Link>
              <Link
                to="/about"
                className="rounded-full bg-white px-8 py-4 text-[#854f10]"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fcf9f4] px-6 py-24 md:px-12">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-12 flex items-end justify-between">
            <h2 className="font-serif text-4xl text-[#1c1c19] md:text-5xl">
              Spiritual Offerings
            </h2>
            <Link to="/activities" className="text-[#904819]">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {activities.map((activity) => (
              <article
                key={activity.id}
                className="overflow-hidden rounded-4xl bg-white shadow-[0_12px_40px_rgba(60,47,47,0.06)]"
              >
                <img
                  src={activity.image || "/assets/gurudev.jpg"}
                  alt={activity.title}
                  className="h-60 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="font-serif text-2xl text-[#1c1c19]">
                    {activity.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-[#54433b]">
                    {activity.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6f3ee] px-6 py-24 md:px-12">
        <div className="mx-auto max-w-screen-2xl">
          <h2 className="mb-12 text-center font-serif text-4xl text-[#1c1c19] md:text-5xl">
            Sacred Gatherings
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {events.map((event) => (
              <article key={event.id} className="rounded-4xl bg-white p-6">
                <p className="text-sm italic text-[#854f10]">
                  {event.date || "Upcoming"}
                </p>
                <h3 className="mt-2 font-serif text-2xl text-[#1c1c19]">
                  {event.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-[#54433b]">
                  {event.description}
                </p>
              </article>
            ))}
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
