let IDRCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

function OtherCurrency(amount, currency = "IDR") {
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });

  return currencyFormatter.format(amount);
}

function getMonthName(monthNumber) {
  if (monthNumber == 0) {
    return "";
  }
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString("id-ID", { month: "long" });
}

export { IDRCurrency, getMonthName, OtherCurrency };
