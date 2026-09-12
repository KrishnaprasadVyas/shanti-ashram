import { useEffect, useRef, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DonationFlow from "./DonationFlow";
import DonorList from "./DonorList";
import { validateReferralCode } from "../../services/collectorApi";
import { API_BASE_URL } from "../../utils/api";

const DonationPage = () => {
  const { t, i18n } = useTranslation();
  const donationFlowRef = useRef(null);
  const [searchParams] = useSearchParams();

  const [selectedCause, setSelectedCause] = useState(null);
  const [donationHeads, setDonationHeads] = useState([]);
  const [loadingHeads, setLoadingHeads] = useState(true);
  const [imageErrors, setImageErrors] = useState({});

  const [prefillAmount, setPrefillAmount] = useState(null);
  const [manualReferralInput, setManualReferralInput] = useState("");
  const [manualReferralLoading, setManualReferralLoading] = useState(false);

  const [referralData, setReferralData] = useState({
    code: null,
    collectorName: null,
    isValid: false,
    isLoading: false,
    error: null,
  });

  const getLocalizedCauseName = (name) => {
    if (!name) return "";
    const n = name.trim().toLowerCase();
    if (n.includes("annadan") || n.includes("anna") || n.includes("food")) {
      return t("donation.causes.annadanSeva", name);
    }
    if (n.includes("gau") || n.includes("cow")) {
      return t("donation.causes.gauSeva", name);
    }
    if (n.includes("education") || n.includes("gurukul") || n.includes("school")) {
      return t("donation.causes.educationSupport", name);
    }
    if (n.includes("medical") || n.includes("health")) {
      return t("donation.causes.medicalRelief", name);
    }
    if (n.includes("nirman") || n.includes("construction") || n.includes("ashram nirman")) {
      return t("donation.causes.ashramNirman", name);
    }
    if (n.includes("general")) {
      return t("donation.causes.generalSeva", name);
    }
    return name;
  };

  const getLocalizedCauseDesc = (name, desc) => {
    if (!name) return desc || "";
    const n = name.trim().toLowerCase();
    if (n.includes("annadan") || n.includes("anna") || n.includes("food")) {
      return t("donation.causes.annadanSevaDesc", desc);
    }
    if (n.includes("gau") || n.includes("cow")) {
      return t("donation.causes.gauSevaDesc", desc);
    }
    if (n.includes("education") || n.includes("gurukul") || n.includes("school")) {
      return t("donation.causes.educationSupportDesc", desc);
    }
    if (n.includes("medical") || n.includes("health")) {
      return t("donation.causes.medicalReliefDesc", desc);
    }
    if (n.includes("nirman") || n.includes("construction") || n.includes("ashram nirman")) {
      return t("donation.causes.ashramNirmanDesc", desc);
    }
    if (n.includes("general")) {
      return t("donation.causes.generalSevaDesc", desc);
    }
    return desc || "";
  };

  const handleValidateReferralCode = useCallback(async (code) => {
    setReferralData((prev) => ({
      ...prev,
      code,
      isLoading: true,
      error: null,
    }));

    try {
      const data = await validateReferralCode(code);
      if (data.valid && data.collectorName) {
        setReferralData({
          code,
          collectorName: data.collectorName,
          isValid: true,
          isLoading: false,
          error: null,
        });
      } else {
        setReferralData({
          code: null,
          collectorName: null,
          isValid: false,
          isLoading: false,
          error:
            data.error ||
            t("donation.step1.referralNotFound"),
        });
      }
    } catch {
      setReferralData({
        code: null,
        collectorName: null,
        isValid: false,
        isLoading: false,
        error: null,
      });
    }
  }, [t]);

  useEffect(() => {
    const fetchDonationHeads = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/public/donation-heads?lang=${i18n.language || "en"}`,
        );
        const data = await response.json();
        if (data?.success) {
          setDonationHeads(data.data || []);
        } else {
          setDonationHeads([]);
        }
      } catch {
        setDonationHeads([]);
      } finally {
        setLoadingHeads(false);
      }
    };

    fetchDonationHeads();
  }, [i18n.language]);

  useEffect(() => {
    if (loadingHeads) return;

    const refCode = searchParams.get("ref");
    const causeName = searchParams.get("cause");
    const amount = searchParams.get("amount");
    const quickDonate = searchParams.get("quick");

    if (refCode) {
      handleValidateReferralCode(refCode);
    }

    if (causeName) {
      const matchedCause = donationHeads.find(
        (head) => head.name?.toLowerCase() === causeName.toLowerCase(),
      );
      if (matchedCause) setSelectedCause(matchedCause);
    } else if (quickDonate === "true") {
      const defaultCause = donationHeads.find((head) =>
        ["general seva", "general"].includes((head.name || "").toLowerCase()),
      );
      if (defaultCause) setSelectedCause(defaultCause);
    }

    if (amount) {
      const parsedAmount = Number.parseInt(amount, 10);
      if (!Number.isNaN(parsedAmount) && parsedAmount > 0) {
        setPrefillAmount(parsedAmount);
      }
    }

    if (refCode || causeName || quickDonate === "true") {
      setTimeout(() => {
        donationFlowRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 250);
    }
  }, [searchParams, donationHeads, loadingHeads, handleValidateReferralCode]);

  const handleManualReferralSubmit = async () => {
    const code = manualReferralInput.trim().toUpperCase();
    if (!code) return;

    setManualReferralLoading(true);
    try {
      const data = await validateReferralCode(code);
      if (data.valid && data.collectorName) {
        setReferralData({
          code,
          collectorName: data.collectorName,
          isValid: true,
          isLoading: false,
          error: null,
        });
        setManualReferralInput("");
      } else {
        setReferralData((prev) => ({
          ...prev,
          error:
            data.error || t("donation.step1.referralNotFound"),
        }));
      }
    } catch {
      setReferralData((prev) => ({
        ...prev,
        error: "Failed to validate referral code. Please try again.",
      }));
    } finally {
      setManualReferralLoading(false);
    }
  };

  const handleClearReferral = () => {
    setReferralData({
      code: null,
      collectorName: null,
      isValid: false,
      isLoading: false,
      error: null,
    });
    setManualReferralInput("");
  };

  const handleCauseSelect = (head) => {
    setSelectedCause(head);
    setTimeout(() => {
      donationFlowRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 200);
  };

  const handleImageError = (headId) => {
    setImageErrors((prev) => ({ ...prev, [headId]: true }));
  };

  return (
    <>
      <section className="px-6 pt-8 pb-16 md:pt-10 md:pb-20 md:px-12">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl leading-tight text-[#1c1c19]">
                {t("donation.pageTitle")}
              </h1>
              <p className="mt-4 max-w-3xl text-base md:text-lg text-[#54433b]">
                {t("donation.pageSubtitle")}
              </p>
            </div>
          </div>

          {loadingHeads ? (
            <div className="py-16 text-center text-[#54433b]">
              {t("donation.loadingCauses")}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {donationHeads.map((head) => {
                const selected = selectedCause?._id === head._id;
                const localizedName = getLocalizedCauseName(head.name);
                const localizedDesc = getLocalizedCauseDesc(head.name, head.description);

                return (
                  <button
                    key={head._id}
                    type="button"
                    onClick={() => handleCauseSelect(head)}
                    className={`group rounded-3xl p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border ${
                      selected
                        ? "bg-linear-to-br from-[#904819] to-[#af602f] text-white shadow-xl border-[#904819] ring-2 ring-[#af602f]/40"
                        : "bg-white text-[#1c1c19] border-[#ebe5dc] shadow-xs hover:border-[#d9a574]"
                    }`}
                  >
                    <div className="mb-4 h-40 overflow-hidden rounded-2xl bg-[#f6f3ee]">
                      {head.imageUrl && !imageErrors[head._id] ? (
                        <img
                          src={head.imageUrl}
                          alt={localizedName}
                          onError={() => handleImageError(head._id)}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm opacity-70">
                          {t("donation.causeImage")}
                        </div>
                      )}
                    </div>

                    {selected && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/20 text-white mb-2">
                        ✓ {t("donation.selectedBadge")}
                      </span>
                    )}

                    <h3
                      className={`font-serif text-2xl transition-colors duration-300 ${
                        selected ? "text-white" : "group-hover:text-[#7d3c14]"
                      }`}
                    >
                      {localizedName}
                    </h3>
                    <p
                      className={`mt-2 text-sm transition-colors duration-300 ${
                        selected ? "text-white/85" : "text-[#54433b] group-hover:text-[#3f312a]"
                      }`}
                    >
                      {localizedDesc}
                    </p>
                    {head.minAmount ? (
                      <p
                        className={`mt-3 text-xs font-medium transition-colors duration-300 ${
                          selected ? "text-white/90" : "text-[#73594b] group-hover:text-[#5c463a]"
                        }`}
                      >
                        {t("donation.minContribution")} ₹{Number(head.minAmount).toLocaleString(i18n.language || "en-IN")}
                      </p>
                    ) : null}
                  </button>
                );
              })}
            </div>
          )}

          <div className="mt-12">
            <DonorList />
          </div>

          {referralData.isValid && referralData.collectorName && (
            <div className="mt-8 rounded-2xl bg-green-50 p-4 text-green-700 flex items-center justify-between">
              <div>
                {t("donation.referredBy")}{" "}
                <span className="font-semibold">
                  {referralData.collectorName}
                </span>
              </div>
              <button
                onClick={handleClearReferral}
                className="ml-3 underline font-medium cursor-pointer"
                type="button"
              >
                {t("donation.clear")}
              </button>
            </div>
          )}

          {referralData.error && !referralData.isValid && (
            <div className="mt-8 rounded-2xl bg-amber-50 p-4 text-amber-700">
              {referralData.error}
            </div>
          )}

          {!referralData.isValid && (
            <div className="mt-8 rounded-3xl bg-[#f6f3ee] p-5">
              <p className="mb-3 text-sm font-medium text-[#3C2F2F]">
                {t("donation.haveReferral")}
              </p>
              <div className="flex flex-wrap gap-2">
                <input
                  type="text"
                  value={manualReferralInput}
                  onChange={(event) =>
                    setManualReferralInput(event.target.value.toUpperCase())
                  }
                  placeholder={t("donation.enterReferral")}
                  maxLength={9}
                  className="min-w-55 flex-1 rounded-xl bg-white px-4 py-3 outline-none focus:ring-1 focus:ring-[#904819]/40 text-sm"
                />
                <button
                  type="button"
                  onClick={handleManualReferralSubmit}
                  disabled={
                    !manualReferralInput.trim() || manualReferralLoading
                  }
                  className="rounded-full bg-[#904819] px-6 py-3 text-white text-sm font-medium disabled:opacity-50 hover:bg-[#7d3c14] transition cursor-pointer"
                >
                  {manualReferralLoading ? t("donation.validating") : t("donation.apply")}
                </button>
              </div>
            </div>
          )}

          {selectedCause ? (
            <div ref={donationFlowRef} className="mt-12">
              <DonationFlow
                selectedCause={selectedCause}
                referralData={referralData}
                prefillAmount={prefillAmount}
              />
            </div>
          ) : (
            <div className="mt-12 rounded-3xl bg-[#ebe8e3] p-8 text-center text-[#54433b]">
              {t("donation.selectCauseNotice")}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default DonationPage;
