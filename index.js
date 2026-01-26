class Library {
  #books = [];

  addBook(title, author, pages, read) {
    const newBook = new Book(crypto.randomUUID(), title, author, pages, read);
    this.#books.push(newBook);
    this.displayBooks();
  }

  removeBook(bookId) {
    const bookIndex = this.#books.findIndex((book) => book.id === bookId);
    if (bookIndex !== -1) {
      this.#books.splice(bookIndex, 1);
      this.displayBooks();
    }
  }

  displayBooks() {
    const booksContainer = document.getElementById("book-container");
    booksContainer.innerHTML = "";

    this.#books.forEach((book) => {
      const bookCard = document.createElement("div");
      bookCard.classList.add("book");
      bookCard.dataset.id = book.id;
      bookCard.innerHTML = `
            <h2>${book.title}</h2>
            <p>${book.author}</p>
            <p>${book.pages}</p>
            <p>Status: ${book.read ? "Read" : "Not Read"}</p>
            <div>
              <button class="toggle-read">Change Status</button>
              <button class="remove-book">Remove</button>
            </div>
        `;
      booksContainer.appendChild(bookCard);

      // let user switch between "read" and "not read"
      const toggleReadButton = bookCard.querySelector(".toggle-read");
      toggleReadButton.addEventListener("click", () => {
        book.toggleRead();
        this.displayBooks();
      });

      // let user delete a book from the library
      const removeButton = bookCard.querySelector(".remove-book");
      removeButton.addEventListener("click", () => {
        this.removeBook(book.id);
      });
    });
  }
}

class Book {
  constructor(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;
  }
}

const lib = new Library();

// form creation
const form = document.createElement("form");
form.innerHTML = `          
              <input type="text" id="title" name="title" placeholder="Title" required />
              <input type="text" id="author" name="author" placeholder="Author" required />
              <input type="number" id="pages" name="pages" placeholder="Pages" min="5" required />
              <div>
                <label for="read">Read:</label>
                <input type="checkbox" id="read" name="read" />
              </div>
            <button type="submit">Add Book</button>
        `;

// display the book form to web-page
const newBookButton = document.querySelector(".new");
newBookButton.addEventListener("click", showBookForm);
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

    lib.addBook(title, author, pages, read);
    form.reset();
    dialog.removeChild(form);
    dialog.close();
  };
}

// close dialog when user clicks outside of it
const dialog = document.querySelector("dialog");
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) {
    dialog.close();
    dialog.removeChild(form);
  }
});

dialog.querySelector("form").addEventListener("click", (e) => {
  e.stopPropagation();
});

lib.displayBooks();
