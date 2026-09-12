// Utility helper functions

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatLocalizedDate = (dateString, language = 'en', options = {}) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return String(dateString);

  const localeMap = {
    en: 'en-IN',
    hi: 'hi-IN',
    mr: 'mr-IN',
  };
  const locale = localeMap[language] || 'en-IN';

  const defaultOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  try {
    return new Intl.DateTimeFormat(locale, { ...defaultOptions, ...options }).format(date);
  } catch {
    return date.toLocaleDateString(locale, { ...defaultOptions, ...options });
  }
};

export const formatLocalizedTime = (timeString, language = 'en') => {
  if (!timeString) return '';
  const str = String(timeString).trim();
  if (language === 'mr') {
    if (/all day/i.test(str)) return 'दिवसभर';
    return str.replace(/am/i, 'सकाळी').replace(/pm/i, 'सायंकाळी');
  }
  if (language === 'hi') {
    if (/all day/i.test(str)) return 'पूरे दिन';
    return str.replace(/am/i, 'प्रातः').replace(/pm/i, 'सायं');
  }
  return str;
};

export const formatDateTime = (dateString, timeString) => {
  return `${formatDate(dateString)} at ${timeString}`;
};


export const generateOrderId = () => {
  return `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`;
};

export const generateTransactionId = () => {
  return `TXN${Date.now()}${Math.floor(Math.random() * 10000)}`;
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[6-9]\d{9}$/;
  return re.test(phone);
};

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/**
 * Safely mask PAN or Aadhaar numbers for display
 * @param {string} idNumber - The ID number to mask
 * @param {string} idType - "PAN" or "Aadhaar"
 * @returns {string} Masked ID
 *
 * Examples:
 * - Aadhaar: "123456789012" → "**** **** 9012"
 * - PAN: "ABCDE1234F" → "******234F"
 */
export const maskGovtId = (idNumber, idType) => {
  try {
    if (!idNumber || typeof idNumber !== 'string') return '****';

    const id = idNumber.trim();
    if (id.length <= 4) return '****';

    const normalizedType = idType?.toUpperCase();

    if (normalizedType === 'AADHAAR') {
      // Aadhaar: Show last 4 digits with format "**** **** 1234"
      const last4 = id.slice(-4);
      return `**** **** ${last4}`;
    }

    if (normalizedType === 'PAN') {
      // PAN: Show last 4 characters with format "******1234"
      const last4 = id.slice(-4);
      return `******${last4}`;
    }

    // Default fallback: mask all but last 4
    return '****' + id.slice(-4);
  } catch (error) {
    console.error('maskGovtId error:', error);
    return '****';
  }
};

