//-----CORE LOGIC OF CREATE A BOOK AND DISPLAY-------//
const myLibrary = [];

function Book({ title, author, read, pages, id }) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}
function addBookToLibrary({ title, author, read, pages }) {
  const book = new Book({ title, author, read, pages });
  myLibrary.push(book);
  return myLibrary;
}
function logBooks(myArray) {
  myArray.forEach((book) => console.log(book));
}
function renderBooks(array) {
  return array.map(
    (book) =>
      `${book.title} by ${book.author} with ${book.pages} pages - Read: ${book.read}`
  );
}

///--------UI-setup--------//

//rendering books to ui
function renderBooksToTable(arr) {
  const tableBody = document.getElementById("book-table-only");
  tableBody.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    let currentBook = arr[i];
    const tableRow = document.createElement("tr");
    tableBody.appendChild(tableRow);
    const cell1 = document.createElement("td");
    cell1.textContent = currentBook.title;
    tableRow.appendChild(cell1);
    const cell2 = document.createElement("td");
    cell2.textContent = currentBook.author;
    tableRow.appendChild(cell2);
    const cell3 = document.createElement("td");
    cell3.textContent = currentBook.read;
    tableRow.appendChild(cell3);

    //Add delete and update button after each row is created
    const actionCell = document.createElement("td");
    actionCell.className = "last-cell";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remove book";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.dataset.id = currentBook.id; // Store book id in data attribute

    const updateBtn = document.createElement("button");
    updateBtn.textContent = "Update book";
    updateBtn.classList.add("update-btn");
    updateBtn.dataset.id = currentBook.id;

    actionCell.append(deleteBtn, updateBtn);
    tableRow.appendChild(actionCell);
  }
}
//delete button after a row is created

const dialog = document.createElement("dialog");
dialog.id = "bookDialog";

//add book
const newBook = document.createElement("button");
newBook.textContent = "New Book";
newBook.value = "new-book";
document.body.appendChild(newBook);
newBook.addEventListener("click", () => {
  newBook.addEventListener("click", () => {
    // Clear the form fields
    titleInput.value = "";
    authorInput.value = "";
    pageInput.value = "";
    readSelect.value = "yes"; // Or "no", default to something

    currentEditingId = null; // Reset editing mode
    dialog.showModal();
  });
});

//form-method = dialog
const form = document.createElement("form");
form.className = "user-input-form";
form.method = "dialog";
//TITLE//
const titleRow = document.createElement("div");
titleRow.className = "form-row";

const titleLabel = document.createElement("label");
titleLabel.textContent = "Title";
const titleInput = document.createElement("input");
titleInput.type = "text";
titleInput.placeholder = "Book Title";
titleInput.name = "title";
titleInput.required = true;

titleRow.append(titleLabel, titleInput);
form.appendChild(titleRow);

//AUTHOR//
const authorRow = document.createElement("div");
authorRow.className = "form-row";

const authorLabel = document.createElement("label");
authorLabel.textContent = "Author";
const authorInput = document.createElement("input");
authorInput.type = "text";
authorInput.placeholder = "Author";
authorInput.name = "author";
authorInput.required = true;
authorRow.append(authorLabel, authorInput);

//PAGES//
const pageRow = document.createElement("div");
pageRow.className = "form-row";

const pageLabel = document.createElement("label");
pageLabel.textContent = "Number of pages";
const pageInput = document.createElement("input");
pageInput.type = "number";
pageInput.placeholder = "Pages";
pageInput.name = "pages";
pageInput.required = true;
pageRow.append(pageLabel, pageInput);

//READ SELECT??
const selectRow = document.createElement("div");
selectRow.className = "form-row";

const readLabel = document.createElement("label");
readLabel.textContent = "Read ?";
const readSelect = document.createElement("select");
readSelect.name = "read";

const optionYes = document.createElement("option");
optionYes.value = "yes";
optionYes.textContent = "yes";
const optionNo = document.createElement("option");
optionNo.value = "no";
optionNo.textContent = "no";
readSelect.append(optionYes, optionNo);
selectRow.append(readLabel, readSelect);

//  BUTTON
const buttonRow = document.createElement("div");
buttonRow.className = "form-row";

const cancelButton = document.createElement("button");
cancelButton.value = "cancel";
cancelButton.type = "button";
cancelButton.textContent = "Cancel";

const submitButton = document.createElement("button");
submitButton.value = "submit";
submitButton.type = "submit";
submitButton.textContent = "Add Book";
buttonRow.append(cancelButton, submitButton);

// Append elements to form
form.append(titleRow, authorRow, pageRow, selectRow, buttonRow);
// Add form to dialog
dialog.appendChild(form);
// Add dialog to body
document.body.appendChild(dialog);

//toggle table
const table = document.querySelector(".table-output");
table.hidden = true;

//LOGIC//
dialog.addEventListener("submit", (e) => {
  const title = e.target.title.value;
  const author = e.target.author.value;
  const pages = e.target.pages.value;
  const read = e.target.read.value;
  if (currentEditingId) {
    const book = myLibrary.find((b) => b.id === currentEditingId);
    book.title = title;
    book.author = author;
    book.pages = pages;
    book.read = read;
    currentEditingId = null;
  } else {
    addBookToLibrary({ title, author, pages, read });
  }
  renderBooksToTable(myLibrary);
  dialog.close();

  table.hidden = false;
});

cancelButton.addEventListener("click", () => {
  dialog.close();
});
//function to deleteBook
function deleteBook(arr, targetID) {
  const index = arr.findIndex((book) => book.id === targetID);
  if (index !== -1) {
    arr.splice(index, 1);
  }
}
//function to updateBook
let currentEditingId = null;
function updateBook(arr, targetID) {
  const book = arr.find((book) => book.id === targetID);
  if (book) {
    titleInput.value = book.title;
    authorInput.value = book.author;
    pageInput.value = book.pages;
    readSelect.value = book.read;

    currentEditingId = book.id;
    dialog.showModal();
  }
}
//event delegation on table body
table.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const bookId = e.target.dataset.id;
    deleteBook(myLibrary, bookId);
    renderBooksToTable(myLibrary);
  }
  if (e.target.classList.contains("update-btn")) {
    const bookId = e.target.dataset.id;
    updateBook(myLibrary, bookId);
    renderBooksToTable(myLibrary);
  }
});
