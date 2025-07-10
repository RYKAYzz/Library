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
