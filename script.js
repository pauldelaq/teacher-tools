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
    data: { text: "My Worksheet", showLetter: false }
  },
  {
    id: 2,
    type: "scrambled-sentence",
    data: { heading: "Unscramble the sentences.", scrambledLines:
    [
    "The / runs / quickly. / cat",
    "eats / breakfast. / dog / for / chicken / The"
    ],
    text: "The cat runs quickly.\nThe dog eats chicken for breakfast.",
    numbered: true, showAnswerLines: true, showLetter: true }
  },
  {
    id: 3,
    type: "instruction",
    data: { text: "Note: Don't forget to finish your worksheet.", showLetter: true }
  },
    {
    id: 4,
    type: "blanks-passage",
    data: { heading: "Please fill in the blanks with appropriate words.", text: "Cats are [cute] animals that like to eat [fish]. Garfield is a famous [cat] that likes to eat [lasagna].", wordList: ["fish", "lasagna", "cat", "cute"], showWordList: true, showLetter: true }
  },
    {
    id: 5,
    type: "multiple-choice-question",
    data: {
        heading: "Choose the correct answers.",
        text: "How many legs do cats typically have? [four/three/two/one]\nWhat sound cats usually make? [meow/bark/moo]",
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
        showLetter: true, numbered: true
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
        buttonContent: `<table class="matching-layout"><tr><td>apple</td><td> </td><td>orange</td></tr><tr><td>banana</td><td> </td><td>red</td></tr><tr><td>carrot</td><td> </td><td>yellow</td></tr></table>`,
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
        id: "essay-question",
        buttonContent: `How do you feel about <span class="bold">cats</span>? Please write 150 words.<br><br><table class="essay-rows"><tr><td> </td></tr><tr><td> </td></tr><tr><td> </td></tr><tr><td> </td></tr></table>`,
        buttonCaption: "Essay Question",
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
            const generatedTitle = document.createElement("h1");
            const baseText = block.data.text || "";
            generatedTitle.textContent = letter ? `${letter}. ${baseText}` : baseText;
            if (currentViewMode !== "student") {
                const br = document.createElement("br");
                const answerKeyIndicatorText = document.createElement("span");
                answerKeyIndicatorText.textContent = "(Answer Key)";
                answerKeyIndicatorText.classList.add("answer-label");

                generatedTitle.appendChild(br);
                generatedTitle.appendChild(answerKeyIndicatorText);
            }
            blockElement = generatedTitle;
        }

        if (block.type === "instruction") {
            const generatedPar = document.createElement("p");
            const baseText = block.data.text || "";
            generatedPar.textContent = letter ? `${letter}. ${baseText}` : baseText;
            generatedPar.classList.add("bold");
            blockElement = generatedPar;
        }

        if (block.type === "scrambled-sentence") {
            const generatedSenContainer = document.createElement("div");

            let hasHeading = false;
            if (block.data.heading) {
                hasHeading = true;
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

            let hasHeading = false;
            if (block.data.heading) {
                hasHeading = true;
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

            let hasHeading = false;
            if (block.data.heading) {
                hasHeading = true;
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

                    generatedQuestionItem.textContent = `___ ${index + 1}. ${question.prompt}`;

                    generatedChoicesTable = document.createElement("table");
                    generatedChoicesTable.classList.add("multiple-choice-options");

                    const generatedChoiceRow = document.createElement("tr");
                    
                    question.choices.forEach((choice, index) => {
                        const letterCell = document.createElement("td");
                        letterCell.classList.add("letter-cell");
                        const letter = String.fromCharCode(97 + index);

                        letterCell.innerHTML = `${letter}.`;
                        generatedChoiceRow.appendChild(letterCell);

                        const generatedChoiceText = document.createElement("td");
                        generatedChoiceText.classList.add("choice-cell");
                        generatedChoiceText.textContent = `${choice}`

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

                    const correctIndex = Number(question.correctIndex);
                    const abcd = String.fromCharCode(97 + correctIndex);
                    generatedQuestionItem.innerHTML = `<span class="underlined">&nbsp;&nbsp;${abcd}&nbsp;&nbsp;</span> ${index + 1}. ${question.prompt}`;

                    generatedChoicesTable = document.createElement("table");
                    generatedChoicesTable.classList.add("multiple-choice-options");

                    const generatedChoiceRow = document.createElement("tr");
                    
                    question.choices.forEach((choice, index) => {
                        const letterCell = document.createElement("td");
                        letterCell.classList.add("letter-cell");
                        const letter = String.fromCharCode(97 + index);

                        letterCell.innerHTML = `${letter}.`;
                        generatedChoiceRow.appendChild(letterCell);

                        const generatedChoiceText = document.createElement("td");
                        generatedChoiceText.classList.add("choice-cell");
                        generatedChoiceText.textContent = `${choice}`

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
    editBtn.innerHTML = `<img src="assets/edit.svg">`;
    editBtn.classList.add("toolbar-btns");

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<img src="assets/remove.svg">`;
    deleteBtn.classList.add("toolbar-btns");

    const upBtn = document.createElement("button");
    upBtn.innerHTML = `<img src="assets/up.svg">`;
    upBtn.classList.add("toolbar-btns");

    const downBtn = document.createElement("button");
    downBtn.innerHTML = `<img src="assets/down.svg">`;
    downBtn.classList.add("toolbar-btns");

    const letterBtn = document.createElement("button");
    const letterIcon = block.data.showLetter ? "assets/abc-color.svg" : "assets/abc.svg";
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

    const numberedElement = editorBody.querySelector("#numberedCheckbox");
    const answerLinesElement = editorBody.querySelector("#answerLinesCheckbox");

    const numberedValue = numberedElement ? numberedElement.checked : true;
    const answerLinesValue = answerLinesElement ? answerLinesElement.checked : true;

    const showWordListElement = editorBody.querySelector("#showWordListCheckbox");
    const showWordListValue = showWordListElement ? showWordListElement.checked : true;



    // save when editing existing block
    if (currentEditingBlockId !== null) {
        const block = exerciseBlocks.find(b => b.id === currentEditingBlockId);
        if (block) {
            if (block.type === "scrambled-sentence") {
                block.data = {
                    heading: headingValue,
                    text: bodyValue,
                    scrambledLines: makeScrambledLines(bodyValue),
                    numbered: numberedValue,
                    showAnswerLines: answerLinesValue,
                    showLetter: block.data.showLetter
                };
            } else if (block.type === "blanks-passage") {
                block.data = {
                    heading: headingValue,
                    text: bodyValue,
                    showWordList: showWordListValue,
                    wordList: makeWordListFromPassage(bodyValue),
                    showLetter: block.data.showLetter
                    };
            } else if (block.type === "multiple-choice-question") {
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
                    questions: questions
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

        if (currentEditingType === "scrambled-sentence") {
            data = {
                heading: headingValue,
                text: bodyValue,
                scrambledLines: makeScrambledLines(bodyValue),
                numbered: numberedValue,
                showAnswerLines: answerLinesValue,
                showLetter: true
            };
        } else if (currentEditingType === "blanks-passage") {
            data = {
                heading: headingValue,
                text: bodyValue,
                showWordList: showWordListValue,
                wordList: makeWordListFromPassage(bodyValue),
                showLetter: true
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
                questions: questions
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
    if (block.type === "scrambled-sentence" || block.type === "blanks-passage" || block.type === "multiple-choice-question") {
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
        modeBtn.innerHTML = `<img src="assets/teacher.svg">`;
    } else {
        currentViewMode = "student";
        modeBtn.innerHTML = `<img src="assets/student.svg">`;
    }

    renderExerciseBlocks();
}

// functions to build UI for individual exercises

function createTitleText(initialText = "") {
    headingContainer.innerHTML = "";
    exerciseDescription.textContent = "Please type the text for your title in the text area.";
    editorBody.innerHTML = `<textarea class="text-box">${initialText}</textarea>`
}

function createInstructionText(initialText = "") {
    headingContainer.innerHTML = "";
    exerciseDescription.textContent = "Please type the text for your instruction/note in the text area.";
    editorBody.innerHTML = `<textarea class="text-box">${initialText}</textarea>`;
}

function createScrambledSentences(data = { heading: "", text: "" }) {
    headingContainer.innerHTML = `
        <label for="scramble-heading" class="label-top">Instruction (Optional):</label>
        <textarea id="scramble-heading" class="heading-input" placeholder="Unscramble the following sentences.">${data.heading || ""}</textarea> 
    `;

    exerciseDescription.textContent = "Please type the sentences you wish to use in the text area.";

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

function createBlanksPassage(data = { heading: "", text: "" }) {
    headingContainer.innerHTML = `
        <label for="scramble-heading" class="label-top">Instruction (Optional):</label>
        <textarea id="scramble-heading" class="heading-input" placeholder="Please fill in the blanks with appropriate words.">${data.heading || ""}</textarea> 
    `;

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

function createClozeTest() {

}

function createWordMatching() {

}

function createWordGrid() {

}

function createScrambledWords() {

}

function createEssayQuestion() {

}

function createMultipleChoiceQuestions(data = { heading: "", text: "" }) {
    headingContainer.innerHTML = `
        <label for="create-mcq-heading" class="label-top">Instruction (Optional):</label>
        <textarea id="create-mcq-heading" class="heading-input" placeholder="Choose the correct answers.">${data.heading || ""}</textarea> 
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
