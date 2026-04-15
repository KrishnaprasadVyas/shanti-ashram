import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 w-full rounded-t-[3rem] bg-[#f6f3ee]">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-12 px-10 py-16 md:grid-cols-3">
        <div>
          <h4 className="mb-5 font-serif text-xl text-[#3C2F2F]">
            Shanti Ashram
          </h4>
          <p className="max-w-sm text-sm leading-relaxed text-[#3C2F2F]/70">
            Curation for the soul. A sacred space dedicated to inner stillness,
            compassionate action, and collective spiritual growth.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href="https://www.facebook.com/SwamiHarichaitanyanandS/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#904819] hover:opacity-80"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/swami_harichaitanyaji_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#904819] hover:opacity-80"
            >
              Instagram
            </a>
            <a
              href="https://www.youtube.com/@shrigurudevashram"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#904819] hover:opacity-80"
            >
              YouTube
            </a>
          </div>
        </div>

        <div>
          <h5 className="mb-5 text-sm font-semibold uppercase tracking-widest text-[#904819]">
            Pathways
          </h5>
          <div className="space-y-3 text-[#3C2F2F]/70">
            <Link className="block hover:text-[#904819]" to="/about">
              About
            </Link>
            <Link className="block hover:text-[#904819]" to="/activities">
              Activities
            </Link>
            <Link className="block hover:text-[#904819]" to="/events">
              Events
            </Link>
            <Link className="block hover:text-[#904819]" to="/gallery">
              Gallery
            </Link>
            <Link className="block hover:text-[#904819]" to="/donate">
              Donate
            </Link>
            <Link className="block hover:text-[#904819]" to="/contact">
              Contact
            </Link>
          </div>
        </div>

        <div>
          <h5 className="mb-5 text-sm font-semibold uppercase tracking-widest text-[#904819]">
            Contact
          </h5>
          <p className="mb-2 text-[#3C2F2F]/70">
            Palaskhed Sapkal, Chikhli, Buldhana, Maharashtra
          </p>
          <p className="mb-2 text-[#3C2F2F]/70">9158740007, 9834151577</p>
          <a
            href="mailto:info@shrigurudevashram.org"
            className="block text-[#904819] hover:opacity-80"
          >
            info@shrigurudevashram.org
          </a>
          <a
            href="mailto:info@shantiashramtrust.org"
            className="block text-[#904819] hover:opacity-80"
          >
            info@shantiashramtrust.org
          </a>
        </div>
      </div>
      <div className="pb-10 text-center text-xs uppercase tracking-widest text-[#3C2F2F]/60">
        © {currentYear} Shanti Ashram. Curation for the Soul.
      </div>
    </footer>
  );
};

export default Footer;
