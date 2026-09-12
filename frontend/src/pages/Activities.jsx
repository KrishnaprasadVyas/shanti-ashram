import { useActivities } from "../context/ActivitiesContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Sparkles, Utensils, Clock, Sun, Heart, Flame } from "lucide-react";

const Activities = () => {
  const { t, i18n } = useTranslation();
  const { getVisibleActivities, getCategories } = useActivities();
  const allActivities = getVisibleActivities();
  const availableCategories = getCategories();
  const categories = ["all", ...availableCategories];
  const [selectedCategory, setSelectedCategory] = useState("all");

  const renderActivityIcon = (iconKey) => {
    const key = String(iconKey || "").toLowerCase().trim();
    switch (key) {
      case "festival":
        return <Sparkles className="w-12 h-12 text-[#904819]" aria-hidden="true" />;
      case "food":
        return <Utensils className="w-12 h-12 text-[#904819]" aria-hidden="true" />;
      case "schedule":
        return <Clock className="w-12 h-12 text-[#904819]" aria-hidden="true" />;
      case "spiritual":
        return <Sun className="w-12 h-12 text-[#904819]" aria-hidden="true" />;
      case "yoga":
        return <Heart className="w-12 h-12 text-[#904819]" aria-hidden="true" />;
      default:
        return <Flame className="w-12 h-12 text-[#904819]" aria-hidden="true" />;
    }
  };

  const getCategoryLabel = (cat) => {
    if (cat === "all") return t("activities.categories.all", t("gallery.all", "All"));
    const key = String(cat).toLowerCase().trim();
    return t(`activities.categories.${key}`, cat.charAt(0).toUpperCase() + cat.slice(1));
  };

  const getLocalizedText = (value) => {
    if (!value) return "";
    if (typeof value === "object") {
      return value[i18n.language] || value.en || value.hi || value.mr || "";
    }
    const str = String(value).trim();
    
    // Map known string identifiers to dictionary keys
    const titleKeyMap = {
      "Festival Celebration": "activities.items.festivalCelebration",
      "Annadan Seva": "activities.items.annadanSeva",
      "Daily Routine": "activities.items.dailyRoutine",
      "Gurudev Programs": "activities.items.gurudevPrograms",
      "Celebrations and special programs for major festivals.": "activities.items.festivalCelebrationDesc",
      "Feeding the needy and underprivileged families": "activities.items.annadanSevaDesc",
      "Regular daily schedule and aartis.": "activities.items.dailyRoutineDesc",
      "Special spiritual programs led by Gurudev.": "activities.items.gurudevProgramsDesc",
    };

    if (titleKeyMap[str]) {
      return t(titleKeyMap[str], str);
    }

    return str;
  };

  const filteredActivities =
    selectedCategory === "all"
      ? allActivities
      : allActivities.filter(
          (activity) =>
            activity.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <>
      <section className="px-6 pt-8 pb-16 md:pt-10 md:pb-20 md:px-12">
        <div className="mx-auto max-w-screen-2xl">
          {/* Header */}
          <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <span className="text-xs font-semibold tracking-widest text-[#904819] uppercase">
                {t("nav.activities")}
              </span>
              <h1 className="mt-2 font-serif text-4xl sm:text-5xl md:text-7xl leading-tight text-[#1c1c19]">
                {t("activities.title")}
              </h1>
              <p className="mt-4 max-w-2xl text-base md:text-lg text-[#54433b]">
                {t("activities.subtitle")}
              </p>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mb-10 flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#904819] text-white shadow-sm"
                    : "bg-[#f6f3ee] text-[#54433b] hover:bg-[#ebd9ce] hover:text-[#904819]"
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>

          {/* Activities Cards Grid */}
          {filteredActivities.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredActivities.map((activity) => {
                const imageSource = activity.imageUrl || activity.image;
                const title = getLocalizedText(activity.title);
                const description = getLocalizedText(activity.description);

                return (
                  <article
                    key={activity.id}
                    className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_10px_30px_rgba(60,47,47,0.06)] border border-[#f0e6d8] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(60,47,47,0.12)]"
                  >
                    {imageSource && (imageSource.startsWith("http") || imageSource.startsWith("/") || imageSource.startsWith("data:")) ? (
                      <div className="h-56 overflow-hidden bg-[#f6f3ee]">
                        <img
                          src={imageSource}
                          alt={title || "Activity"}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="flex h-44 items-center justify-center bg-gradient-to-br from-[#f8f5ee] to-[#f0e8dc] text-[#904819]">
                        {renderActivityIcon(activity.iconKey || activity.icon || activity.category)}
                      </div>
                    )}

                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <div className="mb-3">
                        <span className="inline-block rounded-full bg-[#f6f3ee] px-3 py-1 text-xs font-semibold tracking-wider text-[#904819] border border-[#dac2b6]/40">
                          {getCategoryLabel(activity.category)}
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl text-[#1c1c19] group-hover:text-[#904819] transition-colors leading-snug">
                        {title}
                      </h3>

                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#54433b]">
                        {description}
                      </p>

                      <div className="mt-auto pt-6">
                        <Link
                          to={`/activities/${activity.id}`}
                          className="inline-flex items-center gap-2 rounded-full bg-[#904819] px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#783b13] shadow-xs"
                        >
                          <span>{t("activities.learnMore")}</span>
                          <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-3xl bg-[#f6f3ee] p-12 text-center text-[#54433b]">
              {t("events.noEvents", "No activities found.")}
            </div>
          )}
        </div>
      </section>

      {/* Participation Call-To-Action */}
      <section className="px-6 pb-20 md:px-12">
        <div className="mx-auto max-w-4xl rounded-3xl bg-[#f6f3ee] border border-[#e8ded0] p-8 text-center sm:p-12 md:p-14 shadow-xs">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1c1c19]">
            {t("activities.participate")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-[#54433b] leading-relaxed">
            {t("activities.participateDesc", "Join us in our various activities and programs. Your participation makes a difference.")}
          </p>
          <Link
            to="/contact"
            className="mt-7 inline-flex rounded-full bg-linear-to-br from-[#904819] to-[#af602f] px-8 py-3.5 font-medium text-white shadow-xs transition-transform duration-200 hover:scale-[1.02]"
          >
            {t("nav.contact", "Contact Us")}
          </Link>
        </div>
      </section>
    </>
  );
};

export default Activities;
