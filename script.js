const addExerciseBtn = document.getElementById("add-button");
const createExerciseMenu = document.getElementById("create-exercise-menu");
const exerciseListDisplay = document.getElementById("exercise-list-display");
const closeExerciseMenuBtn = document.getElementById("close-exercise-menu");
const exerciseType = document.getElementById("exercise-type");
const exerciseDescription = document.getElementById("exercise-description");
const headingContainer = document.getElementById("heading-container");
const editingInterface = document.getElementById("editing-interface");
const closeEditingInterface = document.getElementById("close-editing-interface");
const saveEditBtn = document.getElementById("save-edit");
const editorBody = document.getElementById("editor-body");
const worksheet = document.getElementById("worksheet");
let currentEditingBlockId = null;
let currentEditingType = null;
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
        exerciseTypeButton.addEventListener("click", () => openEditorForType(el.buttonCaption, el.buttonFunction, el.id));
        exerciseButtonWrapper.appendChild(exerciseTypeButton);
        exerciseButtonWrapper.appendChild(exerciseButtonCaption);
        exerciseListDisplay.appendChild(exerciseButtonWrapper);
    }
    )
}

function renderExerciseBlocks() {
    worksheet.innerHTML = "";
    exerciseBlocks.forEach(block => {
        const { editBtn, deleteBtn, upBtn, downBtn, contentContainer, wrapper } = createBlockWrapper(block);

        let blockElement;

        if (block.type === "title") {
            const generatedTitle = document.createElement("h1");
            generatedTitle.textContent = block.data.text;
            blockElement = generatedTitle;
        }

        if (block.type === "instruction") {
            const generatedPar = document.createElement("p");
            generatedPar.textContent = block.data.text;
            blockElement = generatedPar;
        }

        if (block.type === "scrambled-sentence") {
            const generatedSenContainer = document.createElement("div");

            if (block.data.heading) {
                const headingPar = document.createElement("p");
                headingPar.textContent = block.data.heading;
                generatedSenContainer.appendChild(headingPar);
            }

            const scrambledSenText = document.createElement("p");
            scrambledSenText.textContent = block.data.text;
            generatedSenContainer.appendChild(scrambledSenText);

            blockElement = generatedSenContainer;
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


    editBtn.addEventListener("click", () => editExercise(block.id));
    deleteBtn.addEventListener("click", () => deleteExercise(block.id));
    upBtn.addEventListener("click", () => moveUp(block.id));
    downBtn.addEventListener("click", () => moveDown(block.id));

    toolbar.appendChild(editBtn);
    toolbar.appendChild(deleteBtn);
    toolbar.appendChild(upBtn);
    toolbar.appendChild(downBtn);

    wrapper.appendChild(toolbar);
    wrapper.appendChild(contentContainer);

    return { editBtn, deleteBtn, upBtn, downBtn, contentContainer, wrapper }
}

function openEditorForType(caption, fn, typeId) {
    currentEditingBlockId = null;
    currentEditingType = typeId;

    closeMenu(createExerciseMenu);
    showMenu(editingInterface);
    exerciseType.textContent = `Create ${caption}`;
    fn();
}

function saveEdit() {
    const bodyTextarea = editorBody.querySelector(".text-box");
    if (!bodyTextarea) return;

    const headingTextarea = headingContainer.querySelector(".heading-input");

    const bodyValue = bodyTextarea.value;
    const headingValue = headingTextarea ? headingTextarea.value : "";

    if (currentEditingBlockId !== null) {
        const block = exerciseBlocks.find(b => b.id === currentEditingBlockId);
        if (block) {
            if (block.type === "scrambled-sentence") {
                block.data = {
                    heading: headingValue,
                    text: bodyValue
                };
            } else {
                block.data.text = bodyValue;
            }
        }
    }

    if (currentEditingBlockId === null && currentEditingType) {
        const newId = exerciseBlocks.length ? Math.max(...exerciseBlocks.map(b => b.id)) + 1 : 1;

        let data;

        if (currentEditingType === "scrambled-sentence") {
            data = {
                heading: headingValue,
                text: bodyValue
            };
        } else {
            data = {
                text: bodyValue
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
    if (block.type === "scrambled-sentence") {
        typeConfig.buttonFunction(block.data || {});
    } else {
        typeConfig.buttonFunction(block.data && block.data.text ? block.data.text : "");
    }
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

// functions for individual exercises

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
        <label for="scramble-heading">Instruction (Optional):</label>
        <textarea id="scramble-heading" class="heading-input" placeholder="Unscramble the following sentences.">${data.heading || ""}</textarea> 
    `;

    exerciseDescription.textContent = "Please type the sentences you wish to use in the text area.";
    editorBody.innerHTML = `
    <textarea class="text-box">${data.text || ""}</textarea>
    `
}

addExerciseBtn.addEventListener("click", () => showMenu(createExerciseMenu));
closeExerciseMenuBtn.addEventListener("click", () => closeMenu(createExerciseMenu));
closeEditingInterface.addEventListener("click", () => closeMenu(editingInterface));
saveEditBtn.addEventListener("click", () => saveEdit());

// Stuff to happen upon page load

renderExerciseTypes();
renderExerciseBlocks();

// Stuff that should happen only after rendering main content
