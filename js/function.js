// defining var
let MORSE_DATA;

export const readData = async () => {
  //DON'T FORGET AWAIT
  let response = await fetch("./assets/morse.json");

  // console.log(response);
  //DON'T FORGET AWAIT lel
  MORSE_DATA = await response.json();

  // console.log(MORSE_DATA);
};

export const convertMorseToEnglish = (morseWord) => {
  let morseWordList = morseWord.split(" / ");
  let morseCharList = morseWordList.map((word) => word.split(" "));
  //loop and decipher words
  let english = "";

  // console.log(morseCharList);

  for (const word of morseCharList) {
    // console.log(word);
    for (const char of word) {
      // console.log(char);
      // console.log(char[0]);
      // console.log(typeof MORSE_DATA);
      // console.log(Object.keys(MORSE_DATA));
      // console.log(
      //   Object.keys(MORSE_DATA).find((pattern) => MORSE_DATA[pattern] === char),
      // );

      //add to list
      english += Object.keys(MORSE_DATA).find(
        (pattern) => MORSE_DATA[pattern] === char,
      );
    }
    english += " ";

    // console.log(english);
  }

  //removing final " "
  english = english.slice(0, -1);
  // console.log(english);

  return english;
};

export const convertEnglishToMorse = (englishWord) => {
  // console.log(englishWord);

  let englishWordList = englishWord.toUpperCase().split(" ");
  let englishCharList = englishWordList.map((word) => word.split(""));
  //loop and decipher words
  let morse = "";

  // console.log(englishWordList);

  for (const word of englishWordList) {
    // console.log(word);
    for (const char of word) {
      // console.log(char);
      // console.log(char[0]);
      // console.log(typeof MORSE_DATA);
      // console.log(Object.keys(MORSE_DATA));
      // console.log(MORSE_DATA[char]);

      //add to list
      morse += MORSE_DATA[char] + " ";
    }
    morse += "/ ";

    // console.log(morse);
  }

  //removing final " / "
  morse = morse.slice(0, -3);
  // console.log(morse);

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
    console.log(event.target.value);

    let word = convertEnglishToMorse(event.target.value);

    // console.log(word);
    outputMorse.textContent =
      "MORSE: " + `${convertEnglishToMorse(event.target.value)}`;
  });

  morseInputField.addEventListener("change", (event) => {
    //whole input field
    // console.log(event.target.value);

    let word = convertMorseToEnglish(event.target.value);

    // console.log(word);
    // outputEnglish.textContent =
    //   "English: " + `${convertMorseToEnglish(event.target.value)}`;
  });

  //restrict input fields
  englishInputField.addEventListener("input", (event) => {
    //only allow letters upper and lower

    //^$ start and end -> NOT NEEDED AFTER TESTING
    //[a-zA-Z] lower and upper case letters
    //g all matches instead of first
    //^ inverse of regex
    // console.log(event);
    // console.log(event.value);
    event.target.value = event.target.value.replace(/[^a-zA-Z]*/g, "");
  });

  morseInputField.addEventListener("input", (event) => {
    //only allow letters upper and lower

    // ._ for full stop and underscore
    //\/ + \s backslash for unique character + /- between words "s" space
    //g all matches instead of first
    //^ inverse of regex
    // console.log(event);
    // console.log(event.value);
    event.target.value = event.target.value.replace(/[^._\/\s ]*/g, "");
  });
};

export { MORSE_DATA };
