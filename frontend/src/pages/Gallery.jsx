import { useMemo, useState } from "react";
import { useGallery } from "../context/GalleryContext";

const Gallery = () => {
  const { getVisibleItems, getCategories } = useGallery();
  const images = getVisibleItems();
  const categories = ["all", ...getCategories()];
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(() => {
    if (activeCategory === "all") return images;
    return images.filter((image) => image.category === activeCategory);
  }, [activeCategory, images]);

  return (
    <>
      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-screen-2xl">
          <h1 className="font-serif text-5xl leading-tight text-[#1c1c19] md:text-7xl">
            Gallery
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-[#54433b]">
            Capturing beautiful moments from our events and daily life at the
            ashram.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-6 py-2 text-sm uppercase tracking-wider transition-colors ${
                  activeCategory === category
                    ? "bg-[#904819] text-white"
                    : "bg-[#ebe8e3] text-[#854f10] hover:bg-[#dac2b6]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-12">
            {filtered.map((image, index) => (
              <figure
                key={image.id}
                className={`overflow-hidden rounded-4xl bg-white shadow-[0_12px_40px_rgba(60,47,47,0.06)] ${
                  index % 5 === 0 ? "md:col-span-8" : "md:col-span-4"
                }`}
              >
                <img
                  src={image.src}
                  alt={image.title || "Ashram gallery image"}
                  className="h-full w-full object-cover"
                />
                <figcaption className="p-4">
                  <p className="font-serif text-lg text-[#1c1c19]">
                    {image.title || "Ashram Moment"}
                  </p>
                  <p className="text-sm text-[#73594b]">{image.category}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Gallery;
