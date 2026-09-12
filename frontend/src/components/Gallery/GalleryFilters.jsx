import { motion as Motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

const GalleryFilters = ({
  categories,
  activeCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
  loading,
}) => {
  const { t } = useTranslation();

  const filterVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const handleClearSearch = useCallback(() => {
    onSearchChange("");
  }, [onSearchChange]);

  const getCategoryLabel = (cat) => {
    if (cat === "All") return t("gallery.all");
    const key = cat.toLowerCase();
    return t(`activities.categories.${key}`, cat);
  };

  return (
    <Motion.div
      className="px-6 py-6 md:px-12 md:py-8 bg-gradient-to-b from-[#fcf9f4] to-transparent"
      variants={filterVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mx-auto max-w-screen-2xl">
        {/* Search Bar */}
        <Motion.div
          className="mb-6"
          variants={filterVariants}
        >
          <div className="relative max-w-xl">
            <input
              type="text"
              placeholder={t("gallery.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-4 py-3 pl-10 bg-white border border-[#D4B5A0] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#c97325] focus:border-transparent transition-all shadow-xs"
              disabled={loading}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B7355]" />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B7355] hover:text-[#c97325] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </Motion.div>

        {/* Category Filters */}
        <Motion.div
          className="space-y-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <p className="text-xs font-semibold text-[#8B7355] uppercase tracking-wider">
            {t("gallery.filterByCategory")}
          </p>

          <Motion.div
            className="flex flex-wrap gap-2"
            variants={containerVariants}
          >
            {["All", ...categories].map((category) => {
              const isAll = category === "All";
              const isSelected = isAll
                ? activeCategory === "all"
                : activeCategory === category.toLowerCase();
              return (
                <Motion.button
                  key={category}
                  onClick={() => onCategoryChange(isAll ? "all" : category.toLowerCase())}
                  disabled={loading}
                  className={`px-4 py-1.5 md:px-5 md:py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isSelected
                      ? "bg-[#c97325] text-white shadow-md hover:shadow-lg"
                      : "bg-white text-[#8B7355] border border-[#D4B5A0] hover:border-[#c97325] hover:text-[#c97325]"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {getCategoryLabel(category)}
                </Motion.button>
              );
            })}
          </Motion.div>
        </Motion.div>

        {/* Active Filters Display */}
        {searchTerm && (
          <Motion.div
            className="mt-4 p-3 bg-[#FFF5E6] border-l-4 border-[#c97325] rounded-md text-sm text-[#8B7355]"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {t("gallery.searchingFor")}{" "}
            <span className="font-semibold text-[#c97325]">"{searchTerm}"</span>
          </Motion.div>
        )}
      </div>
    </Motion.div>
  );
};

export default GalleryFilters;
