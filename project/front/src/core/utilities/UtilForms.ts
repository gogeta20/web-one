import { UtilHelper } from "@/core/utilities/UtilHelper";

export class UtilForms {
  public static verifyIDNumber(id: any): number {
    return Number.isNaN(Number.parseInt(id)) ? 0 : Number.parseInt(id);
  }

  public static verifyIDString(id: any): string {
    return id !== 0 ? String(id) : "";
  }

  public static emptyString(value: string | undefined): string {
    if (value == "" || value == undefined) {
      value = "-";
    }
    return value;
  }

  public static validateNIF(value: string) {
    const whatIs = UtilHelper.checkNIF(value);
    let resp = true;
    if (whatIs == "Formato no válido") {
      resp = false;
    }
    return resp;
  }

  public static validateEmail(email: string) {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }
}
