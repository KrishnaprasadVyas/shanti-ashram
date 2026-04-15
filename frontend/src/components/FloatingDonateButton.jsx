import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HeartIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
  </svg>
);

const FloatingDonateButton = () => {
  const { t } = useTranslation();
  const location = useLocation();

  // Hide on donation page since user is already there
  if (location.pathname === "/donate") {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        to="/donate"
        className="relative inline-flex items-center gap-3 rounded-full bg-linear-to-br from-[#904819] to-[#af602f] px-7 py-3.5 text-white shadow-[0_12px_32px_rgba(60,47,47,0.22)] transition-transform duration-200 hover:scale-[1.02]"
        aria-label="Donate Now"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-white/18">
          <HeartIcon className="h-4.5 w-4.5" />
        </span>
        <span className="text-lg font-semibold leading-none">
          {t("floatingDonate.donate")}
        </span>
      </Link>
      <span className="pointer-events-none absolute -right-1 top-0 inline-flex h-4.5 w-4.5 rounded-full border border-[#ede3d5] bg-[#d89a18]" />
      <span className="pointer-events-none absolute -right-2 top-[-0.35rem] inline-flex h-7 w-7 rounded-full bg-[#ede3d5]/70" />
    </div>
  );
};

export default FloatingDonateButton;
