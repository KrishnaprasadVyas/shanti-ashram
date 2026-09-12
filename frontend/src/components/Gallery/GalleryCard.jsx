import { motion as Motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const GalleryCard = ({ image, onClick, index, layout = "grid" }) => {
  const { i18n, t } = useTranslation();
  const [imageLoaded, setImageLoaded] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.05 },
    },
  };

  const getMasonryClass = (idx) => {
    const pattern = [
      "md:col-span-2 md:row-span-2",
      "md:col-span-1 md:row-span-1",
      "md:col-span-1 md:row-span-1",
      "md:col-span-2 md:row-span-1",
      "md:col-span-1 md:row-span-1",
      "md:col-span-1 md:row-span-1",
    ];
    return pattern[idx % pattern.length];
  };

  const containerClass =
    layout === "masonry"
      ? `${getMasonryClass(index)} overflow-hidden rounded-2xl`
      : "overflow-hidden rounded-2xl aspect-square";

  const getLocalizedText = (value) => {
    if (typeof value === "string") return value;
    if (value && typeof value === "object") {
      const lang = i18n.language?.startsWith("hi")
        ? "hi"
        : i18n.language?.startsWith("mr")
        ? "mr"
        : "en";
      return value[lang] || value.en || "";
    }
    return "";
  };

  const categoryName = typeof image.category === "string" 
    ? image.category 
    : getLocalizedText(image.category);
  const localizedCategory = categoryName 
    ? t(`activities.categories.${categoryName.toLowerCase()}`, categoryName)
    : "";

  return (
    <Motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4 }}
      className={containerClass}
    >
      <button
        onClick={onClick}
        className="group relative w-full h-full overflow-hidden bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#c97325] focus:ring-offset-2 rounded-2xl text-left"
      >
        {/* Image */}
        <img
          src={image.url || image.src}
          alt={getLocalizedText(image.altText) || getLocalizedText(image.title) || "Gallery image"}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#E8DDD0] to-[#D4B5A0] animate-pulse" />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
          {getLocalizedText(image.title) && (
            <h3 className="font-serif text-lg md:text-xl font-light leading-tight mb-1">
              {getLocalizedText(image.title)}
            </h3>
          )}
          
          {localizedCategory && (
            <p className="text-sm text-white/85 capitalize">
              {localizedCategory}
            </p>
          )}
        </div>

        {/* View icon */}
        <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
            />
          </svg>
        </div>
      </button>
    </Motion.div>
  );
};

export default GalleryCard;
