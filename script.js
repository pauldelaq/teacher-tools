const addExerciseBtn = document.getElementById("add-button");
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
const worksheet = document.getElementById("worksheet");
let currentEditingBlockId = null;
let currentEditingType = null;
let currentViewMode = "student";
let exerciseBlocks = [
 {
    id: 1,
    type: "title",
    data: { text: "My Worksheet", showLetter: false, includeName: true, includeClass: true, includeDate: true }
  },
  {
    id: 2,
    type: "instruction",
    data: { text: "Welcome! Hover over any exercise block to view more options.", showLetter: false }
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
        text: "How do you feel about cats? Please write 50 words.\nDo you like to eat fried chicken? Why or why not?\nWhy is the sky blue?",
        showLetter: true,
        answerBoxType: "lined",
        answerBoxSize: "paragraph",
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
        id: "scrambled-word",
        buttonContent: `nosi<span class="underlined">d</span>ura<br>yek<span class="underlined">m</span>no`,
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
    }
]

// general functions

function showMenu(el) {
    el.classList.remove("hidden");
}

function closeMenu(el) {
    el.classList.add("hidden");
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
                        const generatedRowTop = document.createElement("tr");
                        const cellTop = document.createElement("td");
                        cellTop.classList.add("top-lined");
                        generatedRowTop.appendChild(cellTop);
                        answerBox.appendChild(generatedRowTop);

                        const generatedRowBottom = document.createElement("tr");
                        const cellBottom = document.createElement("td");
                        cellBottom.classList.add("bottom-lined");
                        generatedRowBottom.appendChild(cellBottom);
                        answerBox.appendChild(generatedRowBottom);

                        const spacerRow = document.createElement("tr");
                        const cellSpacer = document.createElement("td");
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
                        answerLine.innerHTML = "<br>________________________________________________________________";
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

        if (blockElement) {
            contentContainer.appendChild(blockElement);

            const br = document.createElement("br");
            contentContainer.appendChild(br);
            worksheet.appendChild(wrapper);
        }
    })
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
    const letterIcon = block.data.showLetter ? "/assets/abc-color.svg" : "/assets/abc.svg";
    letterBtn.innerHTML = `<img src="${letterIcon}">`;
    letterBtn.classList.add("toolbar-btns");

    editBtn.addEventListener("click", () => editExercise(block.id));
    deleteBtn.addEventListener("click", () => deleteExercise(block.id));
    upBtn.addEventListener("click", () => moveUp(block.id));
    downBtn.addEventListener("click", () => moveDown(block.id));
    letterBtn.addEventListener("click", () => toggleLettering(block.id));

    toolbar.appendChild(editBtn);
    toolbar.appendChild(deleteBtn);
    toolbar.appendChild(upBtn);
    toolbar.appendChild(downBtn);
    toolbar.appendChild(letterBtn);

    wrapper.appendChild(toolbar);
    wrapper.appendChild(contentContainer);

    return { editBtn, deleteBtn, upBtn, downBtn, letterBtn, contentContainer, wrapper }
}

function openEditorForType(caption, fn, typeId) {
    currentEditingBlockId = null;
    currentEditingType = typeId;

    closeMenu(createExerciseMenu);
    showMenu(editingInterface);
    exerciseType.textContent = `Create ${caption}`;
    fn();
    hideToolbarButtons();
}

