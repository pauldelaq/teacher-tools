const addExerciseBtn = document.getElementById("add-button");
const hamburgerMenuBtn = document.getElementById("hamburger-menu-button");
const hamburgerMenu = document.getElementById("hamburger-menu");
const newWorksheetBtn = document.getElementById("new-worksheet-button");
const loadTemplateWorksheetBtn = document.getElementById("load-template-worksheet-button");
const createExerciseMenu = document.getElementById("create-exercise-menu");
const exerciseListDisplay = document.getElementById("exercise-list-display");
const closeExerciseMenuBtn = document.getElementById("close-exercise-menu");
const exerciseType = document.getElementById("exercise-type");
const exerciseDescription = document.getElementById("exercise-description");
const addFirstExerciseText = document.getElementById("add-first-exercise-text");
const headingContainer = document.getElementById("heading-container");
const editingInterface = document.getElementById("editing-interface");
const closeEditingInterface = document.getElementById("close-editing-interface");
const saveEditBtn = document.getElementById("save-edit");
const editorBody = document.getElementById("editor-body");
const modeBtn = document.getElementById("mode-button");
const copyBtn = document.getElementById("copy-button");
const printBtn = document.getElementById("print-button");
const worksheet = document.getElementById("worksheet");
const headerTitle = document.getElementById("header-title");
const savingDisabledText = document.getElementById("saving-disabled-text");
let currentEditingBlockId = null;
let currentEditingType = null;
let currentViewMode = "student";
let exerciseBlocks = [];
let isViewingTemplateWorksheet = true;
const sampleBlocks = [
 {
    id: 1,
    type: "title",
    data: { text: "My Worksheet", showLetter: false, includeName: true, includeClass: true, includeDate: true }
  },
  {
    id: 2,
    type: "instruction",
    data: { text: "Welcome! Hover over or click any exercise block to view more options.", showLetter: false }
  },
  {
    id: 3,
    type: "scrambled-sentence",
    data: { heading: "Unscramble the sentences.", scrambledLines:
    [
    "The / runs / quickly. / cat",
    "eats / breakfast. / dog / for / chicken / The"
    ],
    text: "The cat runs quickly.\nThe dog eats chicken for breakfast.",
    numbered: true, showAnswerLines: true, showLetter: true, showHeading: true }
  },
    {
    id: 4,
    type: "blanks-passage",
    data: { heading: "Please fill in the blanks with appropriate words.", text: "Cats are [cute] animals that like to eat [fish]. Garfield is a famous [cat] that likes to eat [lasagna].", wordList: ["fish", "lasagna", "cat", "cute"], showWordList: true, showLetter: true, showHeading: true }
  },
    {
    id: 5,
    type: "multiple-choice-question",
    data: {
        heading: "Choose the correct answers.",
        text: "How many legs do cats typically have? [four/three/two/one]\nWhat sound do cats usually make? [meow/bark/moo]",
        questions: [
        {
            prompt: "How many legs do cats typically have?",
            choices: ["two", "four", "three", "one"],
            correctIndex: 1
        },
        {
            prompt: "What sound do cats usually make?",
            choices: ["moo", "bark", "meow"],
            correctIndex: 2
        }
        ],
        showLetter: true, numbered: true, showHeading: true
    }
    },
{
  id: 6,
  type: "word-matching",
  data: {
    heading: "Match words to create phrases.",
    text: "The dog / barks\nThe cat / meows\nThe pig / oinks\nThe wolf / howls",
    pairs: [
      { left: "The dog",  right: "barks"  },
      { left: "The cat",  right: "meows"  },
      { left: "The pig",  right: "oinks"  },
      { left: "The wolf", right: "howls"  }
    ],
    rightOptions: [
      { text: "meows", pairIndex: 1 },
      { text: "howls", pairIndex: 3 },
      { text: "barks", pairIndex: 0 },
      { text: "oinks", pairIndex: 2 }
    ],
    numbered: true,
    showLetter: true,
    showHeading: true
  }
},
    {
    id: 7,
    type: "cloze-test",
    data: {
        heading: "Read the passage and choose the correct answers.",
        text: "Cats typically have [two/three/four/six] ears. They generally like to eat [fish/cabbage/onions/pickles]. In cartoons, they often drink [milk/cola/tea/beer], but this is not realistic. Typically, they simply drink [water/tea/cola/wine].",
        questions: [
        {
            choices: ["two", "three", "four", "six"],
            correctIndex: 0
        },
        {
            choices: ["cabbage", "fish", "onions", "pickles"],
            correctIndex: 1
        },
        {
            choices: ["cola", "tea", "milk", "beer"],
            correctIndex: 2
        },
        {
            choices: ["tea", "wine", "cola", "water"],
            correctIndex: 3
        }
    ],
        showLetter: true, showHeading: true
    }
  },
    {
    id: 8,
    type: "essay-questions",
    data: { 
        heading: "Please answer in complete sentences.",
        text: "How do you feel about cats? Please write 30 words.\nDo you like to eat fried chicken? Why or why not?\nWhy is the sky blue?",
        showLetter: true,
        answerBoxType: "lined",
        answerBoxSize: "paragraph",
        showHeading: true
    }
  },
  {
    id: 9,
    type: "letter-removal",
    data: {
        heading: "Please fill in the missing letters.",
        text: "Cats are cute animals with four legs.\nDogs like to bark.",
        questions: [
            {
                sentence: "Cats are cute animals with four legs.",
                modifiedText: "C _ _ _  a _ _  c _ _ _  a _ _ _ _ _ s  w _ _ _  f _ _ _  l _ _ _."
            },
            {
                sentence: "Dogs like to bark.",
                modifiedText: "D _ _ _  l _ _ _  t _  b _ _ _."
            }
        ],
        showLetter: true,
        numbered: true,
        showHeading: true,
        preserveInitial: true,
        preserveFinal: false,
        preserveRandom: false
    }
  },
    {
    id: 10,
    type: "scrambled-words",
    data: {
        heading: "Please unscramble the words to make sentences.",
        text: "Cats are cute animals.\nDogs like to bark.",
        questions: [
            {
                sentence: "Cats are cute animals.",
                modifiedText: `sta<span class="underlined">C</span> r<span class="underlined">a</span>e ut<span class="underlined">c</span>e ni<span class="underlined">a</span>lsma.`
            },
            {
                sentence: "Dogs like to bark.",
                modifiedText: `og<span class="underlined">D</span>s k<span class="underlined">l</span>ie o<span class="underlined">t</span> kar<span class="underlined">b</span>.`
            }
        ],
        showLetter: true,
        numbered: true,
        showHeading: true,
        underlineInitial: true,
        showAnswerLines: true
    }
  },
    {
    id: 11,
    type: "word-grid",
    data: {
        heading: "Conjugate the verbs in the present tense.",
        rows: 3,
        cols: 4,
        headerRow: true,
        headerCol: true,
        cells: [
        ["",       "I",    "You",   "He/She"],
        ["be",     "am",   "are",    "is"],
        ["eat",    "eat",  "eat",   "eats"]
        ],
        blanks: [
        [ false, false, false, false ],
        [ false, false,  true,  false  ],
        [ false, true,  false,  true  ]
        ],
        showLetter: true,
        showHeading: true
    }
    }
];

const exerciseTypes = [
    {
        id: "title",
        buttonContent: "Chemistry 101 with Professor White - Midterm Review",
        buttonCaption: "Title",
        buttonFunction: createTitleText
    },
    {
        id: "instruction",
        buttonContent: "Please refer to page 104 for this section of the worksheet",
        buttonCaption: "Instruction / Note",
        buttonFunction: createInstructionText
    },
    {
        id: "scrambled-sentence",
        buttonContent: "cat / The / quickly. / runs<br>barks / dog / loudly. / The",
        buttonCaption: "Scrambled Sentences",
        buttonFunction: createScrambledSentences
    },
        {
        id: "scrambled-words",
        buttonContent: `sta<span class="underlined">C</span> r<span class="underlined">a</span>e ut<span class="underlined">c</span>e ni<span class="underlined">a</span>lsma.<br><br>og<span class="underlined">D</span>s k<span class="underlined">l</span>ie o<span class="underlined">t</span> kar<span class="underlined">b</span>.`,
        buttonCaption: "Scrambled Words",
        buttonFunction: createScrambledWords
    },
        {
        id: "word-matching",
        buttonContent: `<table class="matching-layout"><tr><td>apple</td><td class="buffer-cell"> </td><td class="buffer-cell"> </td><td>orange</td></tr><tr><td>banana</td><td class="buffer-cell"> </td><td class="buffer-cell"> </td><td>red</td></tr><tr><td>carrot</td><td class="buffer-cell"> </td><td class="buffer-cell"> </td><td>yellow</td></tr></table>`,
        buttonCaption: "Matching Words / Phrases",
        buttonFunction: createWordMatching
    },
        {
        id: "blanks-passage",
        buttonContent: "fish\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0cute<br><br>Cats are _______ animals that like to eat _______.",
        buttonCaption: "Fill-in-the-Blanks Passage",
        buttonFunction: createBlanksPassage
    },
        {
        id: "multiple-choice-question",
        buttonContent: `1. How many legs do cats typically have?<br><br><table class="cloze-test-choices"><tr><td>a. three</td><td>b. four</td></tr></table>`,
        buttonCaption: "Multiple Choice Questions",
        buttonFunction: createMultipleChoiceQuestions
    },
        {
        id: "cloze-test",
        buttonContent: `Dogs typically <span class="bold">1. __________ </span> when they feel <span class="bold">2. __________</span>.<br><br><table class="cloze-test-choices"><tr><th>1. </th><td>a. bark</td><td>b. meow</td></tr><tr><th>2. </th><td>a. bored</td><td>b. excited</td></tr></table>`,
        buttonCaption: "Cloze Test",
        buttonFunction: createClozeTest
    },
        {
        id: "word-grid",
        buttonContent: `<table class="word-grid"><tr><th>Verb</th><th>Past</th><th>p.p.</th></tr><tr><td>go</td><td> </td><td>gone</td></tr><tr><td> </td><td>saw</td><td>seen</td></tr><table>`,
        buttonCaption: "Word Grid",
        buttonFunction: createWordGrid
    },
    {
        id: "essay-questions",
        buttonContent: `How do you feel about <span class="bold">cats</span>? Please write 50 words.<br><br><table class="essay-rows"><tr><td> </td></tr><tr><td> </td></tr><tr><td> </td></tr><tr><td> </td></tr></table>`,
        buttonCaption: "Long Answer / Essay Questions",
        buttonFunction: createEssayQuestion
    },
    {
        id: "letter-removal",
        buttonContent: "C _ _ _ &nbsp a _ _ &nbsp c _ _ _ &nbsp <br>a _ _ _ _ _ s &nbsp w _ _ _ &nbsp f _ _ _  <br>l _ _ _.<br><br>D _ _ _ &nbsp l _ _ _ &nbsp t _ &nbsp b _ _ _.",
        buttonCaption: "Text with Letters Removed",
        buttonFunction: createLetterRemoval
    }
]

// general functions

function updateSavingDisabledUI() {
    if (isViewingTemplateWorksheet) {
        savingDisabledText.classList.remove("hidden");
        saveEditBtn.disabled = true;
    } else {
        savingDisabledText.classList.add("hidden");
        saveEditBtn.disabled = false;
    }
}

function showMenu(el) {
    el.classList.remove("hidden");
}

function closeMenu(el) {
    el.classList.add("hidden");
}

function updateHeaderTitle() {
    if (window.innerWidth < 528) {
        headerTitle.textContent = "MW"
    } else {
        headerTitle.textContent = "My Worksheets"
    }
}

// Helper to wire heading checkbox to enable/disable heading textarea
function setupHeadingToggle() {
    const headingCheckbox = document.getElementById("headingCheckbox");
    const headingTextarea = headingContainer.querySelector(".heading-input");

    if (!headingCheckbox || !headingTextarea) return;

    const applyState = () => {
        const isChecked = headingCheckbox.checked;
        headingTextarea.disabled = !isChecked;
        headingTextarea.classList.toggle("disabled", !isChecked);
    };

    applyState();
    headingCheckbox.addEventListener("change", applyState);
}

// Function to render the buttons for the exercise types when creating a new exercise 
function renderExerciseTypes() {
    exerciseTypes.forEach((el) => {
        const exerciseButtonWrapper = document.createElement("div");
        exerciseButtonWrapper.classList.add("exercise-button-wrapper");
        const exerciseButtonCaption = document.createElement("p");
        exerciseButtonCaption.textContent = el.buttonCaption;
        exerciseButtonCaption.classList.add("exercise-button-caption");
        const exerciseTypeButton = document.createElement("button");
        exerciseTypeButton.innerHTML = el.buttonContent;
        exerciseTypeButton.classList.add("exercise-type-button");
        exerciseTypeButton.id = el.id;
        exerciseTypeButton.addEventListener("click", () => openEditorForType(el.buttonCaption, el.buttonFunction, el.id));
        exerciseButtonWrapper.appendChild(exerciseTypeButton);
        exerciseButtonWrapper.appendChild(exerciseButtonCaption);
        exerciseListDisplay.appendChild(exerciseButtonWrapper);
    }
    )
}

