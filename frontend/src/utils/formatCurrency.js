function formatCurrency(amount) {
  if (typeof amount !== "number") {
    return "PKR 0";
  }

  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default formatCurrency;