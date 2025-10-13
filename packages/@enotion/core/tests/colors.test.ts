import {
  getHexFromRGB,
  convertRGBtoString,
  lightenHexColor,
  getRGBfromHex,
  darkenHexColor,
  adjustHexColorOpacity,
  isValidHexColor,
  blendHexColors,
  parseColor,
} from "../utils/colors.js";
import { describe, expect, it } from "@jest/globals";

describe("Color Utilities", () => {
  describe("getHexFromRGB", () => {
    it("should convert RGB array to hex string", () => {
      expect(getHexFromRGB(255, 0, 0)).toBe("#ff0000");
      expect(getHexFromRGB(0, 255, 0)).toBe("#00ff00");
      expect(getHexFromRGB(0, 0, 255)).toBe("#0000ff");
      expect(getHexFromRGB(255, 255, 255)).toBe("#ffffff");
      expect(getHexFromRGB(0, 0, 0)).toBe("#000000");
    });
  });
  describe("convertRGBtoString", () => {
    it("should convert RGB array to rgb() string", () => {
      expect(convertRGBtoString(255, 0, 0)).toBe("rgb(255, 0, 0)");
      expect(convertRGBtoString(0, 255, 0)).toBe("rgb(0, 255, 0)");
      expect(convertRGBtoString(0, 0, 255)).toBe("rgb(0, 0, 255)");
      expect(convertRGBtoString(255, 255, 255)).toBe("rgb(255, 255, 255)");
      expect(convertRGBtoString(0, 0, 0)).toBe("rgb(0, 0, 0)");
    });
  });
  describe("lightenHexColor", () => {
    it("should lighten a hex color by a given percentage", () => {
      expect(lightenHexColor("#000000", 50)).toBe("#323232");
      expect(lightenHexColor("#ff0000", 20)).toBe("#ff1414");
      expect(lightenHexColor("#00ff00", 10)).toBe("#0aff0a");
      expect(lightenHexColor("#0000ff", 30)).toBe("#1e1eff");
    });
  });
  describe("getRGBfromHex", () => {
    it("should convert hex string to RGB array", () => {
      expect(getRGBfromHex("#ff0000")).toEqual({ b: 0, g: 0, r: 255 });
      expect(getRGBfromHex("#00ff00")).toEqual({ b: 0, g: 255, r: 0 });
      expect(getRGBfromHex("#0000ff")).toEqual({ b: 255, g: 0, r: 0 });
      expect(getRGBfromHex("#ffffff")).toEqual({ b: 255, g: 255, r: 255 });
      expect(getRGBfromHex("#000000")).toEqual({ b: 0, g: 0, r: 0 });
    });
  });
  describe("darkenHexColor", () => {
    it("should darken a hex color by a given percentage", () => {
      expect(darkenHexColor("#ffffff", 50)).toBe("#cdcdcd");
      expect(darkenHexColor("#ff0000", 20)).toBe("#eb0000");
      expect(darkenHexColor("#00ff00", 10)).toBe("#00f500");
      expect(darkenHexColor("#0000ff", 30)).toBe("#0000e1");
    });
  });
  describe("adjustHexColorOpacity", () => {
    it("should adjust the opacity of a hex color", () => {
      expect(adjustHexColorOpacity("#ff0000", 0.5)).toBe("#ff000080");
      expect(adjustHexColorOpacity("#00ff00", 0.75)).toBe("#00ff00bf");
      expect(adjustHexColorOpacity("#0000ff", 0.25)).toBe("#0000ff40");
    });
  });
  describe("isValidHexColor", () => {
    it("should validate hex color strings", () => {
      expect(isValidHexColor("#ff0000")).toBe(true);
      expect(isValidHexColor("#00ff00")).toBe(true);
      expect(isValidHexColor("#0000ff")).toBe(true);
      expect(isValidHexColor("#fff")).toBe(true);
      expect(isValidHexColor("#000")).toBe(true);
      expect(isValidHexColor("ff0000")).toBe(true);
      expect(isValidHexColor("#gggggg")).toBe(false);
      expect(isValidHexColor("#12345")).toBe(false);
    });
  });
  describe("blendHexColors", () => {
    it("should blend two hex colors by a given ratio", () => {
      expect(blendHexColors("#ff0000", "#0000ff", 0.5)).toBe("#800080");
      expect(blendHexColors("#00ff00", "#0000ff", 0.25)).toBe("#00bf40");
      expect(blendHexColors("#ffffff", "#000000", 0.75)).toBe("#404040");
    });
  });
  describe("parseColor", () => {
    it("should parse various color formats to hex string", () => {
      expect(parseColor([255, 0, 0])).toBe("#ff0000");
      expect(parseColor("invalid")).toBe("invalid");
      expect(parseColor([300, -10, 0])).toBe("#2bf600");
    });
  });
});
