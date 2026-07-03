// defining var
let MORSE_DATA;

export const readData = async () => {
  //DON'T FORGET AWAIT
  let response = await fetch("./assets/morse.json");

  //DON'T FORGET AWAIT lel
  MORSE_DATA = await response.json();
};

export const convertMorseToEnglish = (morseWord, data = MORSE_DATA) => {
  if (morseWord === "") {
    return "";
  }

  let sentence;
  let morseWordList;

  //loop and decipher words
  let english = "";
  let invalidWord;

  //check if string contians at least a . or _
  if (!(morseWord.includes(".") | morseWord.includes("-"))) {
    return "INVALID";
  }

  if (
    morseWord.includes("/.") |
    morseWord.includes("/-") |
    morseWord.includes("./") |
    morseWord.includes("-/")
  ) {
    return "INVALID";
  }

  //check if ther are double spaces or more
  if (/\s{2,}/g.test(morseWord)) {
    morseWord = morseWord.replaceAll(/\s{2,}/g, " ");
  }

  if (morseWord.includes(" / ")) {
    sentence = morseWord.split(" / ");
    morseWordList = sentence.map((word) => word.split(" "));

    for (let i = 0; i < morseWordList.length; i++) {
      invalidWord = 0;
      for (let j = 0; j < morseWordList[i].length; j++) {
        if (morseWordList[i][j].length > 4) {
          continue;
        } else {
          invalidWord += 1;

          //add to list
          english += Object.keys(data).find(
            (pattern) => data[pattern] === morseWordList[i][j],
          );
        }
      }

      if (i < morseWordList.length - 1 && invalidWord !== 0) {
        english += " ";
      }
    }
  } else {
    sentence = morseWord;
    morseWordList = morseWord.split(" ");

    for (let i = 0; i < morseWordList.length; i++) {
      if (morseWordList[i].length > 4) {
        continue;
      } else {
        //add to list
        english += Object.keys(data).find(
          (pattern) => data[pattern] === morseWordList[i],
        );
      }
    }
  }

  //remove edge case
  if (english.endsWith(" ")) {
    english = english.slice(0, -1);
  }

  return english;
};

export const convertEnglishToMorse = (englishWord, data = MORSE_DATA) => {
  if (englishWord === "") {
    return "";
  }

  let englishWordList = englishWord.toUpperCase().split(" ");
  let englishCharList = englishWordList.map((word) => word.split(""));

  //loop and decipher words
  let morse = "";

  for (const word of englishWordList) {
    for (const char of word) {
      //add to list
      morse += data[char] + " ";
    }
    morse += "/ ";
  }

  //removing final " / "
  morse = morse.slice(0, -3);

  return morse;
};

export const addListeners = () => {
  let englishInputField = document.getElementById("englishInput");
  let morseInputField = document.getElementById("morseInput");

  let outputEnglish = document.getElementById("englishOutput");
  let outputMorse = document.getElementById("morseOutput");

  //input is realtime
  //change is after ENTER or clickaway?
  englishInputField.addEventListener("change", (event) => {
    //whole input field
    outputMorse.textContent =
      "MORSE: " + `${convertEnglishToMorse(event.target.value)}`;
  });

  morseInputField.addEventListener("change", (event) => {
    //whole input field
    outputEnglish.textContent =
      "English: " + `${convertMorseToEnglish(event.target.value)}`;
  });

  //restrict input fields
  englishInputField.addEventListener("input", (event) => {
    //only allow letters upper and lower

    //^$ start and end -> NOT NEEDED AFTER TESTING
    //[a-zA-Z] lower and upper case letters
    //g all matches instead of first
    //^ inverse of regex

    event.target.value = event.target.value.replace(/[^a-zA-Z\s]*/g, "");
  });

  morseInputField.addEventListener("input", (event) => {
    //only allow letters upper and lower

    // ._ for full stop and underscore
    //\/ + \s backslash for unique character + /- between words "s" space
    //g all matches instead of first
    //^ inverse of regex
    event.target.value = event.target.value.replace(/[^.\-\/\s ]*/g, "");
  });
};

export { MORSE_DATA };
