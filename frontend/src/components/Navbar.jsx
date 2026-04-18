import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../utils/api";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const navRef = useRef(null);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [liveLink, setLiveLink] = useState(null);
  const { user, isAuthenticated, logout } = useAuth();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/gurudev", label: "Gurudev" },
    { path: "/activities", label: "Activities" },
    { path: "/events", label: "Events" },
    { path: "/gallery", label: "Gallery" },
    { path: "/donate", label: "Donate" },
    { path: "/contact", label: "Contact" },
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
      className="fixed top-0 z-50 w-full bg-[#fcf9f4]/80 backdrop-blur-xl shadow-sm"
    >
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-5 md:px-10">
        <Link to="/" className="font-serif text-2xl italic text-[#904819]">
          Shanti Ashram
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={
                  active
                    ? "border-b-2 border-[#904819] pb-1 font-semibold text-[#904819]"
                    : "text-[#3C2F2F] opacity-80 transition-all duration-300 hover:text-[#904819] hover:opacity-100"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />

          {liveLink?.isActive && (
            <a
              href={liveLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              {liveLink.label || "Live"}
            </a>
          )}

          {isAuthenticated ? (
            <>
              {user?.role === "WEBSITE_ADMIN" ||
              user?.role === "SYSTEM_ADMIN" ? (
                <Link
                  to="/admin"
                  className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#904819]"
                >
                  Admin
                </Link>
              ) : null}
              <Link
                to="/my-donations"
                className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#904819]"
              >
                My Donations
              </Link>
              <button
                type="button"
                onClick={logout}
                className="rounded-full bg-[#f6f3ee] px-5 py-2 text-sm font-semibold text-[#3C2F2F]"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#904819]"
            >
              Login
            </Link>
          )}

          <Link
            to="/donate"
            className="rounded-full bg-linear-to-br from-[#904819] to-[#af602f] px-6 py-3 font-medium text-white"
          >
            Donate
          </Link>
        </div>

        <button
          type="button"
          className="text-[#904819] md:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <svg
            className="h-7 w-7"
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

      {isMenuOpen && (
        <div className="border-t border-[#dac2b6]/40 bg-[#fcf9f4] px-6 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-[#3C2F2F] hover:bg-[#f6f3ee]"
              >
                {item.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                <Link
                  to="/my-donations"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-[#3C2F2F] hover:bg-[#f6f3ee]"
                >
                  My Donations
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="rounded-xl px-4 py-3 text-left text-[#3C2F2F] hover:bg-[#f6f3ee]"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-[#3C2F2F] hover:bg-[#f6f3ee]"
              >
                Login
              </Link>
            )}

            <LanguageSwitcher variant="mobile" />

            <Link
              to="/donate"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-full bg-linear-to-br from-[#904819] to-[#af602f] px-6 py-3 text-center font-medium text-white"
            >
              Donate
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
