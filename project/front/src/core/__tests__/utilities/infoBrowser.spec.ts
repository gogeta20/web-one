import { getBrowserInfo } from "@/core/utilities/infoBrowser";
import { expect, test } from "vitest";

test("getBrowserInfo", () => {
  expect(getBrowserInfo()).toBe("Netscape");
});
