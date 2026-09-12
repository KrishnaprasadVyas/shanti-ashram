import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useEvents } from "../context/EventsContext";
import { formatLocalizedDate, formatLocalizedTime } from "../utils/helpers";
import { Calendar, Clock, MapPin } from "lucide-react";

const Events = () => {
  const { t, i18n } = useTranslation();
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

  const getLocalizedEventText = (value) => {
    if (!value) return "";
    if (typeof value === "object") {
      return value[i18n.language] || value.en || value.hi || value.mr || "";
    }
    const str = String(value).trim();
    const eventMap = {
      "Spiritual Retreat": "events.items.spiritualRetreat",
      "A day-long spiritual retreat with meditation and satsang": "events.items.spiritualRetreatDesc",
      "Yoga Workshop": "events.items.yogaWorkshop",
      "Learn traditional yoga practices and meditation techniques": "events.items.yogaWorkshopDesc",
      "Shri Gurudev Ashram Anniversary 2026": "events.items.anniversary2026",
      "Shiv Mahapuran Katha 13 March to 20 March 2026 Join us in feeding 1000 families. Volunteers welcome!": "events.items.anniversary2026Desc",
      "Maha Satsang with Gurudev": "events.items.mahaSatsang",
      "A special spiritual gathering with Gurudev's divine discourse": "events.items.mahaSatsangDesc",
      "Ashram Grounds": "events.items.ashramGrounds",
      "Yoga Hall": "events.items.yogaHall",
      "Community Hall": "events.items.communityHall",
      "Main Hall": "events.items.mainHall",
    };

    if (eventMap[str]) {
      return t(eventMap[str], str);
    }
    return str;
  };

  const filterOptions = [
    { value: "all", label: t("events.filterAll", "All Events") },
    { value: "upcoming", label: t("events.upcoming", "Upcoming") },
    { value: "past", label: t("events.past", "Past Events") },
  ];

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-8 pb-16 md:px-12 md:pt-10 md:pb-20">
        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-[#904819]">
              {t("nav.events", "Events")}
            </span>
            <h1 className="font-serif text-4xl text-[#1c1c19] sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
              {t("events.title")}
            </h1>
          </div>
          <p className="text-base sm:text-lg text-[#54433b] md:col-span-5 leading-relaxed">
            {t("events.subtitle")}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-10 flex flex-wrap justify-center gap-2.5 sm:gap-3">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFilter(option.value)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 shadow-2xs ${
                filter === option.value
                  ? "bg-[#904819] text-white shadow-xs"
                  : "bg-[#ebe8e3] text-[#6b4731] hover:bg-[#dac2b6] hover:text-[#3C2F2F]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Event Cards Grid */}
        {displayEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayEvents.map((event) => {
              const localizedDate = formatLocalizedDate(event.date, i18n.language);
              const localizedTime = formatLocalizedTime(event.time, i18n.language);
              const localizedTitle = getLocalizedEventText(event.title);
              const localizedDescription = getLocalizedEventText(event.description);
              const localizedLocation = getLocalizedEventText(event.location);
              const isUpcoming = event.status === "upcoming";

              return (
                <article
                  key={event.id}
                  className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_10px_30px_rgba(60,47,47,0.06)] border border-[#f0e6d8] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(60,47,47,0.12)]"
                >
                  <div className="relative h-56 overflow-hidden bg-[#f6f3ee]">
                    <img
                      src={event.image || "/assets/gurudev.jpg"}
                      alt={localizedTitle}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold shadow-xs ${
                          isUpcoming
                            ? "bg-[#904819] text-white"
                            : "bg-[#f6f3ee]/90 text-[#73594b] backdrop-blur-xs"
                        }`}
                      >
                        {isUpcoming
                          ? t("events.statusUpcoming", "Upcoming")
                          : t("events.statusPast", "Past")}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    {/* Localized Date Row */}
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[#904819]">
                      <Calendar className="h-4 w-4 shrink-0 text-[#904819]" />
                      <span>{localizedDate || t("events.tbd", "TBD")}</span>
                    </div>

                    <h3 className="font-serif text-2xl text-[#1c1c19] group-hover:text-[#904819] transition-colors leading-snug">
                      {localizedTitle}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#54433b]">
                      {localizedDescription}
                    </p>

                    {/* Metadata: Time and Location */}
                    <div className="mt-auto pt-5 border-t border-[#f2eae0] space-y-2 text-xs text-[#73594b]">
                      {localizedTime && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5 shrink-0 text-[#904819]" />
                          <span>{localizedTime}</span>
                        </div>
                      )}
                      {localizedLocation && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-[#904819]" />
                          <span>{localizedLocation}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl bg-[#f6f3ee] p-12 text-center text-[#54433b]">
            {t("events.noEvents", "No events found in this category.")}
          </div>
        )}
      </section>
    </>
  );
};

export default Events;
