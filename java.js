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
  }
}

const dialog = document.createElement("dialog");
dialog.id = "bookDialog";

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
titleInput.type = " text";
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
form.appendChild(titleRow);
form.appendChild(authorRow);
form.appendChild(pageRow);
form.appendChild(selectRow);
form.appendChild(buttonRow);

// Add form to dialog
dialog.appendChild(form);
// Add dialog to body
document.body.appendChild(dialog);

dialog.showModal();
