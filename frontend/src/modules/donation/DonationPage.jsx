import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DonationFlow from "./DonationFlow";
import DonorList from "./DonorList";
import { validateReferralCode } from "../../services/collectorApi";
import { API_BASE_URL } from "../../utils/api";

const DonationPage = () => {
  const { i18n } = useTranslation();
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
  }, [searchParams, donationHeads, loadingHeads]);

  const handleValidateReferralCode = async (code) => {
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
            "Referral code not recognized. You can still donate without it.",
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
  };

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
            data.error || "Invalid referral code. Please check and try again.",
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
      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-14 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <h1 className="font-serif text-[3.2rem] leading-tight text-[#1c1c19] md:text-[4.5rem]">
                Donate
              </h1>
              <p className="mt-5 max-w-3xl text-lg text-[#54433b]">
                Choose a cause close to your heart and make a difference.
              </p>
            </div>
          </div>

          {loadingHeads ? (
            <div className="py-16 text-center text-[#54433b]">
              Loading support levels...
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {donationHeads.map((head) => {
                const selected = selectedCause?._id === head._id;
                return (
                  <button
                    key={head._id}
                    type="button"
                    onClick={() => handleCauseSelect(head)}
                    className={`group rounded-4xl p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_42px_rgba(60,47,47,0.18)] ${
                      selected
                        ? "bg-linear-to-br from-[#904819] to-[#af602f] text-white shadow-[0_16px_42px_rgba(96,52,24,0.35)]"
                        : "bg-white text-[#1c1c19] shadow-[0_12px_40px_rgba(60,47,47,0.06)]"
                    }`}
                  >
                    <div className="mb-4 h-40 overflow-hidden rounded-3xl bg-[#f6f3ee]">
                      {head.imageUrl && !imageErrors[head._id] ? (
                        <img
                          src={head.imageUrl}
                          alt={head.name}
                          onError={() => handleImageError(head._id)}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm opacity-70">
                          Cause Image
                        </div>
                      )}
                    </div>
                    <h3
                      className={`font-serif text-2xl transition-colors duration-300 ${
                        selected ? "text-white" : "group-hover:text-[#7d3c14]"
                      }`}
                    >
                      {head.name}
                    </h3>
                    <p
                      className={`mt-2 text-sm transition-colors duration-300 ${
                        selected ? "text-white/80" : "text-[#54433b] group-hover:text-[#3f312a]"
                      }`}
                    >
                      {head.description || "Support this seva initiative."}
                    </p>
                    {head.minAmount ? (
                      <p
                        className={`mt-3 text-xs transition-colors duration-300 ${
                          selected ? "text-white/80" : "text-[#73594b] group-hover:text-[#5c463a]"
                        }`}
                      >
                        Min ₹{Number(head.minAmount).toLocaleString("en-IN")}
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
            <div className="mt-8 rounded-2xl bg-green-50 p-4 text-green-700">
              Referred by{" "}
              <span className="font-semibold">
                {referralData.collectorName}
              </span>
              <button
                onClick={handleClearReferral}
                className="ml-3 underline"
                type="button"
              >
                Clear
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
                Have a referral code?
              </p>
              <div className="flex flex-wrap gap-2">
                <input
                  type="text"
                  value={manualReferralInput}
                  onChange={(event) =>
                    setManualReferralInput(event.target.value.toUpperCase())
                  }
                  placeholder="Enter referral code"
                  maxLength={9}
                  className="min-w-55 flex-1 rounded-xl bg-white px-4 py-3 outline-none focus:ring-1 focus:ring-[#904819]/40"
                />
                <button
                  type="button"
                  onClick={handleManualReferralSubmit}
                  disabled={
                    !manualReferralInput.trim() || manualReferralLoading
                  }
                  className="rounded-full bg-[#904819] px-6 py-3 text-white disabled:opacity-50"
                >
                  {manualReferralLoading ? "Validating..." : "Apply"}
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
              Select a support level to continue to secure contribution.
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default DonationPage;
