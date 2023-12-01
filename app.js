const booksList = document.getElementById('book-list');

class Library {
	constructor() {
		this.books = [];
	}

	addBook(newBook) {
		this.books.push(newBook);
	}
}

const library = new Library();

window.addEventListener('load', () => {
	const books = JSON.parse(localStorage.getItem('library'));
	if (books) {
		books.map((book) => library.addBook(JSONToBook(book)));
	}
	displayLibrary();
});

const JSONToBook = (book) => {
	return new Book(book.title, book.author, book.pages, book.read);
};

class Book {
	constructor(title, author, pages, read = false) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}
	get readMessage() {
		return this.read ? 'read' : 'not read yet';
	}

	get info() {
		return `${title} by ${author}, ${pages} pages, ${this.readMessage()}`;
	}
}

function addBookToLibrary(title, author, pages, read) {
	const newBook = new Book(title, author, pages, read);
	library.addBook(newBook);
	saveLocal();
	displayLibrary();
}

const saveLocal = () => {
	localStorage.setItem('library', JSON.stringify(library.books));
};

// myLibrary -> html elements for each book
function displayLibrary() {
	const frag = document.createDocumentFragment();

	library.books.forEach((book) => {
		const li = document.createElement('li');
		const title = document.createElement('div');
		title.innerText = book.title;
		const author = document.createElement('div');
		author.innerText = book.author;
		const pages = document.createElement('div');
		pages.innerText = book.pages;
		const read = document.createElement('div');
		read.innerText = book.readMessage;

		//appending
		li.appendChild(title);
		li.appendChild(title);
		li.appendChild(author);
		li.appendChild(pages);
		li.appendChild(read);
		frag.appendChild(li);
	});
	booksList.innerHTML = '';
	booksList.appendChild(frag);
}

// Add book to library from form
const form = document.getElementById('book-form');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const data = new FormData(e.target);
	addBookToLibrary(
		data.get('title'),
		data.get('author'),
		data.get('pages'),
		data.get('read')
	);
	e.target.reset();
});
