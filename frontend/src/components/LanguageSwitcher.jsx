import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "English", flag: "EN" },
  { code: "hi", label: "हिन्दी", flag: "HI" },
  { code: "mr", label: "मराठी", flag: "MR" },
];

const LanguageSwitcher = ({ variant = "default" }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLang =
    languages.find((l) => l.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (code) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  // Compact variant for inline use
  if (variant === "compact") {
    return (
      <div className="flex items-center gap-1">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleChange(lang.code)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
              i18n.language === lang.code
                ? "bg-[#904819] text-white"
                : "bg-[#ebe8e3] text-[#73594b] hover:bg-[#dac2b6]"
            }`}
          >
            {lang.flag}
          </button>
        ))}
      </div>
    );
  }

  // Mobile variant — small globe icon with dropdown
  if (variant === "mobile") {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-11 w-full items-center justify-between rounded-xl bg-[#f6f3ee] px-4 text-[#3C2F2F]"
          aria-label="Select language"
        >
          <span className="flex items-center gap-2 text-sm font-medium">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-[#ebe8e3] text-[11px] font-semibold text-[#904819]">
              {currentLang.flag}
            </span>
            {currentLang.label}
          </span>
          <svg
            className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute right-0 z-50 mt-2 w-44 rounded-2xl border border-[#dac2b6]/40 bg-white py-2 shadow-[0_14px_30px_rgba(60,47,47,0.12)]">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleChange(lang.code)}
                className={`flex w-full items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                  i18n.language === lang.code
                    ? "bg-[#f6f3ee] font-semibold text-[#904819]"
                    : "text-[#54433b] hover:bg-[#f6f3ee]"
                }`}
              >
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[#ebe8e3] text-[10px] font-semibold text-[#904819]">
                  {lang.flag}
                </span>
                <span>{lang.label}</span>
                {i18n.language === lang.code && (
                  <svg
                    className="ml-auto h-4 w-4 text-[#904819]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border border-[#dac2b6]/50 bg-white px-3 py-2 text-sm font-medium text-[#3C2F2F] shadow-[0_8px_24px_rgba(60,47,47,0.08)] transition-colors hover:bg-[#f6f3ee]"
        aria-label="Select language"
      >
        <span className="grid h-6 w-6 place-items-center rounded-full bg-[#ebe8e3] text-[11px] font-semibold text-[#904819]">
          {currentLang.flag}
        </span>
        <svg
          className={`h-3 w-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-44 rounded-2xl border border-[#dac2b6]/40 bg-white py-2 shadow-[0_14px_30px_rgba(60,47,47,0.12)]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleChange(lang.code)}
              className={`flex w-full items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                i18n.language === lang.code
                  ? "bg-[#f6f3ee] font-semibold text-[#904819]"
                  : "text-[#54433b] hover:bg-[#f6f3ee]"
              }`}
            >
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[#ebe8e3] text-[10px] font-semibold text-[#904819]">
                {lang.flag}
              </span>
              <span>{lang.label}</span>
              {i18n.language === lang.code && (
                <svg
                  className="ml-auto h-4 w-4 text-[#904819]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
