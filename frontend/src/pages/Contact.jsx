import { useState } from "react";
import { validateEmail, validatePhone } from "../utils/helpers";
import { API_BASE_URL, parseJsonResponse } from "../utils/api";

const Contact = () => {
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

    if (!formData.name.trim()) nextErrors.name = "Name is required";
    if (!formData.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      nextErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = "Phone is required";
    } else if (!validatePhone(formData.phone)) {
      nextErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.subject.trim()) nextErrors.subject = "Subject is required";
    if (!formData.message.trim()) nextErrors.message = "Message is required";

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
    <section className="px-6 py-20 md:px-12">
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-14 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <h1 className="font-serif text-5xl text-[#904819] md:text-7xl">
              Contact Us
            </h1>
            <p className="mt-4 text-xl text-[#54433b]">
              Get in touch with us for any questions, guidance, or support.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="rounded-[2.5rem] bg-white p-8 shadow-[0_12px_40px_rgba(60,47,47,0.06)] md:col-span-7 md:p-12">
            {submitSuccess && (
              <div className="mb-6 rounded-xl bg-green-100 p-4 text-green-700">
                Message sent successfully.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm uppercase tracking-widest text-[#73594b]">
                    Full Name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-[#ebe8e3] px-5 py-4 outline-none focus:ring-1 focus:ring-[#904819]/40"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm uppercase tracking-widest text-[#73594b]">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-[#ebe8e3] px-5 py-4 outline-none focus:ring-1 focus:ring-[#904819]/40"
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm uppercase tracking-widest text-[#73594b]">
                    Phone
                  </label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-[#ebe8e3] px-5 py-4 outline-none focus:ring-1 focus:ring-[#904819]/40"
                    placeholder="Phone number"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm uppercase tracking-widest text-[#73594b]">
                    Subject
                  </label>
                  <input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-[#ebe8e3] px-5 py-4 outline-none focus:ring-1 focus:ring-[#904819]/40"
                    placeholder="Subject"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.subject}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm uppercase tracking-widest text-[#73594b]">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full rounded-xl bg-[#ebe8e3] px-5 py-4 outline-none focus:ring-1 focus:ring-[#904819]/40"
                  placeholder="How may we assist your journey?"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-linear-to-br from-[#904819] to-[#af602f] px-10 py-4 font-medium text-white"
              >
                {isSubmitting ? "Sending..." : "Deliver Message"}
              </button>
            </form>
          </div>

          <div className="space-y-8 md:col-span-5">
            <div className="rounded-4xl bg-[#f6f3ee] p-8">
              <h3 className="font-serif text-3xl text-[#1c1c19]">
                Visit the Sanctuary
              </h3>
              <p className="mt-4 text-[#54433b]">
                Palaskhed Sapkal, Chikhli,
                <br />
                Buldhana, Maharashtra
              </p>
              <p className="mt-4 text-[#54433b]">9158740007, 9834151577</p>
              <p className="mt-4 text-[#54433b]">info@shrigurudevashram.org</p>
            </div>

            <div className="h-90 overflow-hidden rounded-4xl">
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
