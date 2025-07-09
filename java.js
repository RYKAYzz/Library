const myLibrary = [];
function Book({ title, author, read, id }) {
  this.title = title;
  this.author = author;
  this.read = read;
  this.id = crypto.randomUUID();
}
function addBookToLibrary({ title, author, read }) {
  myLibrary.push(new Book());
}
