let globalSelectedSentence = []; // Stores the selected sentence with POS tags
let globalPOSOptions = []; // Stores the POS options for the selected language

// English examples and their corresponding correct answers
const englishExamples = [
  {
    sentence:
      "There were once a man and a woman who had long, in vain, wished for a child.",
    answers: [
      "There/EX",
      "were/VBD",
      "once/RB",
      "a/DT",
      "man/NN",
      "and/CC",
      "a/DT",
      "woman/NN",
      "who/WP",
      "had/VBD",
      "long/RB",
      "in/IN",
      "vain/JJ",
      "wished/VBN",
      "for/IN",
      "a/DT",
      "child/NN",
    ],
  },
  {
    sentence: "At length it appeared that God was about to grant their desire.",
    answers: [
      "At/IN",
      "length/NN",
      "it/PRP",
      "appeared/VBD",
      "that/IN",
      "God/NNP",
      "was/VBD",
      "about/IN",
      "to/TO",
      "grant/VB",
      "their/PRP$",
      "desire/NN",
    ],
  },
  {
    sentence:
      "These people had a little window at the back of their house from which a splendid garden could be seen.",
    answers: [
      "These/DT",
      "people/NNS",
      "had/VBD",
      "a/DT",
      "little/JJ",
      "window/NN",
      "at/IN",
      "the/DT",
      "back/NN",
      "of/IN",
      "their/PRP$",
      "house/NN",
      "from/IN",
      "which/WDT",
      "a/DT",
      "splendid/JJ",
      "garden/NN",
      "could/MD",
      "be/VB",
      "seen/VBN",
    ],
  },
  {
    sentence: "The garden was full of the most beautiful flowers and herbs.",
    answers: [
      "The/DT",
      "garden/NN",
      "was/VBD",
      "full/JJ",
      "of/IN",
      "the/DT",
      "most/RBS",
      "beautiful/JJ",
      "flowers/NNS",
      "and/CC",
      "herbs/NNS",
    ],
  },
  {
    sentence:
      "It was, however, surrounded by a high wall, and no one dared to go into it because it belonged to an enchantress.",
    answers: [
      "It/PRP",
      "was/VBD",
      "however/RB",
      "surrounded/VBN",
      "by/IN",
      "a/DT",
      "high/JJ",
      "wall/NN",
      ",/,",
      "and/CC",
      "no/DT",
      "one/NN",
      "dared/VBD",
      "to/TO",
      "go/VB",
      "into/IN",
      "it/PRP",
      "because/IN",
      "it/PRP",
      "belonged/VBD",
      "to/TO",
      "an/DT",
      "enchantress/NN",
    ],
  },
];

// Hindi examples and their corresponding correct answers
const hindiExamples = [
  {
    sentence: "राम सीता के लिए फूलों की माला बनाता है।",
    answers: [
      "राम/NN",
      "सीता/NP",
      "के/PSP",
      "लिए/PSP",
      "फूलों/NP",
      "की/PSP",
      "माला/NP",
      "बनाता/VM",
      "है/VAUX",
    ],
  },
  {
    sentence: "सभी बच्चे विद्यालय में पढ़ते हैं।",
    answers: [
      "सभी/QF",
      "बच्चे/NN",
      "विद्यालय/NN",
      "में/PSP",
      "पढ़ते/VM",
      "हैं/VAUX",
    ],
  },
  {
    sentence: "मैंने उनसे एक सहज प्रश्न पूछा था।",
    answers: [
      "मैंने/PRP",
      "उनसे/PRP",
      "एक/QC",
      "सहज/JJ",
      "प्रश्न/NN",
      "पूछा/VM",
      "था/VAUX",
    ],
  },
  {
    sentence: "भागता हुआ हिरण गिर गया।",
    answers: ["भागता/VM", "हुआ/VAUX", "हिरण/NN", "गिर/VM", "गया/VAUX"],
  },
  {
    sentence: "लक्ष्मण राम के साथ वनवास गया।",
    answers: [
      "लक्ष्मण/NNP",
      "राम/NNP",
      "के/PSP",
      "साथ/NST",
      "वनवास/NN",
      "गया/VM",
    ],
  },
];

// POS options for English and Hindi
const englishPOSOptions = [
  "CC",
  "CD",
  "DT",
  "EX",
  "IN",
  "JJ",
  "JJR",
  "JJS",
  "MD",
  "NN",
  "NNS",
  "NNP",
  "NNPS",
  "PDT",
  "POS",
  "PRP",
  "PRP$",
  "RB",
  "RBR",
  "RBS",
  "RP",
  "TO",
  "UH",
  "VB",
  "VBD",
  "VBG",
  "VBN",
  "VBP",
  "VBZ",
  "WDT",
  "WP",
  "WP$",
  "WRB",
  "PUNC",
  "SYM",
  "X",
];
const hindiPOSOptions = [
  "NN",
  "NP",
  "NST",
  "NNP",
  "NNPS",
  "NNS",
  "PSP",
  "DT",
  "PRP$",
  "PRP",
  "VM",
  "VAUX",
  "VBD",
  "VBG",
  "VBN",
  "VBP",
  "VBZ",
  "JJ",
  "JJR",
  "JJS",
  "RB",
  "RBR",
  "RBS",
  "RP",
  "TO",
  "UH",
  "*C",
  "QF",
];