// Logic for rendering the actual exercises
function renderExerciseBlocks() {
    worksheet.innerHTML = "";

    let letterIndex = 0;

    if (exerciseBlocks.length === 0) {
        addFirstExerciseText.classList.remove("hidden");
    } else {
        addFirstExerciseText.classList.add("hidden");
    }
    exerciseBlocks.forEach(block => {
        const { editBtn, deleteBtn, upBtn, downBtn, letterBtn, contentContainer, wrapper } = createBlockWrapper(block);

        let blockElement;

        let letter = null;
        if (block.data && block.data.showLetter) {
            letter = String.fromCharCode(65 + letterIndex);
            letterIndex++;
        }

        if (block.type === "title") {
            const table = document.createElement("table");
            table.classList.add("title-table");

            const row1 = document.createElement("tr");

            // LEFT CELL: title + optional (Answer Key)
            const leftCell = document.createElement("td");
            leftCell.classList.add("title-left-cell");

            const baseText = block.data.text || "";
            const displayText = block.data.showLetter && letter
                ? `${letter}. ${baseText}`
                : baseText;

            if (currentViewMode === "student") {
                // just the title
                leftCell.textContent = displayText;
            } else {
                // title + "(Answer Key)" on next line
                const titleContainer = document.createElement("div");
                titleContainer.textContent = displayText;

                const br = document.createElement("br");
                const answerKeySpan = document.createElement("span");
                answerKeySpan.textContent = "(Answer Key)";
                answerKeySpan.classList.add("answer-label");

                titleContainer.appendChild(br);
                titleContainer.appendChild(answerKeySpan);
                leftCell.appendChild(titleContainer);
            }

            row1.appendChild(leftCell);

            // LABEL + VALUE COLUMNS (same as before)
            const labelCell = document.createElement("td");
            labelCell.classList.add("title-labels");

            const valueCell = document.createElement("td");
            valueCell.classList.add("title-values");

            const addField = (label) => {
                const labelLine = document.createElement("div");
                labelLine.textContent = `${label}:`;
                labelCell.appendChild(labelLine);

                const valueLine = document.createElement("div");
                valueLine.textContent = "______________";
                valueCell.appendChild(valueLine);
            };

            if (block.data.includeName)  addField("Name");
            if (block.data.includeClass) addField("Class");
            if (block.data.includeDate)  addField("Date");

            row1.appendChild(labelCell);
            row1.appendChild(valueCell);
            table.appendChild(row1);

            blockElement = table;
        }

        if (block.type === "instruction") {
            const generatedPar = document.createElement("p");
            const baseText = block.data.text || "";
            generatedPar.textContent = letter ? `${letter}. ${baseText}` : baseText;
            generatedPar.classList.add("bold");
            blockElement = generatedPar;
        }

        if (block.type === "essay-questions") {
            const generatedDiv = document.createElement("div");

            if (block.data.showHeading && block.data.heading) {
                const headingPar = document.createElement("p");
                const baseHeading = block.data.heading || "";
                headingPar.textContent = letter ? `${letter}. ${baseHeading}` : baseHeading;
                headingPar.classList.add("bold");
                generatedDiv.appendChild(headingPar);
            } else if (letter) {
                const letterLine = document.createElement("p");
                letterLine.textContent = `${letter}.`;
                letterLine.classList.add("bold");
                generatedDiv.appendChild(letterLine);
            }

            const questions = block.data.text;
            const questionsArray = questions.split("\n");

            questionsArray.forEach((question, index) => {
                const generatedQuestion = document.createElement("p");
                generatedQuestion.innerHTML = `${index + 1}. ${question}`;
                generatedDiv.appendChild(generatedQuestion);

                const answerBox = document.createElement("table");
                if (block.data.answerBoxType === "lined") {
                    answerBox.classList.add("lined");
                }
                
                if (block.data.answerBoxType === "box") {
                    answerBox.classList.add("box");
                }

                if (block.data.answerBoxType === "simple-lines") {
                    answerBox.classList.add("simple-lines");
                }

                let numberOfRowsToAdd;

                if (block.data.answerBoxSize === "sentence") {
                    numberOfRowsToAdd = 1;
                }

                if (block.data.answerBoxSize === "paragraph") {
                    numberOfRowsToAdd = 3;
                }

                if (block.data.answerBoxSize === "half-page") {
                    numberOfRowsToAdd = 5;
                }

                if (block.data.answerBoxSize === "full-page") {
                    numberOfRowsToAdd = 10;
                }

                for (let i = 0; i < numberOfRowsToAdd; i++) {
                    if (block.data.answerBoxType === "lined") {
                        const generatedRow = document.createElement("tr");
                        const cell = document.createElement("td");
                        cell.classList.add("lined");
                        cell.textContent = "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - "
                        generatedRow.appendChild(cell);
                        answerBox.appendChild(generatedRow);

                        const spacerRow = document.createElement("tr");
                        const cellSpacer = document.createElement("td");
                        cellSpacer.textContent = "\u00A0";
                        cellSpacer.classList.add("spacer-row");
                        spacerRow.appendChild(cellSpacer);
                        answerBox.appendChild(spacerRow);
                    } else {
                        const generatedRow = document.createElement("tr");
                        const generatedCell = document.createElement("td");
                        generatedRow.appendChild(generatedCell);
                        answerBox.appendChild(generatedRow);
                    }
                }
                generatedDiv.appendChild(answerBox);
            });

            blockElement = generatedDiv;
        }

        if (block.type === "word-matching") {
            const generatedPhrases = document.createElement("div");
            generatedPhrases.classList.add("simulate-line-height");

            if (block.data.showHeading && block.data.heading) {
                const headingPar = document.createElement("p");
                const baseHeading = block.data.heading || "";
                headingPar.textContent = letter ? `${letter}. ${baseHeading}` : baseHeading;
                headingPar.classList.add("bold");
                generatedPhrases.appendChild(headingPar);
            } else if (letter) {
                const letterLine = document.createElement("p");
                letterLine.textContent = `${letter}.`;
                letterLine.classList.add("bold");
                generatedPhrases.appendChild(letterLine);
            }

            const matchTable = document.createElement("table");
            matchTable.classList.add("matching-layout");
            if (currentViewMode === "student") {
                const pairs = block.data.pairs;
                const options = block.data.rightOptions;
                pairs.forEach((item, index) => {
                    const row = document.createElement("tr");

                    const spaceAndNumber = document.createElement("td");
                    spaceAndNumber.classList.add("space-and-number");
                    spaceAndNumber.innerText = `___ ${index + 1}. `
                    row.appendChild(spaceAndNumber);

                    const leftCell = document.createElement("td");
                    leftCell.innerText = `${item.left}`;
                    leftCell.classList.add("matching-left");
                    row.appendChild(leftCell);

                    const letterCell = document.createElement("td");
                    letterCell.classList.add("letter-cell");
                    const letter = String.fromCharCode(97 + index);
                    letterCell.innerHTML = `${letter}. `
                    row.appendChild(letterCell);

                    const rightCell = document.createElement("td");
                    const option = options[index];
                    if (option) {
                        rightCell.innerText = `${option.text}`;
                    }
                    rightCell.classList.add("matching-right");
                    row.appendChild(rightCell);

                    matchTable.appendChild(row);

                });

            } else {
                const pairs = block.data.pairs;
                const options = block.data.rightOptions;
                pairs.forEach((item, index) => {
                    const row = document.createElement("tr");

                    const leftCell = document.createElement("td");

                    // find which option matches this left-side index
                    const correctOptionIndex = options.findIndex(o => o.pairIndex === index);

                    // convert to a/b/c/d
                    const abcd = String.fromCharCode(97 + correctOptionIndex);

                    const spaceAndNumber = document.createElement("td");
                    spaceAndNumber.classList.add("space-and-number");
                    spaceAndNumber.innerHTML = `<span class="underlined">&nbsp;&nbsp;${abcd}&nbsp;&nbsp;</span> ${index + 1}. `;
                    row.appendChild(spaceAndNumber);

                    leftCell.innerText = `${item.left}`;
                    leftCell.classList.add("matching-left");
                    row.appendChild(leftCell);

                    const letterCell = document.createElement("td");
                    letterCell.classList.add("letter-cell");
                    const letter = String.fromCharCode(97 + index);
                    letterCell.innerHTML = `${letter}. `
                    row.appendChild(letterCell);

                    const rightCell = document.createElement("td");
                    const option = options[index];
                    if (option) {
                        rightCell.innerText = `${option.text}`;
                    }
                    rightCell.classList.add("matching-right");
                    row.appendChild(rightCell);

                    matchTable.appendChild(row);

                });

            }

            generatedPhrases.appendChild(matchTable);
            blockElement = generatedPhrases;

        }

        if (block.type === "scrambled-sentence") {
            const generatedSenContainer = document.createElement("div");

            if (block.data.showHeading && block.data.heading) {
                const headingPar = document.createElement("p");
                const baseHeading = block.data.heading || "";
                headingPar.textContent = letter ? `${letter}. ${baseHeading}` : baseHeading;
                headingPar.classList.add("bold");
                generatedSenContainer.appendChild(headingPar);
            } else if (letter) {
                const letterLine = document.createElement("p");
                letterLine.textContent = `${letter}.`;
                letterLine.classList.add("bold");
                generatedSenContainer.appendChild(letterLine);
            }

            const scrambledSenText = document.createElement(block.data.numbered ? "ol" : "ul");
            if (currentViewMode === "student") {
                const scrambledSource = block.data.scrambledLines;
                scrambledSource.forEach((sen) => {
                    generatedSen = document.createElement("li");
                    generatedSen.textContent = sen;
                    scrambledSenText.appendChild(generatedSen);
                    if (block.data.showAnswerLines) {
                        const answerLine = document.createElement("div");
                        answerLine.innerHTML = "<br>______________________________________________________________";
                        answerLine.classList.add("answer-line");
                        generatedSen.appendChild(answerLine);
                    }
                });
            } else {
                const originalText = block.data.text;
                const sentencesArray = originalText.split("\n");
                sentencesArray.forEach((sen) => {
                    generatedSen = document.createElement("li");
                    generatedSen.textContent = sen;
                    scrambledSenText.appendChild(generatedSen);
                });
            }

            generatedSenContainer.appendChild(scrambledSenText);

            blockElement = generatedSenContainer;
        }

        if (block.type === "blanks-passage") {
            const generatedPassageContainer = document.createElement("div");

            if (block.data.showHeading && block.data.heading) {
                const headingPar = document.createElement("p");
                const baseHeading = block.data.heading || "";
                headingPar.textContent = letter ? `${letter}. ${baseHeading}` : baseHeading;
                headingPar.classList.add("bold");
                generatedPassageContainer.appendChild(headingPar);
            } else if (letter) {
                const letterLine = document.createElement("p");
                letterLine.textContent = `${letter}.`;
                letterLine.classList.add("bold");
                generatedPassageContainer.appendChild(letterLine);
            }

            if (block.data.showWordList) {
                const generatedWordList = document.createElement("div");
                generatedWordList.classList.add("word-bank");

                // fall back gracefully if wordList is missing (old data)
                const words = block.data.wordList && block.data.wordList.length
                    ? block.data.wordList
                    : makeWordListFromPassage(block.data.text);

                words.forEach((el, index) => {
                    const wordBankItem = document.createElement("span");
                    wordBankItem.classList.add("word-bank-item");
                    wordBankItem.textContent = el;
                    generatedWordList.appendChild(wordBankItem);

                    // add spaces after each word except the last
                    if (index < words.length - 1) {
                        generatedWordList.appendChild(document.createTextNode("\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"));
                    }
                });

                generatedPassageContainer.appendChild(generatedWordList);
            }
            
            const passage = document.createElement("p");
            if (currentViewMode === "student") {
                const passageSource = block.data.text;
                const passageWithBlanks = passageSource.replace(/\[.*?\]/g, "________");
                passage.textContent = passageWithBlanks;
                generatedPassageContainer.appendChild(passage);
            } else {
                const passageSource = block.data.text;
                const passageWithUnderlinedWords = passageSource.replaceAll("[", `<span class="underlined">`).replaceAll("]", `</span>`);
                passage.innerHTML = passageWithUnderlinedWords;
                generatedPassageContainer.appendChild(passage);
            }

            blockElement = generatedPassageContainer;
        }

        if (block.type === "multiple-choice-question") {
            const generatedMCQsContainer = document.createElement("div");
            generatedMCQsContainer.classList.add("simulate-line-height");

            if (block.data.showHeading && block.data.heading) {
                const headingPar = document.createElement("p");
                const baseHeading = block.data.heading || "";
                headingPar.textContent = letter ? `${letter}. ${baseHeading}` : baseHeading;
                headingPar.classList.add("bold");
                generatedMCQsContainer.appendChild(headingPar);
            } else if (letter) {
                const letterLine = document.createElement("p");
                letterLine.textContent = `${letter}.`;
                letterLine.classList.add("bold");
                generatedMCQsContainer.appendChild(letterLine);
            }

            const generatedMCQsText = document.createElement("div");
            if (currentViewMode === "student") {
                const questionsToRender = block.data.questions;
                questionsToRender.forEach((question, index) => {
                    const generatedQuestionItem = document.createElement("div");

                    // Single table for question + choices
                    const generatedChoicesTable = document.createElement("table");
                    generatedChoicesTable.classList.add("multiple-choice-options");

                    // ----- First row: space-and-number + question -----
                    const questionRow = document.createElement("tr");

                    const spaceAndNumber = document.createElement("td");
                    spaceAndNumber.classList.add("space-and-number");
                    spaceAndNumber.textContent = `___ ${index + 1}. `;
                    questionRow.appendChild(spaceAndNumber);

                    // Compute how many columns the choices will use
                    const choiceCols = question.choices.length * 2; // letter + text per choice

                    const questionText = document.createElement("td");
                    questionText.colSpan = choiceCols;
                    questionText.textContent = `${question.prompt}`;
                    questionRow.appendChild(questionText);

                    generatedChoicesTable.appendChild(questionRow);

                    // ----- Second row: buffer cell + all choices in one row -----
                    const generatedChoiceRow = document.createElement("tr");

                    const bufferCell = document.createElement("td");
                    bufferCell.classList.add("buffer-cell");
                    generatedChoiceRow.appendChild(bufferCell);

                    question.choices.forEach((choice, choiceIndex) => {
                        const letterCell = document.createElement("td");
                        letterCell.classList.add("letter-cell");
                        const letter = String.fromCharCode(97 + choiceIndex);
                        letterCell.innerHTML = `${letter}.`;
                        generatedChoiceRow.appendChild(letterCell);

                        const generatedChoiceText = document.createElement("td");
                        generatedChoiceText.classList.add("choice-cell");
                        generatedChoiceText.textContent = `${choice}`;
                        generatedChoiceRow.appendChild(generatedChoiceText);
                    });

                    generatedChoicesTable.appendChild(generatedChoiceRow);

                    generatedQuestionItem.appendChild(generatedChoicesTable);
                    generatedMCQsText.appendChild(generatedQuestionItem);
                    generatedMCQsContainer.appendChild(generatedMCQsText);
                });
            } else {
                const questionsToRender = block.data.questions;
                questionsToRender.forEach((question, index) => {
                    const generatedQuestionItem = document.createElement("div");

                    // Single table for question + choices (answer key view)
                    const generatedChoicesTable = document.createElement("table");
                    generatedChoicesTable.classList.add("multiple-choice-options");
                    generatedMCQsContainer.classList.add("simulate-line-height");

                    const correctIndex = Number(question.correctIndex);
                    const abcd = String.fromCharCode(97 + correctIndex);

                    // ----- First row: underlined correct letter + number + question -----
                    const questionRow = document.createElement("tr");

                    const spaceAndNumber = document.createElement("td");
                    spaceAndNumber.classList.add("space-and-number");
                    // underline the correct letter, then show the number
                    spaceAndNumber.innerHTML =
                        `<span class="underlined">&nbsp;&nbsp;${abcd}&nbsp;&nbsp;</span> ${index + 1}. `;
                    questionRow.appendChild(spaceAndNumber);

                    // how many columns the choices will use in row 2 (same logic as student)
                    const choiceCols = question.choices.length * 2; // letter + text per choice

                    const questionText = document.createElement("td");
                    questionText.colSpan = choiceCols;
                    questionText.textContent = `${question.prompt}`;
                    questionRow.appendChild(questionText);

                    generatedChoicesTable.appendChild(questionRow);

                    // ----- Second row: buffer cell + all choices in one row -----
                    const generatedChoiceRow = document.createElement("tr");

                    const bufferCell = document.createElement("td");
                    bufferCell.classList.add("buffer-cell");
                    generatedChoiceRow.appendChild(bufferCell);

                    question.choices.forEach((choice, choiceIndex) => {
                        const letterCell = document.createElement("td");
                        letterCell.classList.add("letter-cell");
                        const letter = String.fromCharCode(97 + choiceIndex);
                        letterCell.innerHTML = `${letter}.`;
                        generatedChoiceRow.appendChild(letterCell);

                        const generatedChoiceText = document.createElement("td");
                        generatedChoiceText.classList.add("choice-cell");
                        generatedChoiceText.textContent = `${choice}`;
                        generatedChoiceRow.appendChild(generatedChoiceText);
                    });

                    generatedChoicesTable.appendChild(generatedChoiceRow);

                    generatedQuestionItem.appendChild(generatedChoicesTable);
                    generatedMCQsText.appendChild(generatedQuestionItem);
                    generatedMCQsContainer.appendChild(generatedMCQsText);
                });
            }

            blockElement = generatedMCQsContainer;
        }

        if (block.type === "cloze-test")  {
            const generatedDiv = document.createElement("div");

            if (block.data.showHeading && block.data.heading) {
                const headingPar = document.createElement("p");
                const baseHeading = block.data.heading || "";
                headingPar.textContent = letter ? `${letter}. ${baseHeading}` : baseHeading;
                headingPar.classList.add("bold");
                generatedDiv.appendChild(headingPar);
            } else if (letter) {
                const letterLine = document.createElement("p");
                letterLine.textContent = `${letter}.`;
                letterLine.classList.add("bold");
                generatedDiv.appendChild(letterLine);
            }

            const passage = document.createElement("p");
            if (currentViewMode === "student") {
                const passageSource = block.data.text;

                let count = 0;
                const passageWithNumberedBlanks = passageSource.replace(/\[.*?\]/g, () => {
                    count++;
                    return `<span class="bold">${count}.</span> ________`;
                });

                passage.innerHTML = passageWithNumberedBlanks;
                generatedDiv.appendChild(passage);

                const questions = block.data.questions;
                const tableOfChoices = document.createElement("table");
                tableOfChoices.classList.add("multiple-choice-options");
                questions.forEach((question, index) => {
                    const questionRow = document.createElement("tr");

                    const spaceAndNumber = document.createElement("td");
                    spaceAndNumber.classList.add("space-and-number");
                    spaceAndNumber.textContent = `___ ${index + 1}. `;
                    questionRow.appendChild(spaceAndNumber);

                    question.choices.forEach((choice, choiceIndex) => {
                        const letterCell = document.createElement("td");
                        letterCell.classList.add("letter-cell");
                        const letter = String.fromCharCode(97 + choiceIndex);
                        letterCell.innerHTML = `${letter}.`;
                        questionRow.appendChild(letterCell);

                        const generatedChoiceText = document.createElement("td");
                        generatedChoiceText.classList.add("choice-cell");
                        generatedChoiceText.textContent = `${choice}`;
                        questionRow.appendChild(generatedChoiceText);
                    });

                    tableOfChoices.appendChild(questionRow);
                })

                generatedDiv.appendChild(tableOfChoices);

            } else {
                const passageSource = block.data.text;
                const questions = block.data.questions || [];

                let count = 0;
                const passageWithAnswers = passageSource.replace(/\[.*?\]/g, () => {
                    const question = questions[count];
                    count++;

                    if (!question) {
                        return `<span class="bold">${count}.</span> <span class="underlined">________</span>`;
                    }

                    const correctChoice = question.choices[question.correctIndex];
                    return `<span class="bold">${count}.</span> <span class="underlined">${correctChoice}</span>`;
                });

                passage.innerHTML = passageWithAnswers;
                generatedDiv.appendChild(passage);

                const tableOfChoices = document.createElement("table");
                tableOfChoices.classList.add("multiple-choice-options");
                questions.forEach((question, index) => {
                    const questionRow = document.createElement("tr");

                    const correctIndex = Number(question.correctIndex);
                    const abcd = String.fromCharCode(97 + correctIndex);

                    const spaceAndNumber = document.createElement("td");
                    spaceAndNumber.classList.add("space-and-number");
                    spaceAndNumber.innerHTML =
                        `<span class="underlined">&nbsp;&nbsp;${abcd}&nbsp;&nbsp;</span> ${index + 1}. `;
                    questionRow.appendChild(spaceAndNumber);

                    question.choices.forEach((choice, choiceIndex) => {
                        const letterCell = document.createElement("td");
                        letterCell.classList.add("letter-cell");
                        const letter = String.fromCharCode(97 + choiceIndex);
                        letterCell.innerHTML = `${letter}.`;
                        questionRow.appendChild(letterCell);

                        const generatedChoiceText = document.createElement("td");
                        generatedChoiceText.classList.add("choice-cell");
                        generatedChoiceText.textContent = `${choice}`;
                        questionRow.appendChild(generatedChoiceText);
                    });

                    tableOfChoices.appendChild(questionRow);
                })

                generatedDiv.appendChild(tableOfChoices);
            }

            blockElement = generatedDiv;
        }

        if (block.type === "letter-removal") {
            const generatedDiv = document.createElement("div");

            if (block.data.showHeading && block.data.heading) {
                const headingPar = document.createElement("p");
                const baseHeading = block.data.heading || "";
                headingPar.textContent = letter ? `${letter}. ${baseHeading}` : baseHeading;
                headingPar.classList.add("bold");
                generatedDiv.appendChild(headingPar);
            } else if (letter) {
                const letterLine = document.createElement("p");
                letterLine.textContent = `${letter}.`;
                letterLine.classList.add("bold");
                generatedDiv.appendChild(letterLine);
            }

            const modifiedSenText = document.createElement(block.data.numbered ? "ol" : "ul");
            const questions = block.data.questions;


            if (currentViewMode === "student") {
                questions.forEach((question) => {
                    const listItem = document.createElement("li");
                    listItem.textContent = question.modifiedText;
                    listItem.classList.add("preserve-spaces");
                    modifiedSenText.appendChild(listItem);
                });
            } else {
                questions.forEach((question) => {
                    const listItem = document.createElement("li");
                    listItem.textContent = question.sentence;
                    listItem.classList.add("preserve-spaces");
                    modifiedSenText.appendChild(listItem);
                });
            }

            generatedDiv.appendChild(modifiedSenText);
            blockElement = generatedDiv;
        }

        if (block.type === "scrambled-words") {
            const generatedSenContainer = document.createElement("div");

            if (block.data.showHeading && block.data.heading) {
                const headingPar = document.createElement("p");
                const baseHeading = block.data.heading || "";
                headingPar.textContent = letter ? `${letter}. ${baseHeading}` : baseHeading;
                headingPar.classList.add("bold");
                generatedSenContainer.appendChild(headingPar);
            } else if (letter) {
                const letterLine = document.createElement("p");
                letterLine.textContent = `${letter}.`;
                letterLine.classList.add("bold");
                generatedSenContainer.appendChild(letterLine);
            }

            const scrambledSenText = document.createElement(block.data.numbered ? "ol" : "ul");
            if (currentViewMode === "student") {
                const scrambledSource = block.data.questions;
                scrambledSource.forEach((sen) => {
                    generatedSen = document.createElement("li");
                    generatedSen.innerHTML = sen.modifiedText;
                    scrambledSenText.appendChild(generatedSen);
                    if (block.data.showAnswerLines) {
                        const answerLine = document.createElement("div");
                        answerLine.innerHTML = "<br>______________________________________________________________";
                        answerLine.classList.add("answer-line");
                        generatedSen.appendChild(answerLine);
                    }
                });
            } else {
                const originalText = block.data.text;
                const sentencesArray = originalText.split("\n");
                sentencesArray.forEach((sen) => {
                    generatedSen = document.createElement("li");
                    generatedSen.textContent = sen;
                    scrambledSenText.appendChild(generatedSen);
                });
            }

            generatedSenContainer.appendChild(scrambledSenText);

            blockElement = generatedSenContainer;
        }

        if (block.type === "word-grid") {
            const generatedDiv = document.createElement("div");

            if (block.data.showHeading && block.data.heading) {
                const headingPar = document.createElement("p");
                const baseHeading = block.data.heading || "";
                headingPar.textContent = letter ? `${letter}. ${baseHeading}` : baseHeading;
                headingPar.classList.add("bold");
                generatedDiv.appendChild(headingPar);
            } else if (letter) {
                const letterLine = document.createElement("p");
                letterLine.textContent = `${letter}.`;
                letterLine.classList.add("bold");
                generatedDiv.appendChild(letterLine);
            }

            const generatedTable = document.createElement("table");
            generatedTable.classList.add("word-grid-table");
            const rows = block.data.rows;
            const cols = block.data.cols;
            const cells = block.data.cells || [];
            const blanks = block.data.blanks || [];
            const headerRow = block.data.headerRow;
            const headerCol = block.data.headerCol;

            for (let r = 0; r < block.data.rows; r++) {
                const row = document.createElement("tr");

                for (let c = 0; c < block.data.cols; c++) {
                    const isHeader = 
                    (block.data.headerRow && r === 0) ||
                    (block.data.headerCol && c === 0);
                
                    const cell = document.createElement(isHeader ? "th" : "td");

                    const cellText = cells[r] && cells[r][c] ? cells[r][c] : "";
                    const isBlank = blanks[r] && blanks[r][c];

                    if (currentViewMode === "student" && isBlank) {
                        cell.textContent = "";
                    } else {
                        cell.textContent = cellText;
                    }

                    if (currentViewMode === "teacher" && isBlank && cellText) {
                        cell.classList.add("italics");
                    }
                    
                    row.appendChild(cell);
                }

                generatedTable.appendChild(row);
            }

            generatedDiv.appendChild(generatedTable);
            blockElement = generatedDiv;
        }

        if (blockElement) {
            contentContainer.appendChild(blockElement);

            const br = document.createElement("br");
            contentContainer.appendChild(br);
            worksheet.appendChild(wrapper);
        }
    })
}

