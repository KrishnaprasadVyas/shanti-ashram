import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SectionHeading from "../components/SectionHeading";
import TestimonialCard from "../components/TestimonialCard";
import { Loader2 } from "lucide-react";
import { API_BASE_URL, parseJsonResponse } from "../utils/api";

const Testimonials = () => {
  const { t } = useTranslation();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/public/testimonials`);
        const data = await parseJsonResponse(response);
        if (data.success) {
          setTestimonials(data.data || []);
        } else {
          setError(data.message || "Failed to load testimonials");
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError("Failed to load testimonials");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <>
      <section className="pt-8 pb-14 md:pt-10 md:pb-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title={t("testimonials.title")}
            subtitle={t("testimonials.subtitle")}
            center={true}
          />
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-600 text-sm">{error}</div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-12 text-gray-500 text-sm">
              {t("testimonials.subtitle")}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial._id || testimonial.id}
                  testimonial={testimonial}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Share Your Experience */}
      <section className="py-14 px-4 bg-amber-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-3">
            {t("testimonials.share")}
          </h2>
          <p className="text-base text-gray-700 mb-6 max-w-xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-3 bg-[#904819] text-white rounded-full hover:bg-[#7d3c14] transition-colors font-medium text-sm shadow-sm"
          >
            {t("nav.contact")}
          </Link>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
