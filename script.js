const addExerciseBtn = document.getElementById("add-button");
const createExerciseMenu = document.getElementById("create-exercise-menu");
const exerciseListDisplay = document.getElementById("exercise-list-display");
const closeExerciseMenuBtn = document.getElementById("close-exercise-menu");
const exerciseType = document.getElementById("exercise-type");
const editingInterface = document.getElementById("editing-interface");
const closeEditingInterface = document.getElementById("close-editing-interface");
const exerciseTypes = [
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

function openEditorForType(caption, fn) {
    closeMenu(createExerciseMenu);
    showMenu(editingInterface);
    exerciseType.textContent = `Create ${caption}`;
    fn();
}

// functions for individual exercises

function createInstructionText() {
    alert("Hi");
}

function createScrambledSentences() {
    alert("Hi");
}

addExerciseBtn.addEventListener("click", () => showMenu(createExerciseMenu));
closeExerciseMenuBtn.addEventListener("click", () => closeMenu(createExerciseMenu));
closeEditingInterface.addEventListener("click", () => closeMenu(editingInterface));

renderExerciseTypes();