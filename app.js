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

  addListeners();
};

init();
