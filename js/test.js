import chalk from "chalk";
import * as functions from "./function";

const { readData, convertMorseToEnglish, convertEnglishToMorse, addListeners } =
  functions;

// let { MORSE_DATA } = functions;

// console.log(functions.MORSE_DATA);

MORSE_DATA = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
};

// console.log(functions.MORSE_DATA);

//starting tests
describe("THIS SHOULD BE TRUE", () => {
  it("Dummy test", () => {
    expect(true).toBe(true);
  });
});

//filter for only chras a-z in input field
describe("Testing English To Morse", () => {
  it("Test empty string", () => {
    expect(convertEnglishToMorse("")).toBe("");
  });
  it("Test single char H", () => {
    expect(convertEnglishToMorse("H", MORSE_DATA)).toBe("....");
  });
  it("Test multiple Random char", () => {
    expect(convertEnglishToMorse("H L O W R D", MORSE_DATA)).toBe(
      ".... / .-.. / --- / .-- / .-. / -..",
    );
  });
  it("Test upper case", () => {
    expect(convertEnglishToMorse("HELLO WORLD", MORSE_DATA)).toBe(
      ".... . .-.. .-.. --- / .-- --- .-. .-.. -..",
    );
  });
  it("Test lower case", () => {
    expect(convertEnglishToMorse("hello world", MORSE_DATA)).toBe(
      ".... . .-.. .-.. --- / .-- --- .-. .-.. -..",
    );
  });
  it("Test upper + lower case", () => {
    expect(convertEnglishToMorse("HeLlO WoRlD", MORSE_DATA)).toBe(
      ".... . .-.. .-.. --- / .-- --- .-. .-.. -..",
    );
  });
  it("Test word with many spaces", () => {
    expect(convertEnglishToMorse("e e e ", MORSE_DATA)).toBe(". / . / . /");
  });
});

//filter for only . _ / " " in input field
describe("Testing Morse To English", () => {
  it("Test empty string", () => {
    expect(convertMorseToEnglish("")).toBe("");
  });
  it("Test too long string", () => {
    expect(convertMorseToEnglish(".....", MORSE_DATA)).toBe("");
  });
  it("Test too invalid char / valid char", () => {
    expect(convertMorseToEnglish("..... / ....", MORSE_DATA)).toBe("H");
  });
  it("Test too valid char / invalid char", () => {
    expect(convertMorseToEnglish(".... / .....", MORSE_DATA)).toBe("H");
  });
  it("Test too invalid char + valid char", () => {
    expect(convertMorseToEnglish("..... ....", MORSE_DATA)).toBe("H");
  });
  it("Test too valid char + invalid char", () => {
    expect(convertMorseToEnglish(".... .....", MORSE_DATA)).toBe("H");
  });
  it("Test too valid char + invalid char", () => {
    expect(convertMorseToEnglish(".... .....", MORSE_DATA)).toBe("H");
  });
  it("Test invalid ./", () => {
    expect(convertMorseToEnglish("./ / /", MORSE_DATA)).toBe("INVALID");
  });
  it("Test invalid /.", () => {
    expect(convertMorseToEnglish("/. . ", MORSE_DATA)).toBe("INVALID");
  });
  it("Test invalid -/", () => {
    expect(convertMorseToEnglish(". -/ -- / /", MORSE_DATA)).toBe("INVALID");
  });
  it("Test invalid /-", () => {
    expect(convertMorseToEnglish(". /-", MORSE_DATA)).toBe("INVALID");
  });
  it("Test invalid / / /", () => {
    expect(convertMorseToEnglish("/ / /", MORSE_DATA)).toBe("INVALID");
  });
  it("Test too many spaces .  /  .", () => {
    expect(convertMorseToEnglish(".  /  .", MORSE_DATA)).toBe("E E");
  });
  it("Test invalid char + / + valid char", () => {
    expect(
      convertMorseToEnglish(
        ".... ..... .-.. .-... --- / .--... --- .-... .-..--- -..",
        MORSE_DATA,
      ),
    ).toBe("HLO OD");
  });
  it("Test invalid char + / valid char", () => {
    expect(convertMorseToEnglish(". ..... / . ---... / .", MORSE_DATA)).toBe(
      "E E E",
    );
  });
  it("Test invalid char + / valid char / invalid char", () => {
    expect(
      convertMorseToEnglish(". ..... / . ---... / .....", MORSE_DATA),
    ).toBe("E E");
  });
});
