const catalogUrl = "../data/libros.json";
const imageBaseUrl = "../imagenes/";

const statusElement = document.getElementById("book-detail-status");
const contentElement = document.getElementById("book-detail-content");
const relatedSection = document.getElementById("related-section");

const setText = (id, value) => {
  const element = document.getElementById(id);
  if (element) element.textContent = value || "—";
};

const showStatus = (message) => {
  statusElement.hidden = false;
  statusElement.textContent = message;
  contentElement.hidden = true;
  relatedSection.hidden = true;
};

const renderRelatedBooks = (books, currentId) => {
  const related = books.filter((book) => book.id !== currentId).slice(0, 4);
  const container = document.getElementById("related-books");

  container.innerHTML = related
    .map(
      (book) => `
        <article class="detail-related-card">
          <a href="./Libro.html?id=${encodeURIComponent(book.id)}" aria-label="Ver ${book.title}">
            <img src="${imageBaseUrl}${book.imageFiles[0]}" alt="Portada de ${book.title}" />
          </a>
          <span>${book.genre}</span>
          <h3><a href="./Libro.html?id=${encodeURIComponent(book.id)}">${book.title}</a></h3>
          <p>${book.author}</p>
        </article>
      `,
    )
    .join("");

  relatedSection.hidden = false;
};

const renderBook = (book, books) => {
  document.title = `${book.title} | ¡LEER YA!`;
  document.getElementById("page-description").setAttribute("content", book.description);
  setText("breadcrumb-title", book.title);
  setText("book-genre", book.genre);
  setText("book-title", book.title);
  setText("book-author", book.author);
  setText("book-description", book.description);
  setText("book-publisher", book.publisher);
  setText("book-published", book.published);
  setText("book-pages", book.pages ? `${book.pages} páginas` : null);
  setText("book-isbn", book.isbn);

  const cover = document.getElementById("book-cover");
  cover.src = `${imageBaseUrl}${book.imageFiles[0]}`;
  cover.alt = `Portada de ${book.title}`;

  statusElement.hidden = true;
  contentElement.hidden = false;
  renderRelatedBooks(books, book.id);
};

const setupSaveButton = (book) => {
  const button = document.getElementById("save-book");
  const storageKey = `leer-ya-saved-${book.id}`;
  const saved = localStorage.getItem(storageKey) === "true";

  const updateButton = (isSaved) => {
    button.setAttribute("aria-pressed", String(isSaved));
    button.innerHTML = isSaved
      ? '<span aria-hidden="true">♥</span> Guardado en mi lista'
      : '<span aria-hidden="true">♡</span> Guardar en mi lista';
  };

  updateButton(saved);
  button.addEventListener("click", () => {
    const nextSaved = button.getAttribute("aria-pressed") !== "true";
    localStorage.setItem(storageKey, String(nextSaved));
    updateButton(nextSaved);
  });
};

const setupStartButton = (book) => {
  const button = document.getElementById("start-reading");
  button.addEventListener("click", () => {
    button.classList.add("is-reading");
    button.textContent = "Lectura añadida";
  });
};

async function loadBook() {
  const id = new URLSearchParams(window.location.search).get("id");

  if (!id) {
    showStatus("Selecciona un libro desde Inicio o Más leídos.");
    return;
  }

  try {
    const response = await fetch(catalogUrl);
    if (!response.ok) throw new Error(`No se pudo cargar el catálogo (${response.status})`);

    const catalog = await response.json();
    const book = catalog.libros.find((item) => item.id === id);

    if (!book) {
      showStatus("El libro solicitado no existe en el catálogo.");
      return;
    }

    renderBook(book, catalog.libros);
    setupSaveButton(book);
    setupStartButton(book);
  } catch (error) {
    console.error(error);
    showStatus("No fue posible cargar la ficha del libro.");
  }
}

loadBook();