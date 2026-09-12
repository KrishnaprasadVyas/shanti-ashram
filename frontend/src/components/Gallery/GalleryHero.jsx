import { motion as Motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const GalleryHero = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <Motion.section
      className="relative overflow-hidden px-6 pt-6 pb-10 md:pt-8 md:pb-14 md:px-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-200 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-200 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-screen-2xl">
        {/* Breadcrumb */}
        <Motion.nav
          className="mb-6 flex items-center gap-2 text-sm text-[#8B7355]"
          variants={itemVariants}
        >
          <Link to="/" className="hover:text-[#c97325] transition-colors">
            {t("nav.home")}
          </Link>
          <span className="text-[#D4B5A0]">/</span>
          <span className="text-[#c97325] font-medium">{t("gallery.title")}</span>
        </Motion.nav>

        {/* Title Section */}
        <Motion.div className="space-y-4" variants={itemVariants}>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-light leading-tight text-[#1c1c19]">
            {t("gallery.heroTitle")}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#c97325] to-[#d9a574]" />
        </Motion.div>

        {/* Subtitle */}
        <Motion.p
          className="mt-6 max-w-2xl text-base md:text-lg text-[#5a3820] leading-relaxed font-light"
          variants={itemVariants}
        >
          {t("gallery.heroSubtitle")}
        </Motion.p>

        {/* Stats */}
        <Motion.div
          className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
          variants={itemVariants}
        >
          <div>
            <p className="text-3xl md:text-4xl font-serif text-[#904819] font-light">
              100+
            </p>
            <p className="mt-2 text-sm text-[#8B7355]">{t("gallery.photosCaptured")}</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-serif text-[#904819] font-light">
              10+
            </p>
            <p className="mt-2 text-sm text-[#8B7355]">{t("gallery.categoriesCount")}</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="text-3xl md:text-4xl font-serif text-[#904819] font-light">
              365
            </p>
            <p className="mt-2 text-sm text-[#8B7355]">{t("gallery.daysOfSeva")}</p>
          </div>
        </Motion.div>
      </div>
    </Motion.section>
  );
};

export default GalleryHero;
