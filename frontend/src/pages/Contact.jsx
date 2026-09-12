import { useState } from "react";
import { useTranslation } from "react-i18next";
import { validateEmail, validatePhone } from "../utils/helpers";
import { API_BASE_URL, parseJsonResponse } from "../utils/api";

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = t("contact.nameRequired");
    if (!formData.email.trim()) {
      nextErrors.email = t("contact.emailRequired");
    } else if (!validateEmail(formData.email)) {
      nextErrors.email = t("contact.emailInvalid");
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = t("contact.phoneRequired");
    } else if (!validatePhone(formData.phone)) {
      nextErrors.phone = t("contact.phoneInvalid");
    }

    if (!formData.subject.trim()) nextErrors.subject = t("contact.subjectRequired");
    if (!formData.message.trim()) nextErrors.message = t("contact.messageRequired");

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await parseJsonResponse(response);
      if (!response.ok)
        throw new Error(data.message || "Failed to send message");

      setSubmitSuccess(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      alert(error.message || "Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="px-6 pt-8 pb-16 md:pt-10 md:pb-20 md:px-12">
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl text-[#904819]">
              {t("nav.contact")}
            </h1>
            <p className="mt-4 text-base md:text-lg text-[#54433b]">
              {t("contact.getInTouch")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-[#ebe5dc] md:col-span-7 md:p-10">
            {submitSuccess && (
              <div className="mb-6 rounded-xl bg-green-100 p-4 text-green-700 text-sm">
                {t("contact.successMessage")}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#73594b]">
                    {t("contact.fullName")}
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-[#ebe8e3]/60 px-4 py-3 outline-none focus:ring-1 focus:ring-[#904819]/40 text-sm"
                    placeholder={t("contact.namePlaceholder")}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#73594b]">
                    {t("contact.emailLabel")}
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-[#ebe8e3]/60 px-4 py-3 outline-none focus:ring-1 focus:ring-[#904819]/40 text-sm"
                    placeholder={t("contact.emailPlaceholder")}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#73594b]">
                    {t("contact.phoneLabel")}
                  </label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-[#ebe8e3]/60 px-4 py-3 outline-none focus:ring-1 focus:ring-[#904819]/40 text-sm"
                    placeholder={t("contact.phonePlaceholder")}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#73594b]">
                    {t("contact.subject")}
                  </label>
                  <input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-[#ebe8e3]/60 px-4 py-3 outline-none focus:ring-1 focus:ring-[#904819]/40 text-sm"
                    placeholder={t("contact.subjectPlaceholder")}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.subject}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#73594b]">
                  {t("contact.message")}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full rounded-xl bg-[#ebe8e3]/60 px-4 py-3 outline-none focus:ring-1 focus:ring-[#904819]/40 text-sm"
                  placeholder={t("contact.messagePlaceholder")}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-600">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-linear-to-br from-[#904819] to-[#af602f] px-8 py-3.5 font-medium text-white text-sm hover:shadow-md transition cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? t("contact.sending") : t("contact.sendButton")}
              </button>
            </form>
          </div>

          <div className="space-y-6 md:col-span-5">
            <div className="rounded-3xl bg-[#f6f3ee] p-6 md:p-8">
              <h3 className="font-serif text-2xl text-[#1c1c19]">
                {t("contact.contactInfo")}
              </h3>
              <p className="mt-4 text-sm text-[#54433b] leading-relaxed">
                {t("home.ashramAddress1")}
              </p>
              <p className="mt-3 text-sm text-[#54433b]">
                <strong className="text-[#904819]">{t("contact.phoneTitle")}:</strong> 9158740007, 9834151577
              </p>
              <p className="mt-2 text-sm text-[#54433b]">
                <strong className="text-[#904819]">{t("contact.emailTitle")}:</strong> info@shrigurudevashram.org
              </p>
            </div>

            <div className="h-72 overflow-hidden rounded-3xl border border-[#ebe5dc]">
              <iframe
                src="https://www.google.com/maps?q=Shri+Gurudev+Ashram+Palaskhed+Sapkal+Chikhli+Buldhana+Maharashtra+443001&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Ashram Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