// --- Toolbar visibility (JS-driven; desktop hover emulation + mobile tap) ---
let toolbarGlobalDismissInit = false;

function closeAllToolbars(exceptEl = null) {
  document.querySelectorAll(".exercise-block").forEach(el => {
    if (exceptEl && el === exceptEl) return;

    el.classList.remove("toolbar-visible");

    // Disable any toolbar buttons inside this block when closing
    el.querySelectorAll(".block-toolbar .toolbar-btns").forEach(btn => {
      btn.disabled = true;
    });
  });
}

function initToolbarGlobalDismiss() {
  if (toolbarGlobalDismissInit) return;
  toolbarGlobalDismissInit = true;

  // Tap/click outside closes any open toolbar
  document.addEventListener("pointerdown", (e) => {
    if (!e.target.closest(".exercise-block")) closeAllToolbars();
  }, true);

  // Esc closes
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllToolbars();
  });
}

function deviceCanHover() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function deviceIsTouchLike() {
  return window.matchMedia("(hover: none), (pointer: coarse)").matches;
}

function createBlockWrapper(block) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("exercise-block");
  wrapper.dataset.blockId = block.id;

  const contentContainer = document.createElement("div");
  contentContainer.classList.add("block-content");

  const toolbar = document.createElement("div");
  toolbar.classList.add("block-toolbar");

  const editBtn = document.createElement("button");
  editBtn.innerHTML = `<img src="./assets/edit.svg">`;
  editBtn.classList.add("toolbar-btns");

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = `<img src="./assets/remove.svg">`;
  deleteBtn.classList.add("toolbar-btns");

  const upBtn = document.createElement("button");
  upBtn.innerHTML = `<img src="./assets/up.svg">`;
  upBtn.classList.add("toolbar-btns");

  const downBtn = document.createElement("button");
  downBtn.innerHTML = `<img src="./assets/down.svg">`;
  downBtn.classList.add("toolbar-btns");

  const letterBtn = document.createElement("button");
  const letterIcon = block.data.showLetter ? "./assets/abc-color.svg" : "./assets/abc.svg";
  letterBtn.innerHTML = `<img src="${letterIcon}">`;
  letterBtn.classList.add("toolbar-btns");

  const btns = [editBtn, deleteBtn, upBtn, downBtn, letterBtn];

  // --- JS-driven visibility rules ---
  const setToolbarVisible = (visible) => {
    wrapper.classList.toggle("toolbar-visible", !!visible);

    // HARD GUARANTEE: if toolbar isn't visible, buttons are disabled.
    // This prevents any "invisible but clickable" bugs regardless of CSS.
    btns.forEach(b => {
      b.disabled = !visible;
    });
  };

  // Start hidden/disabled
  setToolbarVisible(false);

  const showToolbar = () => {
    closeAllToolbars(wrapper);
    setToolbarVisible(true);
  };

  const hideToolbar = () => {
    setToolbarVisible(false);
  };

  // Desktop: show on real mouse hover.
  // We DO NOT rely on matchMedia() here because it can be inconsistent across browsers.
  wrapper.addEventListener("pointerenter", (e) => {
    if (e.pointerType !== "mouse") return;
    showToolbar();
  });

  wrapper.addEventListener("pointerleave", (e) => {
    if (e.pointerType !== "mouse") return;
    hideToolbar();
  });

  // Keyboard accessibility: show when focus is inside the block (desktop only).
  // On touch, focus behavior can fire during taps and cause the toolbar to open unexpectedly.
  wrapper.addEventListener("focusin", () => {
    if (deviceIsTouchLike()) return;
    showToolbar();
  });
  wrapper.addEventListener("focusout", (e) => {
    if (deviceIsTouchLike()) return;
    const next = e.relatedTarget;
    if (!next || !wrapper.contains(next)) hideToolbar();
  });

  // Mobile/touch: tap toggles the toolbar.
  // Capture + preventDefault ensures the tap that opens it can't also click a button.
  wrapper.addEventListener("pointerdown", (e) => {
    if (!deviceIsTouchLike()) return;

    // If tapping on a toolbar button, let the button handle it.
    if (e.target.closest(".block-toolbar")) return;

    // Prevent the tap from becoming an immediate click on a toolbar button
    // that appears under the finger after we open.
    e.preventDefault();
    e.stopPropagation();

    const wasOpen = wrapper.classList.contains("toolbar-visible");
    closeAllToolbars(wrapper);

    if (!wasOpen) {
      // Opening: show highlight/toolbar, but suppress the very next toolbar click.
      wrapper.dataset.suppressNextToolbarClick = "1";
      setToolbarVisible(true);
      // Remove suppression shortly after; long enough to cover the synthetic click.
      setTimeout(() => {
        delete wrapper.dataset.suppressNextToolbarClick;
      }, 450);
    } else {
      // Closing
      setToolbarVisible(false);
    }
  }, true);

  // If we just opened the toolbar from a tap, cancel the next toolbar click.
  // This prevents the first tap (intended to "activate" the block) from also
  // triggering a button that appears under the finger.
  wrapper.addEventListener("click", (e) => {
    if (!deviceIsTouchLike()) return;
    if (wrapper.dataset.suppressNextToolbarClick !== "1") return;
    if (!e.target.closest(".block-toolbar")) return;

    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  }, true);

  // --- Button actions (also close toolbar) ---
  const closeAfter = (fn) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    hideToolbar();
    fn();
  };

  editBtn.addEventListener("click", closeAfter(() => editExercise(block.id)));
  deleteBtn.addEventListener("click", closeAfter(() => deleteExercise(block.id)));
  upBtn.addEventListener("click", closeAfter(() => moveUp(block.id)));
  downBtn.addEventListener("click", closeAfter(() => moveDown(block.id)));
  letterBtn.addEventListener("click", closeAfter(() => toggleLettering(block.id)));

  toolbar.appendChild(editBtn);
  toolbar.appendChild(deleteBtn);
  toolbar.appendChild(upBtn);
  toolbar.appendChild(downBtn);
  toolbar.appendChild(letterBtn);

  wrapper.appendChild(toolbar);
  wrapper.appendChild(contentContainer);

  return { editBtn, deleteBtn, upBtn, downBtn, letterBtn, contentContainer, wrapper };
}

