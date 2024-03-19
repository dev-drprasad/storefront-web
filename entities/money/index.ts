function format(value: number, locale = "en-IN", currency = "INR") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value / 1000000);
}

const Money = {
  format,
};

export default Money;
