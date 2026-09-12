import { motion as Motion } from "framer-motion";
import { ImageOff } from "lucide-react";
import { useTranslation } from "react-i18next";

const EmptyState = ({ searchTerm, category, onReset }) => {
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
    <Motion.div
      className="py-16 px-6 md:px-12 text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Motion.div variants={itemVariants} className="mb-4">
        <ImageOff className="w-14 h-14 mx-auto text-[#D4B5A0] opacity-50" />
      </Motion.div>

      <Motion.h3
        className="text-2xl font-serif font-light text-[#1c1c19] mb-2"
        variants={itemVariants}
      >
        {t("gallery.noImages")}
      </Motion.h3>

      <Motion.p
        className="text-[#8B7355] max-w-md mx-auto mb-6 text-sm"
        variants={itemVariants}
      >
        {searchTerm || category !== "all"
          ? `${t("gallery.searchingFor")} "${searchTerm || category}"`
          : t("gallery.subtitle")}
      </Motion.p>

      {(searchTerm || category !== "all") && (
        <Motion.button
          onClick={onReset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-6 py-2.5 bg-[#c97325] text-white rounded-full font-medium hover:shadow-md transition-all text-sm"
          variants={itemVariants}
        >
          {t("gallery.resetFilters")}
        </Motion.button>
      )}
    </Motion.div>
  );
};

export default EmptyState;