function openEditorForType(caption, fn, typeId) {
    currentEditingBlockId = null;
    currentEditingType = typeId;

    closeMenu(createExerciseMenu);
    showMenu(editingInterface);

    updateSavingDisabledUI();
    exerciseType.textContent = `Create ${caption}`;
    fn();
    hideToolbarButtons();
    hamburgerMenuBtn.classList.add("hidden");
}

function saveEdit() {
    const bodyTextarea = editorBody.querySelector(".text-box");
    const hasBodyTextarea = !!bodyTextarea;
    const bodyValue = hasBodyTextarea ? bodyTextarea.value : "";

    const headingTextarea = headingContainer.querySelector(".heading-input");

    const headingValue = headingTextarea ? headingTextarea.value : "";

    const showHeadingElement = document.getElementById("headingCheckbox");
    const showHeadingValue = showHeadingElement ? showHeadingElement.checked : true;

    const numberedElement = editorBody.querySelector("#numberedCheckbox");
    const answerLinesElement = editorBody.querySelector("#answerLinesCheckbox");

    const numberedValue = numberedElement ? numberedElement.checked : true;
    const answerLinesValue = answerLinesElement ? answerLinesElement.checked : true;

    const showWordListElement = editorBody.querySelector("#showWordListCheckbox");
    const showWordListValue = showWordListElement ? showWordListElement.checked : true;

    // Title options
    const includeNameElement  = editorBody.querySelector("#includeNameCheckbox");
    const includeClassElement = editorBody.querySelector("#includeClassCheckbox");
    const includeDateElement  = editorBody.querySelector("#includeDateCheckbox");

    const includeNameValue  = includeNameElement ? includeNameElement.checked : true;
    const includeClassValue = includeClassElement ? includeClassElement.checked : true;
    const includeDateValue  = includeDateElement ? includeDateElement.checked : true;

    // Essay-questions: radio buttons for answer box type & size
    const selectedTypeRadio = editorBody.querySelector('input[name="answerBoxType"]:checked');
    const selectedSizeRadio = editorBody.querySelector('input[name="answerBoxSize"]:checked');

    const answerBoxTypeValue = selectedTypeRadio ? selectedTypeRadio.value : "lined";
    const answerBoxSizeValue = selectedSizeRadio ? selectedSizeRadio.value : "paragraph";

    // Most exercise types require something in the main textarea.
    // The word-grid type doesn't use the main textarea, so skip this check for it.
    const isWordGrid =
        currentEditingType === "word-grid" ||
        (currentEditingBlockId !== null &&
         exerciseBlocks.find(b => b.id === currentEditingBlockId)?.type === "word-grid");

    if (!isWordGrid && hasBodyTextarea && bodyValue.trim() === "") {
        alert("Please type your exercise into the text box.");
        return;
    }

    // save when editing existing block
    if (currentEditingBlockId !== null) {
        const block = exerciseBlocks.find(b => b.id === currentEditingBlockId);
    if (block) {
        if (block.type === "title") {
            block.data = {
                text: bodyValue,
                showLetter: block.data.showLetter,
                includeName: includeNameValue,
                includeClass: includeClassValue,
                includeDate: includeDateValue
            };
            } else if (block.type === "scrambled-sentence") {
                block.data = {
                    heading: headingValue,
                    text: bodyValue,
                    scrambledLines: makeScrambledLines(bodyValue),
                    numbered: numberedValue,
                    showAnswerLines: answerLinesValue,
                    showLetter: block.data.showLetter,
                    showHeading: showHeadingValue
                };
            } else if (block.type === "blanks-passage") {
                if (!bodyValue.match(/\[(.*?)\]/g)) {
                    alert("Remember to include [square brackets] for the words you want to remove for the exercise.");
                    return;
                }

                block.data = {
                    heading: headingValue,
                    text: bodyValue,
                    showWordList: showWordListValue,
                    wordList: makeWordListFromPassage(bodyValue),
                    showLetter: block.data.showLetter,
                    showHeading: showHeadingValue
                    };
            } else if (block.type === "multiple-choice-question") {
                const isValid = validateMcqInput(bodyValue);
                if (!isValid) return;

                const questions = makeMcqQuestions(bodyValue);

                questions.forEach((question) => {
                    const correctAnswer = question.choices[question.correctIndex];
                    const shuffled = [...question.choices];

                    for (let i = shuffled.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                    }
                    question.choices = shuffled;
                    question.correctIndex = shuffled.indexOf(correctAnswer);
                });

                block.data = {
                    heading: headingValue,
                    text: bodyValue,
                    numbered: numberedValue,
                    showLetter: block.data.showLetter,
                    questions: questions,
                    showHeading: showHeadingValue
                    };
            } else if (block.type === "word-matching") {
                const isValid = validateMatchingInput(bodyValue);
                if (!isValid) return;

                const { pairs, rightOptions } = makeWordMatchingData(bodyValue);

            block.data = {
                heading: headingValue,
                text: bodyValue,
                showLetter: block.data.showLetter,
                numbered: numberedValue,
                pairs,
                rightOptions,
                showHeading: showHeadingValue
            };
            } else if (block.type === "cloze-test") {
                const isValid = validateClozeInput(bodyValue);
                if (!isValid) return;

                const questions = makeClozeQuestions(bodyValue);

                questions.forEach((question) => {
                    const correctAnswer = question.choices[question.correctIndex];
                    const shuffled = [...question.choices];

                    for (let i = shuffled.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                    }
                    question.choices = shuffled;
                    question.correctIndex = shuffled.indexOf(correctAnswer);
                });

                block.data = {
                    heading: headingValue,
                    text: bodyValue,
                    showLetter: block.data.showLetter,
                    questions: questions,
                    showHeading: showHeadingValue
                    };
            } else if (block.type === "essay-questions") {
                block.data = {
                    heading: headingValue,
                    text: bodyValue,
                    showLetter: block.data.showLetter,
                    answerBoxType: answerBoxTypeValue,
                    answerBoxSize: answerBoxSizeValue,
                    showHeading: showHeadingValue
                };
            } else if (block.type === "letter-removal") {
                const preserveInitialEl = editorBody.querySelector("#preserveInitialCheckbox");
                const preserveFinalEl   = editorBody.querySelector("#preserveFinalCheckbox");
                const preserveRandomEl  = editorBody.querySelector("#preserveRandomCheckbox");

                const preserveInitialValue = preserveInitialEl ? preserveInitialEl.checked : false;
                const preserveFinalValue   = preserveFinalEl   ? preserveFinalEl.checked   : false;
                const preserveRandomValue  = preserveRandomEl  ? preserveRandomEl.checked  : false;

                const questions = makeLetterRemovalQuestions(bodyValue, {
                    preserveInitial: preserveInitialValue,
                    preserveFinal:   preserveFinalValue,
                    preserveRandom:  preserveRandomValue
                });

                block.data = {
                    heading: headingValue,
                    text: bodyValue,
                    questions,
                    showLetter: block.data.showLetter,
                    showHeading: showHeadingValue,
                    numbered: block.data.numbered ?? true,
                    preserveInitial: preserveInitialValue,
                    preserveFinal:   preserveFinalValue,
                    preserveRandom:  preserveRandomValue
                };
            } else if (block.type === "scrambled-words") {
                const underlineInitialEl = editorBody.querySelector("#underlineInitialCheckbox");
                const underlineInitialValue = underlineInitialEl ? underlineInitialEl.checked : true;

                const questions = makeScrambledWords(bodyValue, underlineInitialValue);

                block.data = {
                    heading: headingValue,
                    text: bodyValue,
                    questions,
                    numbered: numberedValue,
                    showAnswerLines: answerLinesValue,
                    showLetter: block.data.showLetter,
                    showHeading: showHeadingValue,
                    underlineInitial: underlineInitialValue
                };
            } else if (block.type === "word-grid") {
                const rowsInput = editorBody.querySelector("#wordGridRows");
                const colsInput = editorBody.querySelector("#wordGridCols");

                const headerRowCheckbox = document.getElementById("wordGridHeaderRow");
                const headerColCheckbox = document.getElementById("wordGridHeaderCol");

                const headerRowValue =
                    headerRowCheckbox ? headerRowCheckbox.checked : (block.data.headerRow ?? false);
                const headerColValue =
                    headerColCheckbox ? headerColCheckbox.checked : (block.data.headerCol ?? false);

                // Per‑cell controls live inside .word-grid-editor; header checkboxes sit outside the grid.
                const gridInputs = editorBody.querySelectorAll(".word-grid-editor input[type='text']");
                const allCheckboxes = editorBody.querySelectorAll(".word-grid-editor input[type='checkbox']");
                const gridCheckboxes = Array.from(allCheckboxes).filter(cb =>
                    cb.id !== "wordGridHeaderRow" && cb.id !== "wordGridHeaderCol"
                );

                let rows = rowsInput ? Number(rowsInput.value) : NaN;
                let cols = colsInput ? Number(colsInput.value) : NaN;

                if (!rows || rows < 1) {
                    rows = typeof block.data.rows === "number" && block.data.rows > 0 ? block.data.rows : 5;
                }

                if (!cols || cols < 1) cols = block.data?.cols ?? 1;
                if (cols > 5) cols = 5;

                const cells = Array.from({ length: rows }, () => Array(cols).fill(""));
                const blanks = Array.from({ length: rows }, () => Array(cols).fill(false));

                const inputArray = Array.from(gridInputs);
                const checkboxArray = Array.from(gridCheckboxes);

                // Map inputs and checkboxes row‑by‑row using DOM order
                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < cols; c++) {
                        const idx = r * cols + c;

                        const input = inputArray[idx];
                        if (input) {
                            cells[r][c] = input.value.trim();
                        }

                        const cb = checkboxArray[idx];
                        if (cb) {
                            // Checked means "blank this cell" in the exercise.
                            blanks[r][c] = cb.checked;
                        }
                    }
                }

                block.data = {
                    heading: headingValue,
                    rows,
                    cols,
                    headerRow: headerRowValue,
                    headerCol: headerColValue,
                    cells,
                    blanks,
                    showLetter: block.data.showLetter,
                    showHeading: showHeadingValue
                };
            } else {
                block.data.text = bodyValue;
            }
        }
    }

    // save when creating new
    if (currentEditingBlockId === null && currentEditingType) {
        const newId = exerciseBlocks.length ? Math.max(...exerciseBlocks.map(b => b.id)) + 1 : 1;

        let data;

        if (currentEditingType === "title") {
            data = {
                text: bodyValue,
                showLetter: true,
                includeName: includeNameValue,
                includeClass: includeClassValue,
                includeDate: includeDateValue,
                showHeading: showHeadingValue
            };
        } else if (currentEditingType === "scrambled-sentence") {
            data = {
                heading: headingValue,
                text: bodyValue,
                scrambledLines: makeScrambledLines(bodyValue),
                numbered: numberedValue,
                showAnswerLines: answerLinesValue,
                showLetter: true,
                showHeading: showHeadingValue
            };
        } else if (currentEditingType === "blanks-passage") {
            data = {
                heading: headingValue,
                text: bodyValue,
                showWordList: showWordListValue,
                wordList: makeWordListFromPassage(bodyValue),
                showLetter: true,
                showHeading: showHeadingValue
                };
        } else if (currentEditingType === "multiple-choice-question") {
                const questions = makeMcqQuestions(bodyValue);

                questions.forEach((question) => {
                    const correctAnswer = question.choices[question.correctIndex];
                    const shuffled = [...question.choices];

                    for (let i = shuffled.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                    }
                    question.choices = shuffled;
                    question.correctIndex = shuffled.indexOf(correctAnswer);
                });
            data = {
                heading: headingValue,
                text: bodyValue,
                numbered: numberedValue,
                showLetter: true,
                questions: questions,
                showHeading: showHeadingValue
                };
        } else if (currentEditingType === "word-matching") {
            const isValid = validateMatchingInput(bodyValue);
            if (!isValid) return;

            const { pairs, rightOptions } = makeWordMatchingData(bodyValue);

            data = {
                heading: headingValue,
                text: bodyValue,
                showLetter: true,
                numbered: numberedValue,
                pairs,
                rightOptions,
                showHeading: showHeadingValue
            };

        } else if (currentEditingType === "cloze-test") {
            const isValid = validateClozeInput(bodyValue);
            if (!isValid) return;

            const questions = makeClozeQuestions(bodyValue);

            questions.forEach((question) => {
                const correctAnswer = question.choices[question.correctIndex];
                const shuffled = [...question.choices];

                for (let i = shuffled.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                }
                question.choices = shuffled;
                question.correctIndex = shuffled.indexOf(correctAnswer);
            });

            data = {
                heading: headingValue,
                text: bodyValue,
                showLetter: true,
                questions,
                showHeading: showHeadingValue
            };
    
        } else if (currentEditingType === "essay-questions") {
            data = {
                heading: headingValue,
                text: bodyValue,
                showLetter: true,
                answerBoxType: answerBoxTypeValue,
                answerBoxSize: answerBoxSizeValue,
                showHeading: showHeadingValue
            };
        } else if (currentEditingType === "letter-removal") {
            const preserveInitialEl = editorBody.querySelector("#preserveInitialCheckbox");
            const preserveFinalEl   = editorBody.querySelector("#preserveFinalCheckbox");
            const preserveRandomEl  = editorBody.querySelector("#preserveRandomCheckbox");

            const preserveInitialValue = preserveInitialEl ? preserveInitialEl.checked : false;
            const preserveFinalValue   = preserveFinalEl   ? preserveFinalEl.checked   : false;
            const preserveRandomValue  = preserveRandomEl  ? preserveRandomEl.checked  : false;

            const questions = makeLetterRemovalQuestions(bodyValue, {
                preserveInitial: preserveInitialValue,
                preserveFinal:   preserveFinalValue,
                preserveRandom:  preserveRandomValue
            });

            data = {
                heading: headingValue,
                text: bodyValue,
                questions,
                showLetter: true,
                showHeading: showHeadingValue,
                numbered: numberedValue,
                preserveInitial: preserveInitialValue,
                preserveFinal:   preserveFinalValue,
                preserveRandom:  preserveRandomValue
            };
        } else if (currentEditingType === "scrambled-words") {
            const underlineInitialEl = editorBody.querySelector("#underlineInitialCheckbox");
            const underlineInitialValue = underlineInitialEl ? underlineInitialEl.checked : true;

            const questions = makeScrambledWords(bodyValue, underlineInitialValue);

            data = {
                heading: headingValue,
                text: bodyValue,
                questions,
                numbered: numberedValue,
                showAnswerLines: answerLinesValue,
                showLetter: true,
                showHeading: showHeadingValue,
                underlineInitial: underlineInitialValue
            };
        } else if (currentEditingType === "word-grid") {
            const rowsInput = editorBody.querySelector("#wordGridRows");
            const colsInput = editorBody.querySelector("#wordGridCols");

            const headerRowCheckbox = document.getElementById("wordGridHeaderRow");
            const headerColCheckbox = document.getElementById("wordGridHeaderCol");

            const headerRowValue =
                headerRowCheckbox ? headerRowCheckbox.checked : false;
            const headerColValue =
                headerColCheckbox ? headerColCheckbox.checked : false;

            // Per‑cell controls live inside .word-grid-editor; header checkboxes sit outside the grid.
            const gridInputs = editorBody.querySelectorAll(".word-grid-editor input[type='text']");
            const allCheckboxes = editorBody.querySelectorAll(".word-grid-editor input[type='checkbox']");
            const gridCheckboxes = Array.from(allCheckboxes).filter(cb =>
                cb.id !== "wordGridHeaderRow" && cb.id !== "wordGridHeaderCol"
            );

            let rows = rowsInput ? Number(rowsInput.value) : NaN;
            let cols = colsInput ? Number(colsInput.value) : NaN;

            if (!rows || rows < 1) {
                rows = 5;
            }

            if (!cols || cols < 1) cols = 1;
            if (cols > 5) cols = 5;

            const cells = Array.from({ length: rows }, () => Array(cols).fill(""));
            const blanks = Array.from({ length: rows }, () => Array(cols).fill(false));

            const inputArray = Array.from(gridInputs);
            const checkboxArray = Array.from(gridCheckboxes);

            // Map inputs and checkboxes row‑by‑row using DOM order
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const idx = r * cols + c;

                    const input = inputArray[idx];
                    if (input) {
                        cells[r][c] = input.value.trim();
                    }

                    const cb = checkboxArray[idx];
                    if (cb) {
                        // Checked means "blank this cell" in the exercise.
                        blanks[r][c] = cb.checked;
                    }
                }
            }

            data = {
                heading: headingValue,
                rows,
                cols,
                headerRow: headerRowValue,
                headerCol: headerColValue,
                cells,
                blanks,
                showLetter: true,
                showHeading: showHeadingValue
            };
        } else {
            data = {
                text: bodyValue,
                showLetter: true
            };
        }

        exerciseBlocks.push({
            id: newId,
            type: currentEditingType,
            data
        });
    }

    renderExerciseBlocks();
    persistWorksheet();
    alert("Saved");
}

