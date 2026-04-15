import { useActivities } from "../context/ActivitiesContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Activities = () => {
  const { t, i18n } = useTranslation();
  const { getVisibleActivities, getCategories } = useActivities();
  const allActivities = getVisibleActivities();
  const availableCategories = getCategories();
  const categories = ["all", ...availableCategories];
  const [selectedCategory, setSelectedCategory] = useState("all");

  const getLocalizedText = (value) => {
    if (typeof value === "string") return value;
    if (value && typeof value === "object") {
      return value[i18n.language] || value.en || value.hi || value.mr || "";
    }
    return "";
  };

  const filteredActivities =
    selectedCategory === "all"
      ? allActivities
      : allActivities.filter((a) => a.category === selectedCategory);

  return (
    <>
      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <h1 className="font-serif text-5xl text-[#1c1c19] md:text-7xl">
                {t("activities.title")}
              </h1>
            </div>
            <p className="text-lg text-[#54433b] md:col-span-5">
              {t("activities.subtitle")}
            </p>
          </div>

          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-6 py-2 text-sm transition-colors capitalize ${
                  selectedCategory === cat
                    ? "bg-[#904819] text-white"
                    : "bg-[#ebe8e3] text-[#854f10] hover:bg-[#dac2b6]"
                }`}
              >
                {cat === "all" ? t("gallery.all") : cat}
              </button>
            ))}
          </div>

          {filteredActivities.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredActivities.map((activity) => {
                const imageSource = activity.imageUrl || activity.image;
                const title = getLocalizedText(activity.title);
                const description = getLocalizedText(activity.description);

                return (
                  <article
                    key={activity.id}
                    className="overflow-hidden rounded-4xl bg-white shadow-[0_12px_40px_rgba(60,47,47,0.06)]"
                  >
                    {imageSource ? (
                      <div className="h-52 overflow-hidden bg-[#f6f3ee]">
                        <img
                          src={imageSource}
                          alt={title || "Activity"}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="grid h-24 place-items-center bg-[#f6f3ee] text-[#904819]">
                        <span className="text-3xl">{activity.icon || "✦"}</span>
                      </div>
                    )}

                    <div className="p-6">
                      <p className="mb-2 text-xs uppercase tracking-widest text-[#73594b]">
                        {activity.category || t("activities.title")}
                      </p>
                      <h3 className="font-serif text-2xl text-[#1c1c19]">
                        {title}
                      </h3>
                      <p className="mt-3 line-clamp-3 text-[#54433b]">
                        {description}
                      </p>
                      <Link
                        to={`/activities/${activity.id}`}
                        className="mt-5 inline-flex rounded-full bg-[#904819] px-5 py-2 text-sm font-medium text-white"
                      >
                        {t("activities.learnMore")}
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-3xl bg-[#f6f3ee] p-10 text-center text-[#54433b]">
              {t("events.noEvents")}
            </div>
          )}
        </div>
      </section>

      <section className="px-6 pb-20 md:px-12">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-[#f6f3ee] p-10 text-center md:p-14">
          <h2 className="font-serif text-4xl text-[#1c1c19]">
            {t("activities.participate")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[#54433b]">
            Join us in our various activities and programs. Your participation
            makes a difference.
          </p>
          <Link
            to="/contact"
            className="mt-7 inline-flex rounded-full bg-linear-to-br from-[#904819] to-[#af602f] px-8 py-3 font-medium text-white"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
};

export default Activities;
