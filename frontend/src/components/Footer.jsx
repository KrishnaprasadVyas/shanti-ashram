import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#2a160a] pt-12">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-12 border-b border-[#3d2010] px-6 pb-10 sm:px-10 md:grid-cols-4 md:gap-12">
        <div>
          <h4 className="mb-3 font-serif text-[19px] italic text-[#d4874a]">
            {t("footer.ashramName", "Swami Harichaitanya Shanti Ashram Trust")}
          </h4>
          <p className="max-w-[240px] text-[12.5px] leading-[1.7] text-[#8a6550]">
            {t("footer.tagline", "A sanctuary of bhakti, gyan, and nishkam seva in the heart of Maharashtra.")}
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href="https://www.facebook.com/SwamiHarichaitanyanandS/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-[#8a6550] transition-colors hover:text-[#d4874a]"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/swami_harichaitanyaji_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-[#8a6550] transition-colors hover:text-[#d4874a]"
            >
              Instagram
            </a>
            <a
              href="https://www.youtube.com/@shrigurudevashram"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-[#8a6550] transition-colors hover:text-[#d4874a]"
            >
              YouTube
            </a>
          </div>
        </div>

        <div>
          <h5 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a5840]">
            {t("footer.visit", "Visit")}
          </h5>
          <div className="space-y-3 text-[#b89078]">
            <Link className="block text-[13px] transition-colors hover:text-[#d4a882]" to="/contact">
              {t("footer.planStay", "Plan your stay")}
            </Link>
            <Link className="block text-[13px] transition-colors hover:text-[#d4a882]" to="/contact">
              {t("footer.gettingHere", "Getting here")}
            </Link>
            <Link className="block text-[13px] transition-colors hover:text-[#d4a882]" to="/activities">
              {t("footer.dailySchedule", "Daily schedule")}
            </Link>
            <Link className="block text-[13px] transition-colors hover:text-[#d4a882]" to="/contact">
              {t("footer.accommodation", "Accommodation")}
            </Link>
          </div>
        </div>

        <div>
          <h5 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a5840]">
            {t("footer.teachings", "Teachings")}
          </h5>
          <div className="space-y-3 text-[#b89078]">
            <Link className="block text-[13px] transition-colors hover:text-[#d4a882]" to="/gurudev">
              {t("footer.gurudev", "Gurudev")}
            </Link>
            <Link className="block text-[13px] transition-colors hover:text-[#d4a882]" to="/events">
              {t("footer.satsangArchive", "Satsang archive")}
            </Link>
            <Link className="block text-[13px] transition-colors hover:text-[#d4a882]" to="/gallery">
              {t("footer.booksMedia", "Books & media")}
            </Link>
            <Link className="block text-[13px] transition-colors hover:text-[#d4a882]" to="/activities">
              {t("footer.childrenPrograms", "Children's programs")}
            </Link>
          </div>
        </div>

        <div>
          <h5 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a5840]">
            {t("footer.connect", "Connect")}
          </h5>
          <div className="space-y-3 text-[#b89078]">
            <Link className="block text-[13px] transition-colors hover:text-[#d4a882]" to="/contact">
              {t("footer.contactUs", "Contact us")}
            </Link>
            <Link className="block text-[13px] transition-colors hover:text-[#d4a882]" to="/about">
              {t("footer.newsletter", "Newsletter")}
            </Link>
            <Link className="block text-[13px] transition-colors hover:text-[#d4a882]" to="/donate">
              {t("footer.donate", "Donate")}
            </Link>
            <Link className="block text-[13px] transition-colors hover:text-[#d4a882]" to="/contact">
              {t("footer.volunteer", "Volunteer")}
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-2 px-6 py-4 text-center text-[11.5px] text-[#5a3820] sm:flex-row sm:px-10 sm:text-left">
        <span>© {currentYear} {t("footer.ashramName", "Swami Harichaitanya Shanti Ashram Trust")} · {t("footer.locationText", "Pandharpur, Maharashtra")}</span>
        <span className="normal-case text-[#7a5d4d]">{t("footer.radheRadhe", "राधे राधे")}</span>
      </div>
    </footer>
  );
};

export default Footer;