function editExercise(blockId) {
    currentEditingBlockId = blockId;

    const block = exerciseBlocks.find(b => b.id === blockId);
    if (!block) return;

    currentEditingType = block.type;

    const typeConfig = exerciseTypes.find(t => t.id === block.type);
    if (!typeConfig) return;

    showMenu(editingInterface);
    hamburgerMenuBtn.classList.add("hidden");

    const caption = typeConfig.buttonCaption;
    exerciseType.textContent = `Edit ${caption}`;

    editorBody.innerHTML = "";

    let editorArg;

    const isTextOnly =
        block.type === "instruction";

    if (isTextOnly) {
        editorArg = (block.data && block.data.text) ? block.data.text : "";
    } else {
        editorArg = block.data || {};
    }

    typeConfig.buttonFunction(editorArg);
    updateSavingDisabledUI();
    hideToolbarButtons();
}

function deleteExercise(blockId) {
    exerciseBlocks = exerciseBlocks.filter(block => block.id !== blockId);
    renderExerciseBlocks();
    persistWorksheet();
}

function moveUp(blockId) {
    const index = exerciseBlocks.findIndex(block => block && block.id === blockId);
    if (index <= 0) return;

    const temp = exerciseBlocks[index - 1];
    exerciseBlocks[index - 1] = exerciseBlocks[index];
    exerciseBlocks[index] = temp;

    renderExerciseBlocks();
    persistWorksheet();
}

