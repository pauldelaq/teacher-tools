const addExerciseBtn = document.getElementById("add-button");
const createExerciseMenu = document.getElementById("create-exercise-menu");
const exerciseListDisplay = document.getElementById("exercise-list-display");
const closeExerciseMenuBtn = document.getElementById("close-exercise-menu");
const exerciseType = document.getElementById("exercise-type");
const exerciseDescription = document.getElementById("exercise-description");
const editingInterface = document.getElementById("editing-interface");
const closeEditingInterface = document.getElementById("close-editing-interface");
const saveEditBtn = document.getElementById("save-edit");
const editorBody = document.getElementById("editor-body");
const worksheet = document.getElementById("worksheet");
let exerciseBlocks = [
 {
    id: 1,
    type: "title",
    data: { text: "Chemistry 101 with Professor White" }
  }
];
const exerciseTypes = [
    {
        id: "title",
        buttonContent: "Chemistry 101 with Professor White",
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
        buttonContent: "cat / The / quickly. / runs",
        buttonCaption: "Scrambled Sentences",
        buttonFunction: createScrambledSentences
    }
]

// general functions

function showMenu(el) {
    el.classList.remove("hidden");
}

function closeMenu(el) {
    el.classList.add("hidden");
}

function renderExerciseTypes() {
    exerciseTypes.forEach((el) => {
        const exerciseButtonWrapper = document.createElement("div");
        exerciseButtonWrapper.classList.add("exercise-button-wrapper");
        const exerciseButtonCaption = document.createElement("p");
        exerciseButtonCaption.textContent = el.buttonCaption;
        exerciseButtonCaption.classList.add("exercise-button-caption");
        const exerciseTypeButton = document.createElement("button");
        exerciseTypeButton.innerText = el.buttonContent;
        exerciseTypeButton.classList.add("exercise-type-button");
        exerciseTypeButton.id = el.id;
        exerciseTypeButton.addEventListener("click", () => openEditorForType(el.buttonCaption, el.buttonFunction));
        exerciseButtonWrapper.appendChild(exerciseTypeButton);
        exerciseButtonWrapper.appendChild(exerciseButtonCaption);
        exerciseListDisplay.appendChild(exerciseButtonWrapper);
    }
    )
}

function renderExerciseBlocks() {
    worksheet.innerHTML = "";
    exerciseBlocks.forEach(block => {
        let blockElement;

        if (block.type === "title") {
            const generatedTitle = document.createElement("h1");
            generatedTitle.textContent = block.data.text;
            blockElement = generatedTitle;
        }

        if (blockElement) {
            worksheet.appendChild(blockElement);
        }
    })
}

function openEditorForType(caption, fn) {
    closeMenu(createExerciseMenu);
    showMenu(editingInterface);
    exerciseType.textContent = `Create ${caption}`;
    fn();
}

function saveEdit() {
    alert("Saved");
}

// functions for individual exercises

function createTitleText() {
    exerciseDescription.textContent = "Please type the text for your title in the text area.";
    editorBody.innerHTML = `<textarea class="text-box"></textarea>`
}

function createInstructionText() {
    exerciseDescription.textContent = "Please type the text for your instruction/note in the text area.";
    editorBody.innerHTML = `<textarea class="text-box"></textarea>`
}

function createScrambledSentences() {
    exerciseDescription.textContent = "Please type the sentences you wish to use in the text area."
}

addExerciseBtn.addEventListener("click", () => showMenu(createExerciseMenu));
closeExerciseMenuBtn.addEventListener("click", () => closeMenu(createExerciseMenu));
closeEditingInterface.addEventListener("click", () => closeMenu(editingInterface));
saveEditBtn.addEventListener("click", () => saveEdit());

renderExerciseTypes();
renderExerciseBlocks();