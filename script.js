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
let currentEditingBlockId = null;
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
        const { editBtn, deleteBtn, contentContainer, wrapper } = createBlockWrapper(block);

        let blockElement;

        if (block.type === "title") {
            const generatedTitle = document.createElement("h1");
            generatedTitle.textContent = block.data.text;
            blockElement = generatedTitle;
        }

        if (blockElement) {
            contentContainer.appendChild(blockElement);
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
    editBtn.classList.add("edit-btn");

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<img src="assets/remove.svg">`;
    deleteBtn.classList.add("delete-btn");

    editBtn.addEventListener("click", () => editExercise(block.id));
    deleteBtn.addEventListener("click", () => deleteExercise(block.id));

    toolbar.appendChild(editBtn);
    toolbar.appendChild(deleteBtn);

    wrapper.appendChild(contentContainer);
    wrapper.appendChild(toolbar);

    return { editBtn, deleteBtn, contentContainer, wrapper }
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

function editExercise(blockId) {
    currentEditingBlockId = blockId;

    const block = exerciseBlocks.find(b => b.id === blockId);
    if (!block) return;

    showMenu(editingInterface);

    const typeConfig = exerciseTypes.find(t => t.id === block.type);
    const caption = typeConfig ? typeConfig.buttonCaption : "";
    exerciseType.textContent = `Edit ${caption}`

    editorBody.innerHTML = "";

    if (block.type === "title") {
        createTitleText(block.data.text);
    }
}

function deleteExercise(blockId) {
    exerciseBlocks = exerciseBlocks.filter(block => block.id !== blockId);
    renderExerciseBlocks();
}

// functions for individual exercises

function createTitleText(initialText = "") {
    exerciseDescription.textContent = "Please type the text for your title in the text area.";
    editorBody.innerHTML = `<textarea class="text-box">${initialText}</textarea>`
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

// Stuff to happen upon page load

renderExerciseTypes();
renderExerciseBlocks();

// Stuff that should happen only after rendering main content
