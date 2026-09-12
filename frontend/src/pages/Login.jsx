/**
 * Login Page - Firebase Phone Authentication
 */

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SectionHeading from "../components/SectionHeading";
import { useAuth } from "../context/AuthContext";
import { signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase";
import { cleanupRecaptcha, resetRecaptcha, setupRecaptcha } from "../services/recaptcha";
import { API_BASE_URL, parseJsonResponse } from "../utils/api";

const COUNTRY_OPTIONS = [
  { value: "IN", label: "India", dialCode: "+91", length: 10 },
  { value: "US", label: "United States", dialCode: "+1", length: 10 },
  { value: "CA", label: "Canada", dialCode: "+1", length: 10 },
  { value: "GB", label: "United Kingdom", dialCode: "+44", length: 10 },
  { value: "AU", label: "Australia", dialCode: "+61", length: 9 },
  { value: "JP", label: "Japan", dialCode: "+81", length: 10 },
  { value: "AE", label: "United Arab Emirates", dialCode: "+971", length: 9 },
  { value: "DE", label: "Germany", dialCode: "+49", length: 11 },
  { value: "FR", label: "France", dialCode: "+33", length: 9 },
  { value: "SG", label: "Singapore", dialCode: "+65", length: 8 },
];

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone");
  const { login, getRedirectPath } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    return cleanupRecaptcha;
  }, []);

  const [country, setCountry] = useState(COUNTRY_OPTIONS[0]);
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const returnUrl = location.state?.from || null;

  const sendOTP = async (fullPhone) => {
    const appVerifier = await setupRecaptcha(auth, "recaptcha-container");
    try {
      const confirmation = await signInWithPhoneNumber(
        auth,
        fullPhone,
        appVerifier,
      );
      window.confirmationResult = confirmation;
    } catch (err) {
      resetRecaptcha();
      throw err;
    }
  };

  const getOtpErrorMessage = (err) => {
    if (err?.code === "auth/invalid-app-credential") {
      return "Phone auth is blocked for this origin. Verify Firebase Auth authorized domain and API key restrictions.";
    }
    return err?.message || "Failed to send OTP. Please try again.";
  };

  const handleCountryChange = (event) => {
    const selected = COUNTRY_OPTIONS.find(
      (opt) => opt.value === event.target.value,
    );
    if (selected) {
      setCountry(selected);
      setPhone("");
    }
  };

  const handlePhoneChange = (event) => {
    const digitsOnly = event.target.value.replace(/\D/g, "");
    setPhone(digitsOnly.slice(0, country.length));
    setError("");
  };

  const verifyOTP = async () => {
    if (!otp) {
      setError(t("login.enterOtpPrompt", "Enter the OTP"));
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await window.confirmationResult.confirm(otp);
      const user = result.user;
      const token = await user.getIdToken();

      const response = await fetch(
        `${API_BASE_URL}/auth/verify-firebase-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        },
      );

      const data = await parseJsonResponse(response);

      login(data.token, data.user);
      navigate(getRedirectPath(returnUrl));
    } catch (err) {
      console.error(err);
      setError(t("login.invalidOtp", "Invalid OTP. Please try again."));
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (phone.length !== country.length) {
      setError(t("login.validPhone", { length: country.length }));
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const fullMobile = `${country.dialCode}${phone}`;
      await sendOTP(fullMobile);
      setStep("otp");
    } catch (err) {
      setError(getOtpErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 px-4 bg-[#f3f0ea] min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-[#fffaf0] border border-[#d8c8a6] rounded-2xl shadow-[0_8px_24px_rgba(50,38,26,0.08)] p-6 sm:p-8">
        <SectionHeading
          title={t("login.title")}
          subtitle={t("login.enterPhone")}
          center={true}
          titleClassName="text-[#904819]"
        />

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}
        <div className="mt-6 space-y-4">
          {step === "phone" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <p className="mb-4 text-sm text-[#73594b] leading-relaxed">
                  {t("login.otpNotice", "We will send you an OTP on this mobile number.")}
                </p>
                <label className="block text-sm font-semibold text-[#4a3424] mb-2">
                  {t("login.phoneNumber")}
                </label>

                <div className="flex gap-2">
                  <select
                    value={country.value}
                    onChange={handleCountryChange}
                    disabled={isLoading}
                    className="w-36 px-2 py-2 border border-[#cdb894] bg-[#fffdf7] text-[#4a3424] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a6a4a]/40 text-sm"
                  >
                    {COUNTRY_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label} ({opt.dialCode})
                      </option>
                    ))}
                  </select>

                  <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder={t("login.phonePlaceholder", { length: country.length, defaultValue: `${country.length}-digit number` })}
                    disabled={isLoading}
                    className="flex-1 px-3 py-2 border border-[#cdb894] bg-[#fffdf7] text-[#4a3424] placeholder:text-[#9a8a76] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a6a4a]/40 text-sm"
                  />
                </div>
              </div>
              <div id="recaptcha-container" />

              <button
                type="submit"
                disabled={isLoading || phone.length !== country.length}
                className="w-full py-3 bg-[#6b3f1f] text-white font-semibold rounded-lg hover:bg-[#583218] disabled:opacity-60 transition-colors shadow-xs"
              >
                {isLoading ? t("login.sendingOtp") : t("login.sendOtp")}
              </button>
            </form>
          )}

          {step === "otp" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-[#4a3424]">
                  {t("login.enterOtp", "Enter OTP")}
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setStep("phone");
                    setOtp("");
                    setError("");
                  }}
                  className="text-xs text-[#904819] hover:underline"
                >
                  {t("login.changeNumber", "Change Number")}
                </button>
              </div>

              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder={t("login.enterOtpPlaceholder", "Enter 6-digit OTP")}
                disabled={isLoading}
                maxLength={6}
                className="w-full px-3 py-2.5 border border-[#cdb894] bg-[#fffdf7] text-[#4a3424] placeholder:text-[#9a8a76] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a6a4a]/40 text-center tracking-widest text-lg font-medium"
              />

              <button
                type="button"
                onClick={verifyOTP}
                disabled={isLoading || otp.length !== 6}
                className="w-full py-3 bg-[#6b3f1f] text-white font-semibold rounded-lg hover:bg-[#583218] disabled:opacity-60 transition-colors shadow-xs"
              >
                {isLoading ? t("login.verifying", "Verifying...") : t("login.verifyOtp", "Verify OTP")}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
