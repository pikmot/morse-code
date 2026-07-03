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

export const convertMorseToEnglish = (morseWord, data = MORSE_DATA) => {
  if (morseWord === "") {
    return "";
  }

  let sentence;
  let morseWordList;

  //loop and decipher words
  let english = "";
  let invalidWord;

  // sentence = morseWord.split(" / ");

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

  // console.log(morseWord);
  if (/\s{2,}/g.test(morseWord)) {
    morseWord = morseWord.replaceAll(/\s{2,}/g, " ");
  }

  // console.log(morseWord);

  if (morseWord.includes(" / ")) {
    sentence = morseWord.split(" / ");
    morseWordList = sentence.map((word) => word.split(" "));

    for (let i = 0; i < morseWordList.length; i++) {
      invalidWord = 0;
      // morseWordList[i] = morseWordList[i].replaceAll(" ", "");
      for (let j = 0; j < morseWordList[i].length; j++) {
        if (morseWordList[i][j].length > 4) {
          // invalidWord = true;
          continue;
        } else {
          // console.log("THROUGH1");
          invalidWord += 1;

          // console.log(
          //   Object.keys(data).find(
          //     (pattern) => data[pattern] === morseWordList[i][j],
          //   ),
          // );

          //add to list
          english += Object.keys(data).find(
            (pattern) => data[pattern] === morseWordList[i][j],
          );
        }
      }

      // console.log(i < morseWordList.length - 1);
      // console.log(invalidWord);

      if (i < morseWordList.length - 1 && invalidWord !== 0) {
        english += " ";
      }

      // console.log(english);
      // english = english.slice(0, -1);
    }
  } else {
    sentence = morseWord;
    morseWordList = morseWord.split(" ");

    for (let i = 0; i < morseWordList.length; i++) {
      // morseWordList[i] = morseWordList[i].replaceAll(" ", "");
      if (morseWordList[i].length > 4) {
        continue;
      } else {
        // console.log("THROUGH2");
        // console.log(char);
        // console.log(char[0]);
        // console.log(typeof MORSE_DATA);
        // console.log(Object.keys(MORSE_DATA));
        // console.log(
        //   Object.keys(MORSE_DATA).find((pattern) => MORSE_DATA[pattern] === char),
        // );

        // console.log(morseWordList);
        // console.log(typeof morseWordList);
        // console.log(morseWordList[0]);
        // console.log(morseWordList[0][0]);
        // console.log(morseWordList[0][1]);

        // console.log(
        //   Object.keys(data).find(
        //     (pattern) => data[pattern] === morseWordList[i],
        //   ),
        // );

        //add to list
        english += Object.keys(data).find(
          (pattern) => data[pattern] === morseWordList[i],
        );
      }

      // if (i > 1) {
      //   english += " ";
      // }

      // console.log(english);
      // english = english.slice(0, -1);
    }
  }

  //remove edge case
  if (english.endsWith(" ")) {
    english = english.slice(0, -1);
  }

  // console.log(sentence);

  // console.log(morseWordList);

  //removing final " "

  // console.log(english);

  return english;
};

export const convertEnglishToMorse = (englishWord, data = MORSE_DATA) => {
  // console.log(englishWord);

  if (englishWord === "") {
    return "";
  }

  let englishWordList = englishWord.toUpperCase().split(" ");
  let englishCharList = englishWordList.map((word) => word.split(""));
  //loop and decipher words
  let morse = "";

  // console.log(englishWordList);

  for (const word of englishWordList) {
    for (const char of word) {
      //add to list
      morse += data[char] + " ";
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
    // console.log(event.target.value);

    // let word = convertEnglishToMorse(event.target.value);

    // console.log(word);
    outputMorse.textContent =
      "MORSE: " + `${convertEnglishToMorse(event.target.value)}`;
  });

  morseInputField.addEventListener("change", (event) => {
    //whole input field
    // console.log(event.target.value);
    // let word = convertMorseToEnglish(event.target.value);
    // console.log(word);
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
    // console.log(event);
    // console.log(event.value);
    event.target.value = event.target.value.replace(/[^a-zA-Z\s]*/g, "");
  });

  morseInputField.addEventListener("input", (event) => {
    //only allow letters upper and lower

    // ._ for full stop and underscore
    //\/ + \s backslash for unique character + /- between words "s" space
    //g all matches instead of first
    //^ inverse of regex
    // console.log(event);
    // console.log(event.value);
    event.target.value = event.target.value.replace(/[^.\-\/\s ]*/g, "");
  });
};

export { MORSE_DATA };
