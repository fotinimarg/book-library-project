const myLibrary = [];

function Book(id, title, author, pages, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const newBookButton = document.querySelector(".new");
newBookButton.addEventListener("click", showBookForm);
const form = document.createElement("form");
form.innerHTML = `
            <input type="text" name="title" placeholder="Title" required />
            <input type="text" name="author" placeholder="Author" required />
            <input type="number" name="pages" placeholder="Pages" required />
            <label>
                <input type="checkbox" name="read" />
                Read
            </label>
            <button type="submit">Add Book</button>
        `;

function showBookForm() {
  const dialog = document.querySelector("#new-book-dialog");
  dialog.appendChild(form);
  dialog.showModal();

  dialog.querySelector("form").onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const title = formData.get("title");
    const author = formData.get("author");
    const pages = parseInt(formData.get("pages"), 10);
    const read = formData.get("read") === "on";

    addBookToLibrary(title, author, pages, read);
    form.reset();
    dialog.removeChild(form);
    dialog.close();
  };
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(crypto.randomUUID(), title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  const booksContainer = document.getElementById("book-container");
  booksContainer.innerHTML = "";

  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book");
    bookCard.innerHTML = `
            <h2>${book.title}</h2>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.read ? "Read" : "Not Read"}</p>
        `;
    booksContainer.appendChild(bookCard);
  });
}

displayBooks();
