import { ProcurementRecord } from "@/services/Api";

export const formatRecordCurrency = (record: ProcurementRecord): string => {
  const value = record.value;
  const currency = record.currency;

  if (!value || !currency) {
    return " - ";
  }

  // SUGGESTION: Remove instances from the currency field such as "GBP/day"
  const [isoCountryCode, period] = record.currency.split("/");

  if (!value || !isoCountryCode) {
    return " - ";
  }

  // SUGGESTION: We'd look to implement a proper localisation strategy here
  const formattedValue = Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: isoCountryCode,
  }).format(value);

  const formattedAmount = `${isoCountryCode} ${formattedValue}`;

  return period ? formattedAmount.concat(`/ per ${period}`) : formattedAmount;
};