function moveDown(blockId) {
    const index = exerciseBlocks.findIndex(block => block && block.id === blockId);
    if (index === -1 || index >= exerciseBlocks.length - 1) return;
    
    const temp = exerciseBlocks[index + 1];
    exerciseBlocks[index + 1] = exerciseBlocks[index];
    exerciseBlocks[index] = temp;

    renderExerciseBlocks();
    persistWorksheet();
}

function toggleLettering(blockId) {
    const index = exerciseBlocks.findIndex(block => block && block.id === blockId);
    if (index === -1) return;

    const block = exerciseBlocks[index];
    block.data.showLetter = !block.data.showLetter;

    renderExerciseBlocks();
    persistWorksheet();
}

function hideToolbarButtons() {
    addExerciseBtn.classList.add("hidden");
    closeExerciseMenuBtn.classList.add("hidden");
    modeBtn.classList.add("hidden");
    copyBtn.classList.add("hidden");
    printBtn.classList.add("hidden");
}

function setToolbarButtons() {
    addExerciseBtn.classList.remove("hidden");
    closeExerciseMenuBtn.classList.add("hidden");
    modeBtn.classList.remove("hidden");
    copyBtn.classList.remove("hidden");
    printBtn.classList.remove("hidden");
    hamburgerMenuBtn.classList.remove("hidden");
    document.body.classList.remove("overlay-open");
}

function setOverlayOpen(isOpen) {
    document.body.classList.toggle("overlay-open", !!isOpen);
}

function handleModeChange() {
    if (currentViewMode === "student") {
        currentViewMode = "teacher";
        modeBtn.innerHTML = `<img src="./assets/teacher.svg">`;
    } else {
        currentViewMode = "student";
        modeBtn.innerHTML = `<img src="./assets/student.svg">`;
    }

    renderExerciseBlocks();
    persistWorksheet();
}

function initWorksheet() {
    initToolbarGlobalDismiss();
    const saved = localStorage.getItem("worksheetData");

    if (saved) {
        try {
            exerciseBlocks = JSON.parse(saved);
        } catch (e) {
            console.warn("Exercise data has issues. Using template data.");
            exerciseBlocks = structuredClone(sampleBlocks);
        }
    } else {
        exerciseBlocks = structuredClone(sampleBlocks);
    }

    renderExerciseBlocks();
    persistWorksheet();
}

function persistWorksheet() {
    localStorage.setItem(
        "worksheetData",
        JSON.stringify(exerciseBlocks)
    );
}

function loadTemplateWorksheet() {
    exerciseBlocks = structuredClone(sampleBlocks);
    persistWorksheet();
    renderExerciseBlocks();
    isViewingTemplateWorksheet = true;
}

// functions to build UI for individual exercises

function createTitleText(data = { text: "", includeName: true, includeClass: true, includeDate: true }) {
    headingContainer.innerHTML = "";
    exerciseDescription.textContent = "Please type the text for your title in the text area.";

    const nameChecked  = data.includeName !== false ? "checked" : "";
    const classChecked = data.includeClass !== false ? "checked" : "";
    const dateChecked  = data.includeDate !== false ? "checked" : "";

    editorBody.innerHTML = `
        <textarea class="text-box" placeholder="Type title text here">${data.text || ""}</textarea>
        <div class="checkboxGroup">
            <fieldset>
                <legend>Title Options</legend>
                    <div>
                        <label><input type="checkbox" id="includeNameCheckbox" ${nameChecked}> Include Name Label</label>
                    </div>
                    <div>
                        <label><input type="checkbox" id="includeClassCheckbox" ${classChecked}> Include Class Label</label>
                    </div>
                    <div>
                        <label><input type="checkbox" id="includeDateCheckbox" ${dateChecked}> Include Date Label</label>
                    </div>
            </fieldset>
        </div>
    `;
}

function createInstructionText(initialText = "") {
    headingContainer.innerHTML = "";
    exerciseDescription.textContent = "Please type the text for your instruction/note in the text area.";
    editorBody.innerHTML = `<textarea class="text-box" placeholder="Type instruction/note text here">${initialText}</textarea>`;
}

function createScrambledSentences(data = { heading: "Unscramble the following sentences.", text: "" }) {
    const headingChecked = data.showHeading !== false ? "checked" : "";
    headingContainer.innerHTML = `
        <label for="scramble-heading" class="label-top">Instruction</label><br><br>
        <textarea id="scramble-heading" class="heading-input">${data.heading || ""}</textarea>
        <input type="checkbox" id="headingCheckbox" ${headingChecked}><label for="headingCheckbox"> Include Instruction</label>
    `;
    setupHeadingToggle();

    exerciseDescription.textContent = "Please type the sentences you wish to use in the text area. Put each sentence on a new line.";

    const numberedChecked = data.numbered ? "checked" : "";
    const answerChecked = data.showAnswerLines ? "checked" : "";

    editorBody.innerHTML = `
        <textarea class="text-box" placeholder="Here is the first sentence.\nHere is the second sentence.">${data.text || ""}</textarea>
        <div class="checkboxGroup">
            <fieldset>
                <legend>Scrambling Options</legend>
                <div>
                    <input type="checkbox" id="numberedCheckbox" ${numberedChecked}><label for="numberedCheckbox"> Number answers</label>
                </div>
                <div>
                    <input type="checkbox" id="answerLinesCheckbox" ${answerChecked}><label for="answerLinesCheckbox"> Add answer lines</label>
                </div>
            </fieldset>
        </div>
    `;
}

function makeScrambledLines(text) {
    const originalSentences = text.split("\n");
    const sentencesSplitByWord = originalSentences.map(sen => sen.split(" "));
    sentencesSplitByWord.forEach((sen) => {
        for (let i = sen.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [sen[i], sen[j]] = [sen[j], sen[i]]
    }});
    const scrambledLines = sentencesSplitByWord.map(sen => sen.join(" / "));

    return scrambledLines;
}

function createBlanksPassage(data = { heading: "Please fill in the blanks with appropriate words.", text: "" }) {
    const headingChecked = data.showHeading !== false ? "checked" : "";
    headingContainer.innerHTML = `
        <label for="scramble-heading" class="label-top">Instruction</label><br><br>
        <textarea id="scramble-heading" class="heading-input">${data.heading || ""}</textarea> 
       <input type="checkbox" id="headingCheckbox" ${headingChecked}><label for="headingCheckbox"> Include Instruction</label>
        `;
    setupHeadingToggle();

    exerciseDescription.textContent = "Please type your passage in the text area. Include [square brackets] around the words you'd like to remove.";

    const showWordListChecked = data.showWordList ? "checked" : "";

    editorBody.innerHTML = `
        <textarea class="text-box" placeholder="In this passage, I want to remove [this] word and [that] word.">${data.text || ""}</textarea>
        <div class="checkboxGroup">
            <input type="checkbox" id="showWordListCheckbox" ${showWordListChecked}><label for="answerLinesCheckbox"> Show word bank</label>
        </div>
    `;
}

function makeWordListFromPassage(text) {
    const matches = text.match(/\[(.*?)\]/g);
    if (!matches) return [];

    const rawWords = matches.map(m => m.replace(/\[|\]/g, ""));

    const shuffled = [...rawWords];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

function createWordMatching(data = { heading: "Match words to create phrases.", text: "" }) {
    const headingChecked = data.showHeading !== false ? "checked" : "";
    headingContainer.innerHTML = `
        <label for="create-matching-heading" class="label-top">Instruction</label><br><br>
        <textarea id="create-matching-heading" class="heading-input">${data.heading || ""}</textarea> 
        <input type="checkbox" id="headingCheckbox" ${headingChecked}><label for="headingCheckbox"> Include Instruction</label>
    `;
    setupHeadingToggle();

    exerciseDescription.textContent = "Please type the phrases you want split with slashes. Add any additional phrases on a new line.";

    const numberedChecked = data.numbered ? "checked" : "";

    editorBody.innerHTML = `
        <textarea class="text-box" placeholder=
        "The dog / barks\nThe cat / meows\nThe pig / oinks\nThe wolf / howls">${data.text || ""}</textarea>
        <div class="checkboxGroup">
            <input type="checkbox" id="numberedCheckbox" ${numberedChecked}><label for="numberedCheckbox"> Number answers</label>
        </div>
    `;
}

function createClozeTest(data = { heading: "Read the passage and choose the correct answers.", text: ""}) {
    const headingChecked = data.showHeading !== false ? "checked" : "";
    headingContainer.innerHTML = `
        <label for="create-cloze-test-heading" class="label-top">Instruction</label><br><br>
        <textarea id="create-cloze-test-heading" class="heading-input">${data.heading || ""}</textarea>
        <input type="checkbox" id="headingCheckbox" ${headingChecked}><label for="headingCheckbox"> Include Instruction</label>
    `;
    setupHeadingToggle();

    exerciseDescription.textContent = "Please type the passage you wish to use in the text area. Enclose each word you want removed in square brackets separated by slashes for each possible choice, [like/this]. The first option must be the correct answer.  Use a maximum of four possible choices."

    editorBody.innerHTML = `
        <textarea class="text-box" placeholder="Cats typically have [two/three/four/six] ears. They generally like to eat [fish/cabbage/onions/pickles]. In cartoons, they often drink [milk/cola/tea/beer], but this is not realistic. Typically, they simply drink [water/tea/cola/wine].">${data.text || ""}</textarea>
    `
}

function validateClozeInput(bodyValue) {
    const matches = bodyValue.match(/\[(.*?)\]/g);

    // No square brackets
    if (!matches) {
        alert(`Don't forget to add [square/brackets/with/slashes] for your answer choices.`);
        return false;
    }

    for (let i = 0; i < matches.length; i++) {
        const item = matches[i];
        const inner = item.slice(1, -1);
        const choicesArray = inner.split("/").map(c => c.trim());

        // Duplicate choices
        const hasDuplicates = new Set(choicesArray).size !== choicesArray.length;
        if (hasDuplicates) {
            alert(`Please don't use the same answer more than once.`);
            return false;
        }

        // Too many choices
        const slashCount = (inner.match(/\//g) || []).length;
        if (slashCount > 3) {
            alert(`Please use a maximum of four choices per blank.`);
            return false;
        }
    }

    return true;
}

function makeClozeQuestions(text) {
    let questions = []

    const rawChoicesWithBrackets = text.match(/\[(.*?)\]/g);
    if (!rawChoicesWithBrackets) return;

    rawChoicesWithBrackets.forEach((choicesWithBrackets) => {

        const choicesWithoutBrackets = choicesWithBrackets.replace("[", "").replace("]", "").trim();
        const answerChoices = choicesWithoutBrackets.split("/").map(choice => choice.trim());

        const question = {
            choices: answerChoices,
            correctIndex: 0
        }

        questions.push(question)

    })

    return questions;
}

function makeWordMatchingData(bodyValue) {
    const rawPairs = bodyValue.split("\n");
    const pairs = [];

    rawPairs.forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed) return;

        const splitArray = trimmed.split("/");
        if (splitArray.length !== 2) return;

        const left  = splitArray[0].trim();
        const right = splitArray[1].trim();

        pairs.push({ left, right });
    });

    const rightOptions = [];
    pairs.forEach((pair, index) => {
        const text = pair.right;
        const pairIndex = index;

        rightOptions.push({ text, pairIndex });
    });

    for (let i = rightOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rightOptions[i], rightOptions[j]] = [rightOptions[j], rightOptions[i]];
    }

    return { pairs, rightOptions };

}

