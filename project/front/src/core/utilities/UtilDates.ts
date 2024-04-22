import moment from "moment";

export class UtilDates {
  public static formatDateMoment(date: string, formatoCustom?: string) {
    let format = "MM/DD/YYYY";
    if (formatoCustom) {
      format = formatoCustom;
    }
    let formatDate = "-";
    if (
      date !== "" &&
      date !== "-" &&
      date !== null &&
      typeof date !== "undefined" &&
      moment(date).format(format) !== "Invalid date"
    ) {
      formatDate = moment(date).format(format);
    }

    return formatDate;
  }

  public static formatDateToString(date: Date, formatoCustom?: string): string {
    let dateFormat = "";
    let format = "MM/DD/YYYY";
    if (formatoCustom) {
      format = formatoCustom;
    }
    dateFormat = moment(date).format(format);

    return dateFormat;
  }
}
