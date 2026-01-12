const myLibrary = [];

function Book(id, title, author, pages, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(crypto.randomUUID(), title, author, pages, read);
  myLibrary.push(newBook);
}

hobbit = addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
dune = addBookToLibrary("Dune", "Frank Herbert", 412, false);
foundation = addBookToLibrary("Foundation", "Isaac Asimov", 255, true);

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
