import {
  readData,
  convertMorseToEnglish,
  convertEnglishToMorse,
  addListeners,
  MORSE_DATA,
} from "./js/function.js";

//init function

const init = async () => {
  await readData();
  //   console.log(MORSE_DATA);

  //   console.log(convertMorseToEnglish(".. / .-.. --- ...- . / -.-- --- ..-"));

  //   console.log(convertEnglishToMorse("I LOVE YOU"));

  //   console.log(convertEnglishToMorse("I"));

  //   console.log(
  //     convertMorseToEnglish(".. / .-.. --- ...- . / -.-- --- ..-") ===
  //       "I LOVE YOU",
  //   );

  //   console.log(
  //     convertEnglishToMorse("I LOVE YOU") ===
  //       ".. / .-.. --- ...- . / -.-- --- ..-",
  //   );

  addListeners();
};

init();
