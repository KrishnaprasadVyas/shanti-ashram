import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const GalleryCTA = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <Motion.section
      className="px-6 py-14 md:py-20 md:px-12 bg-gradient-to-br from-[#fcf9f4] to-[#f5ebe3]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
          {/* Left: Content */}
          <Motion.div className="space-y-5" variants={itemVariants}>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-[#1c1c19]">
              {t("gallery.ctaTitle")}
            </h2>

            <div className="w-16 h-1 bg-gradient-to-r from-[#c97325] to-[#d9a574]" />

            <p className="text-base md:text-lg text-[#5a3820] leading-relaxed font-light">
              {t("gallery.ctaSubtitle")}
            </p>

            <Motion.div
              className="pt-2 flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <Link
                to="/contact"
                className="inline-block px-8 py-3 bg-[#c97325] text-white rounded-full font-medium hover:shadow-lg transition-all text-center"
              >
                {t("gallery.ctaButton")}
              </Link>
              <Link
                to="/donate"
                className="inline-block px-8 py-3 bg-white text-[#c97325] border border-[#c97325] rounded-full font-medium hover:bg-[#FFF5E6] transition-all text-center"
              >
                {t("nav.donate")}
              </Link>
            </Motion.div>
          </Motion.div>

          {/* Right: Stats */}
          <Motion.div
            className="grid grid-cols-2 gap-4 md:gap-6"
            variants={containerVariants}
          >
            <Motion.div
              className="p-5 md:p-6 bg-white rounded-2xl shadow-xs hover:shadow-sm transition-all"
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              <p className="text-3xl md:text-4xl font-serif text-[#c97325] font-light mb-1">
                365
              </p>
              <p className="text-sm text-[#8B7355]">{t("gallery.daysOfSeva")}</p>
            </Motion.div>

            <Motion.div
              className="p-5 md:p-6 bg-white rounded-2xl shadow-xs hover:shadow-sm transition-all"
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              <p className="text-3xl md:text-4xl font-serif text-[#c97325] font-light mb-1">
                10+
              </p>
              <p className="text-sm text-[#8B7355]">{t("gallery.categoriesCount")}</p>
            </Motion.div>

            <Motion.div
              className="p-5 md:p-6 bg-white rounded-2xl shadow-xs hover:shadow-sm transition-all"
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              <p className="text-3xl md:text-4xl font-serif text-[#c97325] font-light mb-1">
                100+
              </p>
              <p className="text-sm text-[#8B7355]">{t("gallery.photosCaptured")}</p>
            </Motion.div>

            <Motion.div
              className="p-5 md:p-6 bg-white rounded-2xl shadow-xs hover:shadow-sm transition-all"
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              <p className="text-3xl md:text-4xl font-serif text-[#c97325] font-light mb-1">
                25+
              </p>
              <p className="text-sm text-[#8B7355]">{t("activities.title")}</p>
            </Motion.div>
          </Motion.div>
        </div>
      </div>
    </Motion.section>
  );
};

export default GalleryCTA;
