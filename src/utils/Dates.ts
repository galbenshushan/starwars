import { format, parseISO } from "date-fns";

const convertToFnsFormat = (currentFormat: string) => {
  return currentFormat.replace(/D/g, "d").replace(/Y/g, "y");
};

export const getDateDisplayValue = (value: string, formatString: string) => {
    if (!value || value === "Invalid date") {
      return null;
    }
    const date = parseISO(value);
    if (isNaN(date.getTime())) {
      return value;
    }
    const fnsFormatString = convertToFnsFormat(formatString);
    return format(date, fnsFormatString);
  };