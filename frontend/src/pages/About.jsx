import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className="relative flex min-h-[50vh] items-center overflow-hidden px-6 pt-10 pb-16 md:pt-12 md:pb-20 md:px-16">
        <img
          src="/assets/gurudev.jpg"
          alt="Ashram"
          className="absolute inset-0 h-full w-full object-cover opacity-20 pointer-events-none"
        />
        <div className="relative mx-auto w-full max-w-7xl">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl leading-tight text-[#1c1c19]">
            {t("about.title")}
          </h1>
          <p className="mt-4 max-w-3xl text-base md:text-xl text-[#54433b]">
            {t("about.subtitle")}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-8 px-6 py-12 md:py-16 md:grid-cols-12 md:px-12">
        <div className="rounded-3xl bg-[#f6f3ee] p-8 md:p-10 md:col-span-7">
          <h2 className="font-serif text-3xl md:text-4xl text-[#1c1c19]">
            {t("about.missionTitle")}
          </h2>
          <p className="mt-4 text-base md:text-lg leading-relaxed text-[#54433b]">
            {t("about.missionText")}
          </p>
        </div>
        <div className="rounded-3xl bg-[#DDBBAA]/30 p-8 md:p-10 md:col-span-5">
          <h2 className="font-serif text-2xl md:text-3xl text-[#1c1c19]">
            {t("about.visionTitle")}
          </h2>
          <ul className="mt-4 space-y-3 text-sm md:text-base text-[#54433b]">
            <li className="flex items-start gap-2">
              <span className="text-[#904819]">•</span>
              <span>{t("about.vision1")}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#904819]">•</span>
              <span>{t("about.vision2")}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#904819]">•</span>
              <span>{t("about.vision3")}</span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default About;
