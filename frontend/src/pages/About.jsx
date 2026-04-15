const About = () => {
  return (
    <>
      <section className="relative flex min-h-[70vh] items-center overflow-hidden px-6 py-20 md:px-16">
        <img
          src="/assets/gurudev.jpg"
          alt="Ashram"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="relative mx-auto w-full max-w-7xl">
          <h1 className="font-serif text-5xl leading-tight text-[#1c1c19] md:text-7xl">
            About Us
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-[#54433b]">
            Serving devotees through satsang, annadan, education, gau seva and
            selfless service.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-8 px-6 py-20 md:grid-cols-12 md:px-12">
        <div className="rounded-[2.5rem] bg-[#f6f3ee] p-10 md:col-span-7">
          <h2 className="font-serif text-4xl text-[#1c1c19]">Our Mission</h2>
          <p className="mt-5 text-lg leading-relaxed text-[#54433b]">
            To cultivate a community where spiritual wisdom is integrated into
            daily life while serving people through food, education, and
            shelter.
          </p>
        </div>
        <div className="rounded-[2.5rem] bg-[#DDBBAA]/40 p-10 md:col-span-5">
          <h2 className="font-serif text-3xl text-[#1c1c19]">Our Vision</h2>
          <ul className="mt-6 space-y-4 text-[#54433b]">
            <li>A sustainable and sacred ecosystem.</li>
            <li>A global network of seekers in harmony.</li>
            <li>A center of service rooted in timeless values.</li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default About;
