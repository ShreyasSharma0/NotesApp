const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");

// Load existing notes on page load
renderNotes();

addNoteButton.addEventListener("click", addNote);

function getNotes() {
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function saveNotes(notes) {
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
    const noteContainer = document.createElement("div");
    noteContainer.classList.add("note-container");

    const element = document.createElement("textarea");
    element.classList.add("note");
    element.value = content;
    element.placeholder = "Type here";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteNoteElement(id));

    // Set the event listener for the textarea
    element.addEventListener("input", () => updateNote(id, element.value));

    // Append the delete button to the note container
    noteContainer.appendChild(element);
    noteContainer.appendChild(deleteButton);

  
    // Append the note container to the notes container
    notesContainer.appendChild(noteContainer);

    return noteContainer;
}



function addNote() {
    // Remove the event listener temporarily to avoid multiple bindings
    addNoteButton.removeEventListener("click", addNote);

    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    };

    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNoteButton);

    notes.push(noteObject);
    saveNotes(notes);

    // Reattach the event listener after adding the note
    addNoteButton.addEventListener("click", addNote);
}

function updateNote(id, newContent) {
    const notes = getNotes();
    const targetNote = notes.find(note => note.id == id);

    if (targetNote) {
        targetNote.content = newContent;
        saveNotes(notes);
    }
}

function deleteNoteElement(id) {
    const notes = getNotes();
    const updatedNotes = notes.filter(note => note.id !== id);
    saveNotes(updatedNotes);
    renderNotes();
}

function renderNotes() {
    const existingAddNoteButton = document.querySelector('.add-note');

    // Clear notesContainer excluding the add-note button
    notesContainer.innerHTML = '';

    getNotes().forEach((note) => {
        const noteElement = createNoteElement(note.id, note.content);
        notesContainer.appendChild(noteElement);
    });

    // Append the add-note button back to notesContainer
    notesContainer.appendChild(existingAddNoteButton);
}
