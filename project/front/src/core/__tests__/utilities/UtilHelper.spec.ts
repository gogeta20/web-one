import { UtilHelper } from "@/core/utilities/UtilHelper";
import { meEnvironment } from "@/core/__tests__/test-utils";
import { expect, test } from "vitest";

test("Should be return check false isDefined", () => {
  expect(UtilHelper.isDefined(undefined)).toBe(false);
});

test("Should be return check true isDefined", () => {
  expect(UtilHelper.isDefined(2)).toBe(true);
});

test("Should be return check false isString", () => {
  expect(UtilHelper.isString(2)).toBe(false);
});

test("Should be return check true isString", () => {
  expect(UtilHelper.isString("Hola")).toBe(true);
});

test("Should be return check false isNumber", () => {
  expect(UtilHelper.isNumber("Hola")).toBe(false);
});

test("Should be return check true isNumber", () => {
  expect(UtilHelper.isNumber(2)).toBe(true);
});

test("Should be return check false isNullOrEmpty", () => {
  expect(UtilHelper.isNullOrEmpty("Hola")).toBe(false);
});

test("Should be return check true isNullOrEmpty", () => {
  expect(UtilHelper.isNullOrEmpty("")).toBe(true);
});

test("Should be return check false isObjectEmpty", () => {
  const example = { campo: "" };
  expect(UtilHelper.isObjectEmpty(example)).toBe(false);
});

test("Should be return check true isObjectEmpty", () => {
  const example = {};
  expect(UtilHelper.isObjectEmpty(example)).toBe(true);
});

test("Should be return check false exist", () => {
  expect(UtilHelper.exist(null)).toBe(false);
});

test("Should be return check true exist", () => {
  expect(UtilHelper.exist(2)).toBe(true);
});

test("Should be return check false existArray", () => {
  expect(UtilHelper.existArray(2)).toBe(false);
});

test("Should be return check false existArray", () => {
  expect(UtilHelper.existArray(null)).toBe(false);
});

test("Should be return check true existArray", () => {
  expect(UtilHelper.existArray([])).toBe(true);
});

test("Should be return check true existArray check empty data", () => {
  expect(UtilHelper.existArray([], false)).toBe(true);
});

test("Should be return check true existArray check any data", () => {
  expect(UtilHelper.existArray([], true)).toBe(false);
});

test("Should be return check false existString", () => {
  expect(UtilHelper.existString("")).toBe(false);
});

test("Should be return check true existString", () => {
  expect(UtilHelper.existString("Test")).toBe(true);
});

test("Should be return check true isFinteste", () => {
  expect(UtilHelper.isFinite(2)).toBe(true);
});

test("Should be return check true wait", async () => {
  const response = await UtilHelper.wait(2);
  expect(response).toBeUndefined();
});

test("Should be return check true groupByKey", async () => {
  const list = [
    { id: 1, nome: "" },
    { id: 2, nome: "" },
  ];
  const response = UtilHelper.groupByKey(list, "id");
  expect(response).toStrictEqual({ 1: [{ id: 1, nome: "" }], 2: [{ id: 2, nome: "" }] });
});

test("Should be return check true convertFileToBase64", async () => {
  const file = new File(["testlargolargomuylargolarguisimosdw"], "test");
  const response = await UtilHelper.convertFileToBase64(file);
  expect(response).toStrictEqual({
    base64: "dGVzdGxhcmdvbGFyZ29tdXlsYXJnb2xhcmd1aXNpbW9zZHc=",
    fileName: "test",
    fileSize: 35,
    fileType: "",
  });
});

test("Should be return check true convertFileToBase64 -> withMetaData", async () => {
  const file = new File([], "test");
  const response = await UtilHelper.convertFileToBase64(file, true);
  expect(response).toStrictEqual({
    base64: "data:application/octet-stream;base64,",
    fileName: "test",
    fileSize: 0,
    fileType: "",
  });
});

test("Should be return check true convertBase64ToBlob", () => {
  const base64 = "dGVzdGxhcmdvbGFyZ29tdXlsYXJnb2xhcmd1aXNpbW9zZHc=";
  const response = UtilHelper.convertBase64ToBlob(base64, "helloWorld", "txt");
  expect(response).instanceOf(Blob);
});

test("Should be return check true checkEnvironment", () => {
  expect(UtilHelper.checkEnvironment()).toBeFalsy();
  import.meta.env.MODE = meEnvironment;
  expect(UtilHelper.checkEnvironment()).toBeTruthy();
});

test("Should be return check true changeLocale", () => {
  expect(UtilHelper.changeLocale("es", "español", "gallego")).toBe("español");
  expect(UtilHelper.changeLocale("gl", "español", "gallego")).toBe("gallego");
});
