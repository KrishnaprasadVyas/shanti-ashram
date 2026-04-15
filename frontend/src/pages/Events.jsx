import { useState } from "react";
import { useEvents } from "../context/EventsContext";

const Events = () => {
  const { getVisibleEvents } = useEvents();
  const allEvents = getVisibleEvents();
  const [filter, setFilter] = useState("all");
  const upcomingEvents = allEvents.filter((e) => e.status === "upcoming");
  const pastEvents = allEvents.filter((e) => e.status === "past");

  const displayEvents =
    filter === "all"
      ? allEvents
      : filter === "upcoming"
        ? upcomingEvents
        : pastEvents;

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <h1 className="font-serif text-5xl text-[#1c1c19] md:text-7xl">
              Events
            </h1>
          </div>
          <p className="text-lg text-[#54433b] md:col-span-5">
            Join us for spiritual gatherings, seva programs, and special
            celebrations.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {[
            { value: "all", label: "All Events" },
            { value: "upcoming", label: "Upcoming" },
            { value: "past", label: "Past Events" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`rounded-full px-6 py-2 transition-colors ${
                filter === option.value
                  ? "bg-[#904819] text-white"
                  : "bg-[#ebe8e3] text-[#854f10] hover:bg-[#dac2b6]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {displayEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayEvents.map((event) => (
              <article
                key={event.id}
                className="rounded-4xl bg-white p-6 shadow-[0_12px_40px_rgba(60,47,47,0.06)]"
              >
                <div className="mb-4 overflow-hidden rounded-2xl bg-[#f6f3ee]">
                  <img
                    src={event.image || "/assets/gurudev.jpg"}
                    alt={event.title}
                    className="h-52 w-full object-cover"
                  />
                </div>
                <p className="font-serif text-sm italic text-[#854f10]">
                  {event.date || "TBD"}
                </p>
                <h3 className="mt-1 font-serif text-2xl text-[#1c1c19]">
                  {event.title}
                </h3>
                <p className="mt-2 text-[#54433b]">{event.description}</p>
                {event.location && (
                  <p className="mt-3 text-sm text-[#73594b]">
                    {event.location}
                  </p>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-[#f6f3ee] p-10 text-center text-[#54433b]">
            No events found in this category.
          </div>
        )}
      </section>
    </>
  );
};

export default Events;
