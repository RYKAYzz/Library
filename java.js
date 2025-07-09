const myLibrary = [];

function Book({ title, author, read, id }) {
  this.title = title;
  this.author = author;
  this.read = read;
  this.id = crypto.randomUUID();
}
function addBookToLibrary({ title, author, read }) {
  const book = new Book({ title, author, read });
  myLibrary.push(book);
  return myLibrary;
}
function logBooks(myArray) {
  myArray.forEach((book) => console.log(book));
}
function renderBooks(array) {
  return array.map(
    (book) => `${book.title} by ${book.author} - Read: ${book.read}`
  );
}
