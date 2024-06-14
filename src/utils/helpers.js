function numberToCurrency(number, currency = "TRY") {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(number);
}

export { numberToCurrency };