function selectLang() {
  const langDropdown = document.getElementById("lang_opt");
  const selectedIndex = langDropdown.selectedIndex;
  const langId = langDropdown.options[selectedIndex].value;

  if (langId === "0") {
    alert("Please select a language.");
    return;
  }

  const language = parseInt(langId); // Convert the selected value to an integer
  loadSentenceSelection(language); // Call the function to load sentence options
}

// Load sentence options dynamically based on the selected language
function loadSentenceSelection(language) {
  const sentenceContainer = document.getElementById("sen_opt");
  sentenceContainer.innerHTML = ""; // Clear any previous content

  const examples = language === 1 ? englishExamples : hindiExamples;

  // Populate the sentence dropdown based on the selected language
  sentenceContainer.innerHTML = `
    <h3>${language === 1 ? "Select a Sentence" : "एक वाक्य चुनें"}</h3>
    <select id="sentenceDropdown">
      <option value="0" selected>---${
        language === 1 ? "Select Sentence" : "एक वाक्य चुनें"
      }---</option>
      ${examples
        .map(
          (example, index) =>
            `<option value="${index + 1}">${example.sentence}</option>`
        )
        .join("")}
    </select>
    <button onclick="loadSimulationInterface(${language})">Load Simulation</button>
  `;
}

// Load the simulation interface for the selected sentence
function loadSimulationInterface(language) {
  const sentenceDropdown = document.getElementById("sentenceDropdown");
  const selectedSentenceIndex = parseInt(sentenceDropdown.value); // Convert value to an integer

  if (selectedSentenceIndex === 0) {
    alert("Select a sentence");
    return;
  }

  const simulationContainer = document.getElementById("sen_opt");
  simulationContainer.innerHTML = ""; // Clear previous content

  const examples = language === 1 ? englishExamples : hindiExamples;
  const selectedExample = examples[selectedSentenceIndex - 1]; // Adjust index to match array

  // Set the global POS options and selected sentence
  globalPOSOptions = language === 1 ? englishPOSOptions : hindiPOSOptions;
  globalSelectedSentence = selectedExample.answers;

  let tableHTML = `
        <h3>${
          language === 1 ? "Select POS Tags" : "शब्दों के लिए सही POS टैग चुनें"
        }</h3>
        <table border="1" style="text-align:center;">
          <tr>
            <th>${language === 1 ? "Word" : "शब्द"}</th>
            <th>${language === 1 ? "POS Tag" : "POS टैग"}</th>
            <th>${language === 1 ? "Feedback" : "प्रतिक्रिया"}</th>
            <th>${language === 1 ? "Correct Answer" : "सही उत्तर"}</th>
          </tr>
      `;

  globalSelectedSentence.forEach((word, index) => {
    const [lexicon, correctTag] = word.split("/");
    tableHTML += `
          <tr>
            <td>${lexicon}</td>
            <td>
              <select id="token${index}">
                <option value="">---Select---</option>
                ${globalPOSOptions
                  .map(
                    (option) => `<option value="${option}">${option}</option>`
                  )
                  .join("")}
              </select>
            </td>
            <td id="correction${index}"></td>
            <td id="correct${index}"></td>
          </tr>
        `;
  });

  tableHTML += `
        </table>
        <button onclick="checkAnswer()">Submit</button>
        <div id="see_soln"></div>
      `;

  simulationContainer.innerHTML = tableHTML;
}

// Check the user's answers
function checkAnswer() {
  let isCorrect = true;

  globalSelectedSentence.forEach((word, index) => {
    const [_, correctTag] = word.split("/");
    const userAnswer = document.getElementById(`token${index}`).value;

    if (userAnswer === correctTag) {
      document.getElementById(
        `correction${index}`
      ).innerHTML = `<img src="./images/right.png" alt="Correct" style="height:25px;width:25px;">`;
    } else {
      isCorrect = false;
      document.getElementById(
        `correction${index}`
      ).innerHTML = `<img src="./images/wrong.png" alt="Wrong" style="height:25px;width:25px;">`;
    }
  });

  if (!isCorrect) {
    document.getElementById("see_soln").innerHTML = `
        <button onclick="correctTable()">Get Answer</button>
      `;
  } else {
    document.getElementById("see_soln").innerHTML = `
        <p style="color: green; text-align: center; font-size: 18px;">All answers are correct!</p>
      `;
  }
}

// Show the correct answers
function correctTable() {
  globalSelectedSentence.forEach((word, index) => {
    const [_, correctTag] = word.split("/");
    document.getElementById(`correct${index}`).innerHTML = correctTag;
  });

  document.getElementById("see_soln").innerHTML = `
      <button onclick="clearTable()">Hide Answer</button>
    `;
}

// Clear the correct answers
function clearTable() {
  globalSelectedSentence.forEach((_, index) => {
    document.getElementById(`correct${index}`).innerHTML = "";
  });

  document.getElementById("see_soln").innerHTML = `
      <button onclick="correctTable()">Get Answer</button>
    `;
}
