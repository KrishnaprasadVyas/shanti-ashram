import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../utils/api";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const { t } = useTranslation();
  const navRef = useRef(null);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [liveLink, setLiveLink] = useState(null);
  const { user, isAuthenticated, logout } = useAuth();

  const navItems = [
    { path: "/", label: t("nav.home") },
    { path: "/about", label: t("nav.about") },
    { path: "/gurudev", label: t("nav.gurudev") },
    { path: "/activities", label: t("nav.activities") },
    { path: "/events", label: t("nav.events") },
    { path: "/gallery", label: t("nav.gallery") },
    { path: "/donate", label: t("nav.donate") },
    { path: "/contact", label: t("nav.contact") },
  ];

  useEffect(() => {
    const updateNavHeight = () => {
      if (!navRef.current) return;
      const height = Math.ceil(navRef.current.getBoundingClientRect().height);
      document.documentElement.style.setProperty(
        "--app-nav-height",
        `${height}px`,
      );
    };

    updateNavHeight();
    window.addEventListener("resize", updateNavHeight);
    return () => window.removeEventListener("resize", updateNavHeight);
  }, [isMenuOpen]);

  useEffect(() => {
    const fetchLiveLink = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/public/site-config/live-link`,
        );
        const data = await response.json();
        if (data?.isActive) {
          setLiveLink(data);
        } else {
          setLiveLink(null);
        }
      } catch {
        setLiveLink(null);
      }
    };

    fetchLiveLink();
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 z-50 w-full bg-[#fcf9f4]/90 backdrop-blur-xl shadow-xs border-b border-[#dac2b6]/30"
    >
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 py-3.5 sm:px-6 md:px-10">
        <Link
          to="/"
          className="font-serif text-lg sm:text-xl md:text-2xl italic text-[#904819] leading-tight flex flex-col items-start shrink-0 mr-4"
        >
          <span className="block font-medium">{t("nav.brandTitle1", "Swami Harichaitanya")}</span>
          <span className="block font-medium">{t("nav.brandTitle2", "Shanti Ashram Trust")}</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-5 xl:flex 2xl:gap-8">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={
                  active
                    ? "border-b-2 border-[#904819] pb-1 font-semibold text-[#904819] transition-all"
                    : "text-[#3C2F2F] opacity-80 transition-all duration-200 hover:text-[#904819] hover:opacity-100 font-medium"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2.5 xl:flex">
          <LanguageSwitcher />

          {liveLink?.isActive && (
            <a
              href={liveLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-red-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-red-700 shadow-xs"
            >
              {liveLink.label || t("nav.live", "Live")}
            </a>
          )}

          {isAuthenticated ? (
            <>
              {user?.role === "WEBSITE_ADMIN" ||
              user?.role === "SYSTEM_ADMIN" ? (
                <Link
                  to="/admin"
                  className="rounded-full border border-[#dac2b6]/60 bg-white px-4 py-2 text-xs font-semibold text-[#904819] hover:bg-[#f6f3ee] transition-colors"
                >
                  {t("nav.adminPanel", "Admin")}
                </Link>
              ) : null}
              <Link
                to="/my-donations"
                className="rounded-full border border-[#dac2b6]/60 bg-white px-4 py-2 text-xs font-semibold text-[#904819] hover:bg-[#f6f3ee] transition-colors"
              >
                {t("nav.myDonations", "My Donations")}
              </Link>
              <button
                type="button"
                onClick={logout}
                className="rounded-full bg-[#f6f3ee] px-4 py-2 text-xs font-semibold text-[#3C2F2F] hover:bg-[#ebe8e3] transition-colors"
              >
                {t("nav.logout", "Logout")}
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-full border border-[#dac2b6]/60 bg-white px-4 py-2 text-xs font-semibold text-[#904819] hover:bg-[#f6f3ee] transition-colors"
            >
              {t("nav.login", "Login")}
            </Link>
          )}

          <Link
            to="/donate"
            className="rounded-full bg-linear-to-br from-[#904819] to-[#af602f] px-5 py-2.5 text-sm font-medium text-white shadow-xs transition-transform duration-200 hover:scale-[1.02]"
          >
            {t("nav.donate", "Donate")}
          </Link>
        </div>

        {/* Mobile & Tablet Header Controls (< xl) */}
        <div className="flex items-center gap-2 xl:hidden">
          <LanguageSwitcher />

          <Link
            to="/donate"
            className="rounded-full bg-linear-to-br from-[#904819] to-[#af602f] px-3.5 py-1.5 text-xs font-medium text-white shadow-xs"
          >
            {t("nav.donate", "Donate")}
          </Link>

          <button
            type="button"
            className="rounded-lg p-1.5 text-[#904819] hover:bg-[#f6f3ee] focus:outline-none"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Menu */}
      {isMenuOpen && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-[#dac2b6]/40 bg-[#fcf9f4] px-6 py-4 xl:hidden shadow-lg">
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-[#f6f3ee] font-semibold text-[#904819]"
                      : "text-[#3C2F2F] hover:bg-[#f6f3ee]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {liveLink?.isActive && (
              <a
                href={liveLink.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                {liveLink.label || t("nav.live", "Live")}
              </a>
            )}

            <div className="my-2 border-t border-[#dac2b6]/30" />

            {isAuthenticated ? (
              <>
                {user?.role === "WEBSITE_ADMIN" ||
                user?.role === "SYSTEM_ADMIN" ? (
                  <Link
                    to="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-xl px-4 py-2.5 text-sm font-medium text-[#904819] hover:bg-[#f6f3ee]"
                  >
                    {t("nav.adminPanel", "Admin")}
                  </Link>
                ) : null}
                <Link
                  to="/my-donations"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl px-4 py-2.5 text-sm font-medium text-[#904819] hover:bg-[#f6f3ee]"
                >
                  {t("nav.myDonations", "My Donations")}
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="rounded-xl px-4 py-2.5 text-left text-sm font-medium text-[#3C2F2F] hover:bg-[#f6f3ee]"
                >
                  {t("nav.logout", "Logout")}
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-medium text-[#904819] hover:bg-[#f6f3ee]"
              >
                {t("nav.login", "Login")}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