function validateMatchingInput(bodyValue) {
    const lines = bodyValue.split("\n");

    for (let i = 0; i < lines.length; i++) {
        const trimmed = lines[i].trim();
        if (!trimmed) continue; // skip blank lines

        // Check for a slash
        if (!trimmed.includes("/")) {
            alert(`Don't forget to add slashes between your pairs (problem on line ${i + 1}).`);
            return false;
        }

        // Check that there is only one slash
        const slashCount = (trimmed.match(/\//g) || []).length;
        if (slashCount > 1) {
            alert(`Please use only one slash per pair (problem on line ${i + 1}).`);
            return false;
        }
    }

    // Check more than one line total
    if (lines.filter(l => l.trim()).length < 2) {
        alert("Please enter more than one line.");
        return false;
    }

    return true;
}

function createWordGrid(data = {
    heading: "Please fill in the table.",
    rows: 3,
    cols: 4,
    headerRow: false,
    headerCol: false,
    cells: [],
    blanks: [],
    showHeading: true
}) {
    // --- Heading UI (same style as other types) ---
    const headingChecked = data.showHeading !== false ? "checked" : "";
    headingContainer.innerHTML = `
        <label for="word-grid-heading" class="label-top">Instruction</label><br><br>
        <textarea id="word-grid-heading" class="heading-input">${data.heading || ""}</textarea>
        <input type="checkbox" id="headingCheckbox" ${headingChecked}><label for="headingCheckbox"> Include Instruction</label>
        
    `;
    setupHeadingToggle();

    exerciseDescription.textContent =
        "Type values into the grid. Check the boxes for cells that should become blanks in the exercise.";

    // --- Size + heading row/col controls ---
    const initialRows =
        typeof data.rows === "number" && data.rows > 0 ? data.rows : 5;
    const initialCols =
        typeof data.cols === "number" && data.cols > 0 ? data.cols : 5;

    const headerRowChecked = data.headerRow ? "checked" : "";
    const headerColChecked = data.headerCol ? "checked" : "";

    editorBody.innerHTML = `
        <div class="word-grid-controls">
            <div class="word-grid-size">
                <label>Rows:
                    <input id="wordGridRows" type="number" min="1" max="20" value="${initialRows}">
                </label>
                <label>Columns:
                    <input id="wordGridCols" type="number" min="1" max="5" value="${initialCols}">
                </label>
            </div>
            <br>
            <div class="word-grid-heading-options">
                <label><input type="checkbox" id="wordGridHeaderRow" ${headerRowChecked}> Heading Row</label><br><br>
                <label><input type="checkbox" id="wordGridHeaderCol" ${headerColChecked}> Heading Column</label>
            </div>
        </div>
        <div class="word-grid-editor"></div>
    `;

    const rowsInput = editorBody.querySelector("#wordGridRows");
    const colsInput = editorBody.querySelector("#wordGridCols");
    const gridContainer = editorBody.querySelector(".word-grid-editor");
    const headerRowCheckbox = editorBody.querySelector("#wordGridHeaderRow");
    const headerColCheckbox = editorBody.querySelector("#wordGridHeaderCol");

    // --- In-memory model of the grid (what saveEdit ultimately reads from the DOM) ---
    let currentRows = initialRows;
    let currentCols = initialCols;

    // Seed from existing data if present, otherwise empty / false
    let currentCells = Array.from({ length: currentRows }, (_, r) =>
        Array.from({ length: currentCols }, (_, c) =>
            (data.cells && data.cells[r] && typeof data.cells[r][c] === "string")
                ? data.cells[r][c]
                : ""
        )
    );

    let currentBlanks = Array.from({ length: currentRows }, (_, r) =>
        Array.from({ length: currentCols }, (_, c) =>
            (data.blanks && data.blanks[r] && typeof data.blanks[r][c] === "boolean")
                ? data.blanks[r][c]
                : false
        )
    );

    // --- Render the editor grid from currentCells/currentBlanks ---
    function renderGrid() {
        gridContainer.innerHTML = "";

        for (let r = 0; r < currentRows; r++) {
            const rowDiv = document.createElement("div");
            rowDiv.classList.add("word-grid-editor-row");

            for (let c = 0; c < currentCols; c++) {
                const cellWrapper = document.createElement("div");
                cellWrapper.classList.add("word-grid-editor-cell");

                const cellInput = document.createElement("input");
                cellInput.type = "text";
                cellInput.value =
                    currentCells[r] && typeof currentCells[r][c] === "string"
                        ? currentCells[r][c]
                        : "";

                const blankLabel = document.createElement("label");
                blankLabel.classList.add("word-grid-blank-label");

                const blankCheckbox = document.createElement("input");
                blankCheckbox.type = "checkbox";
                blankCheckbox.classList.add("word-grid-cell-blank");
                blankCheckbox.checked =
                    currentBlanks[r] && typeof currentBlanks[r][c] === "boolean"
                        ? currentBlanks[r][c]
                        : false;

                blankLabel.appendChild(blankCheckbox);
                blankLabel.appendChild(document.createTextNode(""));

                cellWrapper.appendChild(cellInput);
                cellWrapper.appendChild(blankLabel);

                rowDiv.appendChild(cellWrapper);
            }

            gridContainer.appendChild(rowDiv);
        }
        applyEditorHeadingStyles();
    }

    function applyEditorHeadingStyles() {
        const isHeaderRow = headerRowCheckbox && headerRowCheckbox.checked;
        const isHeaderCol = headerColCheckbox && headerColCheckbox.checked;

        const rowNodes = gridContainer.querySelectorAll(".word-grid-editor-row");

        rowNodes.forEach((rowDiv, rIndex) => {
            const cellInputs = rowDiv.querySelectorAll(".word-grid-editor-cell input[type='text']");
            cellInputs.forEach((inputEl, cIndex) => {
                const makeBold =
                    (isHeaderRow && rIndex === 0) ||
                    (isHeaderCol && cIndex === 0);

                // "bold" already exists in your CSS; this will preview headings
                inputEl.classList.toggle("bold", makeBold);
            });
        });
    }

    // --- Snapshot: pull current DOM values into currentCells/currentBlanks ---
    function snapshotGrid() {
        const inputNodes = gridContainer.querySelectorAll(
            ".word-grid-editor-cell input[type='text']"
        );
        const checkboxNodes = gridContainer.querySelectorAll(
            ".word-grid-editor-cell input[type='checkbox']"
        );

        const inputs = Array.from(inputNodes);
        const checkboxes = Array.from(checkboxNodes);

        const nextCells = Array.from({ length: currentRows }, () =>
            Array(currentCols).fill("")
        );
        const nextBlanks = Array.from({ length: currentRows }, () =>
            Array(currentCols).fill(false)
        );

        for (let r = 0; r < currentRows; r++) {
            for (let c = 0; c < currentCols; c++) {
                const idx = r * currentCols + c;

                const input = inputs[idx];
                if (input) {
                    nextCells[r][c] = input.value;
                }

                const cb = checkboxes[idx];
                if (cb) {
                    nextBlanks[r][c] = cb.checked;
                }
            }
        }

        currentCells = nextCells;
        currentBlanks = nextBlanks;
    }

    // --- Handle row/column changes without nuking everything ---
    function handleResize() {
        // 1. Snapshot what’s currently in the editor
        snapshotGrid();

        // 2. Parse new sizes
        let newRows = parseInt(rowsInput.value, 10);
        let newCols = parseInt(colsInput.value, 10);

        if (!Number.isFinite(newRows) || newRows < 1) newRows = 1;
        if (!Number.isFinite(newCols) || newCols < 1) newCols = 1;

        if (newCols > 5) {
            newCols = 5;
            colsInput.value = "5"; // keep the UI in sync with the cap
        }

        // 3. Create new arrays and copy overlapping region
        const resizedCells = Array.from({ length: newRows }, () =>
            Array(newCols).fill("")
        );
        const resizedBlanks = Array.from({ length: newRows }, () =>
            Array(newCols).fill(false)
        );

        const copyRows = Math.min(newRows, currentRows);
        const copyCols = Math.min(newCols, currentCols);

        for (let r = 0; r < copyRows; r++) {
            for (let c = 0; c < copyCols; c++) {
                resizedCells[r][c] = currentCells[r][c];
                resizedBlanks[r][c] = currentBlanks[r][c];
            }
        }

        // 4. Swap model & re-render
        currentRows = newRows;
        currentCols = newCols;
        currentCells = resizedCells;
        currentBlanks = resizedBlanks;

        renderGrid();
    }

    rowsInput.addEventListener("change", handleResize);
    colsInput.addEventListener("change", handleResize);

    if (headerRowCheckbox) {
        headerRowCheckbox.addEventListener("change", applyEditorHeadingStyles);
    }
    if (headerColCheckbox) {
        headerColCheckbox.addEventListener("change", applyEditorHeadingStyles);
    }

    // Initial paint
    renderGrid();
}

function buildWordGridEditorTable(tableEl, rows, cols, existingCells, existingBlanks) {
    tableEl.innerHTML = "";

    for (let r = 0; r < rows; r++) {
        const tr = document.createElement("tr");

        for (let c = 0; c < cols; c++) {
            const td = document.createElement("td");
            td.classList.add("word-grid-editor-cell");
            td.dataset.row = r;
            td.dataset.col = c;

            const input = document.createElement("input");
            input.type = "text";
            input.classList.add("word-grid-cell-input");

            if (existingCells && existingCells[r] && typeof existingCells[r][c] !== "undefined") {
                input.value = existingCells[r][c];
            }

            const blankToggle = document.createElement("input");
            blankToggle.type = "checkbox";
            blankToggle.classList.add("word-grid-blank-toggle");

            if (existingBlanks && existingBlanks[r] && typeof existingBlanks[r][c] !== "undefined") {
                blankToggle.checked = !!existingBlanks[r][c];
            }

            const checkboxWrapper = document.createElement("div");
            checkboxWrapper.classList.add("word-grid-checkbox-wrapper");
            checkboxWrapper.appendChild(blankToggle);

            td.appendChild(input);
            td.appendChild(checkboxWrapper);

            tr.appendChild(td);
        }

        tableEl.appendChild(tr);
    }
}

function updateWordGridHeadingStyles() {
    const headerRowCheckbox = document.getElementById("wordGridHeaderRow");
    const headerColCheckbox = document.getElementById("wordGridHeaderCol");
    const tableEl = document.getElementById("wordGridTable");
    if (!tableEl) return;

    const markRow = headerRowCheckbox && headerRowCheckbox.checked;
    const markCol = headerColCheckbox && headerColCheckbox.checked;

    const cells = tableEl.querySelectorAll(".word-grid-editor-cell");

    cells.forEach(td => {
        const r = Number(td.dataset.row);
        const c = Number(td.dataset.col);
        const input = td.querySelector(".word-grid-cell-input");
        if (!input) return;

        const isHeadingRowCell = markRow && r === 0;
        const isHeadingColCell = markCol && c === 0;

        if (isHeadingRowCell || isHeadingColCell) {
            input.classList.add("bold");
        } else {
            input.classList.remove("bold");
        }
    });
}

function createScrambledWords(data = { heading: "Please answer in complete sentences.", text: "" }) {
    const headingChecked = data.showHeading !== false ? "checked" : "";
    headingContainer.innerHTML = `
        <label for="scramble-heading" class="label-top">Instruction</label><br><br>
        <textarea id="scramble-heading" class="heading-input">${data.heading || ""}</textarea>
        <input type="checkbox" id="headingCheckbox" ${headingChecked}><label for="headingCheckbox"> Include Instruction</label>
    `;
    setupHeadingToggle();

    exerciseDescription.textContent = "Please type the sentences you wish to use in the text area. Put each sentence on a new line.";

    const numberedChecked = data.numbered ? "checked" : "";
    const answerChecked = data.showAnswerLines ? "checked" : "";
    const underlineIntialChecked = data.underlineInitial ? "checked" : "";

    editorBody.innerHTML = `
        <textarea class="text-box" placeholder="This is the first sentence.\nThis is the second sentence.">${data.text || ""}</textarea>
        <div class="checkboxGroup">
            <fieldset>
                <legend>Scrambling Options</legend>
                <div>
                    <input type="checkbox" id="numberedCheckbox" ${numberedChecked}><label for="numberedCheckbox"> Number answers</label>
                </div>
                <div>
                    <input type="checkbox" id="answerLinesCheckbox" ${answerChecked}><label for="answerLinesCheckbox"> Add answer lines</label>
                </div>
                <div>
                    <input type="checkbox" id="underlineInitialCheckbox" ${underlineIntialChecked}><label for="underlineInitialCheckbox"> Underline Initial Letter</label>
                </div>
            </fieldset>
        </div>
    `;
}

function makeScrambledWords(bodyValue, underlineInitial) {
    const sentences = bodyValue.split("\n").map(s => s.trim()).filter(s => s !== "");
    const questions = [];
    let modifiedText = "";

    sentences.forEach((sentence) => {
        const match = sentence.match(/^(.*?)([.!?])?$/);
        const body = match[1] || sentence;
        const punctuation = match[2] || "";

        const words = body.split(" ");
        let scrambledWords = [];
        words.forEach((word) => {
            if (word === "") {
                return;
            }

            const letters = word.split("");

            if (underlineInitial && letters.length > 0) {
                letters[0] = `<span class="underlined">${letters[0]}</span>`;
            }

            for (let i = letters.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [letters[i], letters[j]] = [letters[j], letters[i]]
            }

            const scrambledWord = letters.join("");
            scrambledWords.push(scrambledWord);
            modifiedText = scrambledWords.join(" ") + punctuation;
        });

        questions.push({
            sentence,
            modifiedText
        })
    });
    
    return questions;
}

function createEssayQuestion(data = { heading: "Please answer in complete sentences.", text: "" }) {
    const headingChecked = data.showHeading !== false ? "checked" : "";
    headingContainer.innerHTML = `
        <label for="create-essay-question-heading" class="label-top">Instruction</label><br><br>
        <textarea id="create-essay-question-heading" class="heading-input">${data.heading || ""}</textarea>
        <input type="checkbox" id="headingCheckbox" ${headingChecked}><label for="headingCheckbox"> Include Instruction</label>
    `;
    setupHeadingToggle();

    exerciseDescription.textContent = "Please enter your essay questions in the text area. Put each question on a new line.";

    const typeValue = data.answerBoxType || "lined";
    const sizeValue = data.answerBoxSize || "paragraph";

    editorBody.innerHTML = `
        <textarea class="text-box" placeholder="How do you feel about cats? Please write 50 words.\nDo you like to eat fried chicken? Why or why not?\nWhy is the sky blue?">${data.text || ""}</textarea>
        <div class="checkboxGroup">
            <fieldset>
                <legend>Answer box type:</legend>

                <div>
                    <input type="radio" id="lined" name="answerBoxType" value="lined" ${typeValue === "lined" ? "checked" : ""} />
                    <label for="lined">Lined</label>
                </div>

                <div>
                    <input type="radio" id="box" name="answerBoxType" value="box" ${typeValue === "box" ? "checked" : ""} />
                    <label for="box">Box</label>
                </div>

                <div>
                    <input type="radio" id="simple-lines" name="answerBoxType" value="simple-lines" ${typeValue === "simple-lines" ? "checked" : ""} />
                    <label for="simple-lines">Simple Lines</label>
                </div>
            </fieldset>
            <fieldset>
                <legend>Answer box size:</legend>

                <div>
                    <input type="radio" id="sentence" name="answerBoxSize" value="sentence" ${sizeValue === "sentence" ? "checked" : ""} />
                    <label for="sentence">Single Sentence</label>
                </div>

                <div>
                    <input type="radio" id="paragraph" name="answerBoxSize" value="paragraph" ${sizeValue === "paragraph" ? "checked" : ""} />
                    <label for="paragraph">Paragraph</label>
                </div>

                <div>
                    <input type="radio" id="half-page" name="answerBoxSize" value="half-page" ${sizeValue === "half-page" ? "checked" : ""} />
                    <label for="half-page">Half-page</label>
                </div>

                <div>
                    <input type="radio" id="full-page" name="answerBoxSize" value="full-page" ${sizeValue === "full-page" ? "checked" : ""} />
                    <label for="full-page">Full-page</label>
                </div>
            </fieldset>
        </div>
    `;
}

function createMultipleChoiceQuestions(data = { heading: "Choose the correct answers.", text: "" }) {
    const headingChecked = data.showHeading !== false ? "checked" : "";
    headingContainer.innerHTML = `
        <label for="create-mcq-heading" class="label-top">Instruction</label><br><br>
        <textarea id="create-mcq-heading" class="heading-input">${data.heading || ""}</textarea> 
        <input type="checkbox" id="headingCheckbox" ${headingChecked}><label for="headingCheckbox"> Include Instruction</label>
    `;

    exerciseDescription.textContent = "Please type the questions you wish to use in the text area, followed by a list of answers in square brackets separated by slashes, [like/this]. The first option must be the correct answer. Add any additional questions on a new line. Use a maximum of four possible answers.";

    const numberedChecked = data.numbered ? "checked" : "";

    editorBody.innerHTML = `
        <textarea class="text-box" placeholder="How many legs do cats typically have? [four/three/two/one]\nWhat sound do cats usually make? [meow/bark/moo]">${data.text || ""}</textarea>
        <div class="checkboxGroup">
            <input type="checkbox" id="numberedCheckbox" ${numberedChecked}><label for="numberedCheckbox"> Number answers</label>
        </div>
    `;
}

function makeMcqQuestions(text) {
    let questions = []
    const sentencesWithChoices = text.split("\n");
    sentencesWithChoices.forEach((senWithChoices) => {
        const rawChoices = senWithChoices.match(/\[(.*?)\]/);
        if (!rawChoices) return;

        const promptSentence = senWithChoices.replace(/\[(.*?)\]/g, "").trim();
        const choiceGroup = rawChoices[1];
        const answerChoices = choiceGroup.split("/");

        const question = {
            prompt: promptSentence,
            choices: answerChoices,
            correctIndex: 0
        }

        questions.push(question)

    })

    return questions;

}

function validateMcqInput(bodyValue) {
    const lines = bodyValue.split("\n");

    for (let i = 0; i < lines.length; i++) {
        const trimmed = lines[i].trim();
        if (!trimmed) continue; // skip completely blank lines

        const matches = trimmed.match(/\[(.*?)\]/g);

        // No square brackets
        if (!matches) {
            alert(`Don't forget to add [square/brackets/with/slashes] for your answer choices (problem on line ${i + 1}).`);
            return false;
        }

        // Lines have too many []
        if (matches.length > 1) {
            alert(`Each line should just have one [answers] group. Please put each question + choices on its own line (problem on line ${i + 1}).`);
            return false;
        }

        // Now we KNOW there is exactly one [ ... ] on this line
        const match = matches[0];
        const matchWithoutBrackets = match.replace("[", "").replace("]", "");
        const choicesArray = matchWithoutBrackets.split("/").map(c => c.trim());

        // 1) Duplicate choices?
        const hasDuplicates = new Set(choicesArray).size !== choicesArray.length;
        if (hasDuplicates) {
            alert(`Please don't use the same answer more than once (problem on line ${i + 1}).`);
            return false;
        }

        // 2) Too many choices? (more than 4 = more than 3 slashes)
        const slashCount = (matchWithoutBrackets.match(/\//g) || []).length;
        if (slashCount > 3) {
            alert(`Line ${i + 1} has more than four answer choices. Please use a maximum of four choices per question.`);
            return false;
        }
    }

    return true;
}

function createLetterRemoval(data = { heading: "Please fill in the missing letters.", text: "" }) {
    const headingChecked = data.showHeading !== false ? "checked" : "";
    headingContainer.innerHTML = `
        <label for="create-letter-removal-heading" class="label-top">Instruction</label><br><br>
        <textarea id="create-letter-removal-heading" class="heading-input">${data.heading || ""}</textarea> 
        <input type="checkbox" id="headingCheckbox" ${headingChecked}><label for="headingCheckbox"> Include Instruction</label>
    `;

    exerciseDescription.textContent = "Please type the sentences you wish to use in the text area. Add any additional sentences on a new line.";

    const numberedChecked = data.numbered ? "checked" : "";
    const preserveInitialChecked = data.preserveInitial ? "checked" : "";
    const preserveFinalChecked = data.preserveFinal ? "checked" : "";
    const preserveRandomChecked = data.preserveRandom ? "checked" : "";

    editorBody.innerHTML = `
        <textarea class="text-box" placeholder="This is the first sentence.\nThis is the second sentence.">${data.text || ""}</textarea>
        <div class="checkboxGroup">
            <input type="checkbox" id="numberedCheckbox" ${numberedChecked}><label for="numberedCheckbox"> Number answers</label><br><br>
            <fieldset>
                <legend>Letter removal options:</legend>

                <div>
                    <input type="checkbox" id="preserveInitialCheckbox" ${preserveInitialChecked}><label for="preserveInitialCheckbox"> Preserve Initial Letters</label>
                </div>
                <div>
                    <input type="checkbox" id="preserveFinalCheckbox" ${preserveFinalChecked}><label for="preserveFinalCheckbox"> Preserve Final Letters</label>
                </div>
                <div>
                    <input type="checkbox" id="preserveRandomCheckbox" ${preserveRandomChecked}><label for="preserveRandomCheckbox"> Preserve Random Letters</label>
                </div>
            </fieldset>
        </div>
    `;
}

function makeLetterRemovalQuestions(text, options = {}) {
    const {
        preserveInitial = true,
        preserveFinal   = false,
        preserveRandom  = false
    } = options;

    const questions = [];

    const individualSentences = text
        .split("\n")
        .map(s => s.trim())
        .filter(s => s !== "");

    individualSentences.forEach((sentence) => {
        const match = sentence.match(/^(.*?)([.!?])?$/);
        const body = match[1] || sentence;
        const punctuation = match[2] || "";

        const words = body.split(" ");
        const sentenceWithBlanks = words.map(word => {
            if (!word.length) return "";

            // decide which letter positions to keep
            const keepIndices = [];

            if (preserveInitial && word.length > 0) {
                keepIndices.push(0);
            }

            if (preserveFinal && word.length > 1) {
                keepIndices.push(word.length - 1);
            }

            if (preserveRandom && word.length > 2) {
                const targetKeepCount = Math.round(word.length * 0.5);

                const maxKeep = word.length - 1;
                const finalTarget = Math.min(targetKeepCount, maxKeep);

                while (keepIndices.length < finalTarget) {
                    const randIndex = Math.floor(Math.random() * word.length);

                    if (!keepIndices.includes(randIndex)) {
                        keepIndices.push(randIndex);
                    }
                }
            }

            // build the gapped word
            let result = "";
            let previousWasBlank = false;

            for (let i = 0; i < word.length; i++) {
                const keep = keepIndices.includes(i);

                if (keep) {
                    // if the previous position was a blank, add a space before this letter
                    if (previousWasBlank) {
                        result += " " + word[i];
                    } else {
                        result += word[i];
                    }
                    previousWasBlank = false;
                } else {
                    // add a spaced blank and mark that we just added a blank
                    result += " _";
                    previousWasBlank = true;
                }
            }

            return result;
        });

        const modifiedText = sentenceWithBlanks.join("  ") + punctuation;

        questions.push({
            sentence: sentence,
            modifiedText: modifiedText
        });
    });

    return questions;
}

// event listeners for hard-coded buttons

let exerciseMenuOpen = false;
addExerciseBtn.addEventListener("click", () => {
    showMenu(createExerciseMenu);

    // When the exercise menu is open, hide the main toolbar buttons and show the close button.
    hideToolbarButtons();
    closeExerciseMenuBtn.classList.remove("hidden");

    // Keep the hamburger out of the way while the exercise picker is open.
    hamburgerMenuBtn.classList.add("hidden");

    setOverlayOpen(true);
    exerciseMenuOpen = true;
});

printBtn.addEventListener("click", () => {
    window.print();
})

copyBtn.addEventListener("click", () => {
    try {
        const range = document.createRange();
        range.selectNodeContents(worksheet);

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        const successful = document.execCommand("copy");

        // Clear the selection so it doesn’t stay highlighted
        selection.removeAllRanges();

        if (successful) {
            alert("Copied to clipboard.");
        } else {
            alert("Copy may not have worked. You can still select the worksheet manually and copy.");
        }
    } catch (err) {
        console.error("Copy failed:", err);
        alert("Sorry, copying failed. You can still select the worksheet manually and copy.");
    }
});

closeExerciseMenuBtn.addEventListener("click", () => {
    closeMenu(createExerciseMenu);

    // Restore normal worksheet toolbar state.
    closeExerciseMenuBtn.classList.add("hidden");
    setToolbarButtons();

    setOverlayOpen(false);
    exerciseMenuOpen = false;
});

closeEditingInterface.addEventListener("click", () => {
    closeMenu(editingInterface);
    setToolbarButtons();
    setOverlayOpen(false);
});

saveEditBtn.addEventListener("click", () => saveEdit());

modeBtn.addEventListener("click", () => handleModeChange());

let hamburgerMenuOpen = false;
hamburgerMenuBtn.addEventListener("click", () => {
    if (hamburgerMenuOpen) {
        closeMenu(hamburgerMenu);
        hamburgerMenuBtn.innerHTML = `<img src="./assets/menu.svg">`;

        // Restore whichever toolbar state is appropriate.
        if (exerciseMenuOpen) {
            // Exercise picker is still open; keep toolbar hidden but show its close button.
            hideToolbarButtons();
            closeExerciseMenuBtn.classList.remove("hidden");
            hamburgerMenuBtn.classList.add("hidden");
            setOverlayOpen(true);
        } else {
            setToolbarButtons();
            setOverlayOpen(false);
        }

        hamburgerMenuOpen = false;
    } else {
        showMenu(hamburgerMenu);
        hamburgerMenuBtn.innerHTML = "X";

        // Hamburger open = hide main toolbar; only the hamburger button remains visible.
        hideToolbarButtons();
        hamburgerMenuBtn.classList.remove("hidden");

        // If the exercise picker was open, temporarily hide its close button.
        if (exerciseMenuOpen) {
            closeExerciseMenuBtn.classList.add("hidden");
        }

        setOverlayOpen(true);
        hamburgerMenuOpen = true;
    }
})

newWorksheetBtn.addEventListener("click", () => {
    localStorage.removeItem("worksheetData");
    exerciseBlocks = [];
    renderExerciseBlocks();

    closeMenu(hamburgerMenu);
    closeMenu(editingInterface);
    setToolbarButtons();
    setOverlayOpen(false);
    hamburgerMenuBtn.innerHTML = `<img src="./assets/menu.svg">`;
    hamburgerMenuOpen = false;
    isViewingTemplateWorksheet = false;
})

loadTemplateWorksheetBtn.addEventListener("click", () => {
    loadTemplateWorksheet();
    closeMenu(hamburgerMenu);
    closeMenu(editingInterface);
    setToolbarButtons();
    setOverlayOpen(false);
    hamburgerMenuBtn.innerHTML = `<img src="./assets/menu.svg">`;
    hamburgerMenuOpen = false;
}
);

window.addEventListener('resize', updateHeaderTitle);

// Stuff to happen upon page load

initWorksheet();
renderExerciseTypes();
updateHeaderTitle();