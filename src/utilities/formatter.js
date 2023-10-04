let IDRCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

function getMonthName(monthNumber) {
  if (monthNumber == 0) {
    return "";
  }
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString("id-ID", { month: "long" });
}

export { IDRCurrency, getMonthName };
