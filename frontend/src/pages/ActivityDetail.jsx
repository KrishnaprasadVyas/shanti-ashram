import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SectionHeading from "../components/SectionHeading";
import { useActivities } from "../context/ActivitiesContext";

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { getVisibleActivities } = useActivities();
  const allActivities = getVisibleActivities();
  const activity = allActivities.find((a) => String(a.id) === String(id));

  const getLocalizedText = (value) => {
    if (!value) return "";
    if (typeof value === "object") {
      return value[i18n.language] || value.en || value.hi || value.mr || "";
    }
    const str = String(value).trim();
    
    const stringMap = {
      "Festival Celebration": "activities.items.festivalCelebration",
      "Celebrations and special programs for major festivals.": "activities.items.festivalCelebrationDesc",
      "Annadan Seva": "activities.items.annadanSeva",
      "Feeding the needy and underprivileged families": "activities.items.annadanSevaDesc",
      "Daily Routine": "activities.items.dailyRoutine",
      "Regular daily schedule and aartis.": "activities.items.dailyRoutineDesc",
      "Gurudev Programs": "activities.items.gurudevPrograms",
      "Special spiritual programs led by Gurudev.": "activities.items.gurudevProgramsDesc",
      "Janmashtami": "activities.items.janmashtami",
      "Devotional programs and celebrations on Lord Krishna's birth.": "activities.items.janmashtamiDesc",
      "Holi": "activities.items.holi",
      "Colorful Holi celebrations with community participation.": "activities.items.holiDesc",
      "Diwali": "activities.items.diwali",
      "Festival of lights and special aartis and bhajans.": "activities.items.diwaliDesc",
      "Rakshabandhan": "activities.items.rakshabandhan",
      "Sibling bonding festival programs and rituals.": "activities.items.rakshabandhanDesc",
      "Daily meal distribution": "activities.items.dailyMeal",
      "Special festival distributions": "activities.items.specialFestivalMeal",
      "Daily Annadan": "activities.items.dailyAnnadan",
      "Daily Morning Aarti 6am": "activities.items.morningAarti",
      "Kakda Aarti 4am": "activities.items.kakdaAarti",
      "Haripath (6 pm)": "activities.items.haripath",
      "Shrimad Bhagwat Katha": "activities.items.shrimadBhagwat",
      "Ram Katha": "activities.items.ramKatha",
      "Hari Kala Kirtan": "activities.items.hariKala",
    };

    if (stringMap[str]) {
      return t(stringMap[str], str);
    }

    return str;
  };

  if (!activity) {
    return (
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-[#1c1c19]">
            {t("activities.notFound", "Activity not found")}
          </h2>
          <p className="mb-6 text-[#54433b]">
            {t("activities.notFoundDesc", "The activity you're looking for does not exist.")}
          </p>
          <Link
            to="/activities"
            className="rounded-full bg-[#904819] px-6 py-2.5 text-white font-medium hover:bg-[#783b13] transition-colors shadow-xs"
          >
            {t("activities.backToActivities", "Back to Activities")}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-12 px-6 md:px-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <SectionHeading
              title={getLocalizedText(activity.title)}
              subtitle={
                getLocalizedText(activity.description) ||
                getLocalizedText(activity.shortDescription)
              }
              center={true}
              titleClassName="text-[#904819]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activity.subitems || []).map((sub) => (
              <div
                key={sub.id || sub._id || sub.key}
                className="bg-[#fffdfa] rounded-2xl shadow-xs border border-[#ecdacb] p-6 transition-all hover:shadow-md"
              >
                <h3 className="text-lg font-serif font-semibold text-[#904819] mb-2">
                  {getLocalizedText(sub.title)}
                </h3>
                {sub.description && (
                  <p className="text-[#54433b] text-sm leading-relaxed mb-3">
                    {getLocalizedText(sub.description)}
                  </p>
                )}
                {sub.points && sub.points.length > 0 && (
                  <ul className="list-disc list-inside text-sm text-[#73594b] space-y-1">
                    {sub.points.map((p, i) => (
                      <li key={i}>{getLocalizedText(p)}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-full bg-[#ebe8e3] px-6 py-2.5 text-sm font-medium text-[#3C2F2F] hover:bg-[#dac2b6] transition-colors"
            >
              {t("activities.back", "Back")}
            </button>
            <Link
              to="/contact"
              className="rounded-full bg-[#904819] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#783b13] transition-colors shadow-xs"
            >
              {t("activities.joinContact", "Join / Contact")}
            </Link>
          </div>
        </div>
      </section>

      {/* photos removed per request */}
    </>
  );
};

export default ActivityDetail;