function saveEdit() {
    const bodyTextarea = editorBody.querySelector(".text-box");
    if (!bodyTextarea) return;

    const headingTextarea = headingContainer.querySelector(".heading-input");

    const bodyValue = bodyTextarea.value;
    const headingValue = headingTextarea ? headingTextarea.value : "";

    const showHeadingElement = document.getElementById("headingCheckbox");
    const showHeadingValue = showHeadingElement ? showHeadingElement.checked : true;

    const numberedElement = editorBody.querySelector("#numberedCheckbox");
    const answerLinesElement = editorBody.querySelector("#answerLinesCheckbox");

    const numberedValue = numberedElement ? numberedElement.checked : true;
    const answerLinesValue = answerLinesElement ? answerLinesElement.checked : true;

    const showWordListElement = editorBody.querySelector("#showWordListCheckbox");
    const showWordListValue = showWordListElement ? showWordListElement.checked : true;

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

    if (bodyValue === "") {
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
    alert("Saved");
}

function editExercise(blockId) {
    currentEditingBlockId = blockId;

    const block = exerciseBlocks.find(b => b.id === blockId);
    if (!block) return;

    // remember what type we are editing
    currentEditingType = block.type;

    // find the type config from exerciseTypes
    const typeConfig = exerciseTypes.find(t => t.id === block.type);
    if (!typeConfig) return;

    // open the editor interface
    showMenu(editingInterface);

    const caption = typeConfig.buttonCaption;
    exerciseType.textContent = `Edit ${caption}`;

    // clear previous editor content
    editorBody.innerHTML = "";

    // call the type's editor-builder function with existing data
    // for simple text-based types (title, instruction) we pass block.data.text
    if (block.type === "scrambled-sentence" || block.type === "blanks-passage" || block.type === "multiple-choice-question" || block.type === "word-matching" || block.type === "cloze-test" || block.type === "essay-questions") {
        typeConfig.buttonFunction(block.data || {});
    } else if (block.type === "title") {
        typeConfig.buttonFunction(block.data || {});
    } else {
        typeConfig.buttonFunction(block.data && block.data.text ? block.data.text : "");
    }

    hideToolbarButtons();
}

function deleteExercise(blockId) {
    exerciseBlocks = exerciseBlocks.filter(block => block.id !== blockId);
    renderExerciseBlocks();
}

function moveUp(blockId) {
    const index = exerciseBlocks.findIndex(block => block && block.id === blockId);
    if (index <= 0) return;

    const temp = exerciseBlocks[index - 1];
    exerciseBlocks[index - 1] = exerciseBlocks[index];
    exerciseBlocks[index] = temp;

    renderExerciseBlocks();
}

function moveDown(blockId) {
    const index = exerciseBlocks.findIndex(block => block && block.id === blockId);
    if (index === -1 || index >= exerciseBlocks.length - 1) return;
    
    const temp = exerciseBlocks[index + 1];
    exerciseBlocks[index + 1] = exerciseBlocks[index];
    exerciseBlocks[index] = temp;

    renderExerciseBlocks();
}

function toggleLettering(blockId) {
    const index = exerciseBlocks.findIndex(block => block && block.id === blockId);
    if (index === -1) return;

    const block = exerciseBlocks[index];
    block.data.showLetter = !block.data.showLetter;

    renderExerciseBlocks();
}

function hideToolbarButtons() {
    addExerciseBtn.classList.add("hidden");
    closeExerciseMenuBtn.classList.add("hidden");
    modeBtn.classList.add("hidden");
    copyBtn.classList.add("hidden");
}

function setToolbarButtons() {
    addExerciseBtn.classList.remove("hidden");
    closeExerciseMenuBtn.classList.add("hidden");
    modeBtn.classList.remove("hidden");
    copyBtn.classList.remove("hidden");
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
}

// functions to build UI for individual exercises

function createTitleText(data = { text: "", includeName: true, includeClass: true, includeDate: true }) {
    headingContainer.innerHTML = "";
    exerciseDescription.textContent = "Please type the text for your title in the text area.";

    const nameChecked  = data.includeName !== false ? "checked" : "";
    const classChecked = data.includeClass !== false ? "checked" : "";
    const dateChecked  = data.includeDate !== false ? "checked" : "";

    editorBody.innerHTML = `
        <textarea class="text-box">${data.text || ""}</textarea>
        <div class="checkboxGroup">
            <label><input type="checkbox" id="includeNameCheckbox" ${nameChecked}> Include Name</label>
            <label><input type="checkbox" id="includeClassCheckbox" ${classChecked}> Include Class</label>
            <label><input type="checkbox" id="includeDateCheckbox" ${dateChecked}> Include Date</label>
        </div>
    `;
}

function createInstructionText(initialText = "") {
    headingContainer.innerHTML = "";
    exerciseDescription.textContent = "Please type the text for your instruction/note in the text area.";
    editorBody.innerHTML = `<textarea class="text-box">${initialText}</textarea>`;
}

function createScrambledSentences(data = { heading: "Unscramble the following sentences.", text: "" }) {
    const headingChecked = data.showHeading !== false ? "checked" : "";
    headingContainer.innerHTML = `
        <label for="scramble-heading" class="label-top">Instruction</label>
        <textarea id="scramble-heading" class="heading-input">${data.heading || ""}</textarea>
        <label for="headingCheckbox">Include Instruction: </label><input type="checkbox" id="headingCheckbox" ${headingChecked}>
    `;
    setupHeadingToggle();

    exerciseDescription.textContent = "Please type the sentences you wish to use in the text area. Put each sentence on a new line.";

    const numberedChecked = data.numbered ? "checked" : "";
    const answerChecked = data.showAnswerLines ? "checked" : "";

    editorBody.innerHTML = `
        <textarea class="text-box">${data.text || ""}</textarea>
        <div class="checkboxGroup">
            <label for="numberedCheckbox">Number answers: </label><input type="checkbox" id="numberedCheckbox" ${numberedChecked}>
            <label for="answerLinesCheckbox">Add answer lines: </label><input type="checkbox" id="answerLinesCheckbox" ${answerChecked}>
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
        <label for="scramble-heading" class="label-top">Instruction</label>
        <textarea id="scramble-heading" class="heading-input">${data.heading || ""}</textarea> 
        <label for="headingCheckbox">Include Instruction: </label><input type="checkbox" id="headingCheckbox" ${headingChecked}>
        `;
    setupHeadingToggle();

    exerciseDescription.textContent = "Please type your passage in the text area. Include [square brackets] around the words you'd like to remove.";

    const showWordListChecked = data.showWordList ? "checked" : "";

    editorBody.innerHTML = `
        <textarea class="text-box">${data.text || ""}</textarea>
        <div class="checkboxGroup">
            <label for="answerLinesCheckbox">Show word bank: </label><input type="checkbox" id="showWordListCheckbox" ${showWordListChecked}>
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
        <label for="create-matching-heading" class="label-top">Instruction</label>
        <textarea id="create-matching-heading" class="heading-input">${data.heading || ""}</textarea> 
        <label for="headingCheckbox">Include Instruction: </label><input type="checkbox" id="headingCheckbox" ${headingChecked}>
    `;
    setupHeadingToggle();

    exerciseDescription.textContent = "Please type the phrases you want split with slashes. Add any additional phrases on a new line.";

    const numberedChecked = data.numbered ? "checked" : "";

    editorBody.innerHTML = `
        <textarea class="text-box">${data.text || ""}</textarea>
        <div class="checkboxGroup">
            <label for="numberedCheckbox">Number answers: </label><input type="checkbox" id="numberedCheckbox" ${numberedChecked}>
        </div>
    `;
}
function createClozeTest(data = { heading: "Read the passage and choose the correct answers.", text: ""}) {
    const headingChecked = data.showHeading !== false ? "checked" : "";
    headingContainer.innerHTML = `
        <label for="create-cloze-test-heading" class-"label-top">Instruction</label>
        <textarea id="create-cloze-test-heading" class="heading-input">${data.heading || ""}</textarea>
        <label for="headingCheckbox">Include Instruction: </label><input type="checkbox" id="headingCheckbox" ${headingChecked}>
    `;
    setupHeadingToggle();

    exerciseDescription.textContent = "Please type the passage you wish to use in the text area. Enclose each word you want removed in [square/brackets/separated/by/slashes/for/each/possible/choice]. The first option must be the correct answer.  Use a maximum of four possible choices."

    editorBody.innerHTML = `
        <textarea class="text-box">${data.text || ""}</textarea>
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

function createWordGrid() {

}

function createScrambledWords() {

}

function createEssayQuestion(data = { heading: "Please answer in complete sentences.", text: "" }) {
    const headingChecked = data.showHeading !== false ? "checked" : "";
    headingContainer.innerHTML = `
        <label for="create-essay-question-heading" class="label-top">Instruction</label>
        <textarea id="create-essay-question-heading" class="heading-input">${data.heading || ""}</textarea>
        <label for="headingCheckbox">Include Instruction: </label><input type="checkbox" id="headingCheckbox" ${headingChecked}>
    `;
    setupHeadingToggle();

    exerciseDescription.textContent = "Please enter your essay questions in the text area. Put each question on a new line.";

    const typeValue = data.answerBoxType || "lined";
    const sizeValue = data.answerBoxSize || "paragraph";

    editorBody.innerHTML = `
        <textarea class="text-box">${data.text || ""}</textarea>
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
        <label for="create-mcq-heading" class="label-top">Instruction</label>
        <textarea id="create-mcq-heading" class="heading-input">${data.heading || ""}</textarea> 
        <label for="headingCheckbox">Include Instruction: </label><input type="checkbox" id="headingCheckbox" ${headingChecked}>
    `;

    exerciseDescription.textContent = "Please type the questions you wish to use in the text area, followed by a list of answers in [square/brackets/separated/by/slashes]. The first option must be the correct answer. Add any additional questions on a new line. Use a maximum of four possible answers.";

    const numberedChecked = data.numbered ? "checked" : "";

    editorBody.innerHTML = `
        <textarea class="text-box">${data.text || ""}</textarea>
        <div class="checkboxGroup">
            <label for="numberedCheckbox">Number answers: </label><input type="checkbox" id="numberedCheckbox" ${numberedChecked}>
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

// event listeners for hard-coded buttons

addExerciseBtn.addEventListener("click", () => {
    showMenu(createExerciseMenu);
    addExerciseBtn.classList.toggle("hidden");
    closeExerciseMenuBtn.classList.toggle("hidden");
    modeBtn.classList.toggle("hidden");
    copyBtn.classList.toggle("hidden");
});

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
    addExerciseBtn.classList.toggle("hidden");
    closeExerciseMenuBtn.classList.toggle("hidden");
    modeBtn.classList.toggle("hidden");
    copyBtn.classList.toggle("hidden");
});
closeEditingInterface.addEventListener("click", () => {
    closeMenu(editingInterface);
    setToolbarButtons();
});
saveEditBtn.addEventListener("click", () => saveEdit());

modeBtn.addEventListener("click", () => handleModeChange());

// Stuff to happen upon page load

renderExerciseTypes();
renderExerciseBlocks();

// Stuff that should happen only after rendering main content
