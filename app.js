const apiURL = "https://books.free.beeceptor.com"; // Placeholder API URL

// Fetch and display books on the homepage
async function fetchBooks() {
    try {
        const response = await fetch(apiURL);
        const books = await response.json();

        // Display the first 10 books
        const bookList = document.getElementById("item-list");
        bookList.innerHTML = ''; // Clear current list before adding new items
        books.slice(0, 10).forEach((book) => {
            const listItem = document.createElement("li");
            listItem.textContent = book.title;  // English book title
            listItem.onclick = () => viewBookDetails(book.id); // Open details on click
            bookList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error fetching books:", error);
    }
}

// View details of a specific book
async function viewBookDetails(bookId) {
    try {
        const response = await fetch(`${apiURL}/${bookId}`);
        const book = await response.json();

        // Display book details in an alert
        alert(`
            Title: ${book.title}
            Author: John Doe
            Genre: Fiction
            Pages: 300
            Description: This is a description in English for the book.
        `);
    } catch (error) {
        console.error("Error fetching book details:", error);
    }
}

// Add a new book using the form
const createForm = document.getElementById("create-form");
if (createForm) {
    createForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const newBook = {
            title: document.getElementById("title").value,
            body: document.getElementById("description").value, // Placeholder for "description"
        };

        try {
            const response = await fetch(apiURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newBook),
            });

            const createdBook = await response.json();
            alert(`Book "${createdBook.title}" added successfully!`);

            // Dynamically add the newly created book to the list on the homepage
            const bookList = document.getElementById("item-list");
            const listItem = document.createElement("li");
            listItem.textContent = createdBook.title;  // English book title
            listItem.onclick = () => viewBookDetails(createdBook.id); // Open details on click
            bookList.appendChild(listItem);

            // Optionally, clear the form after submission
            document.getElementById("title").value = '';
            document.getElementById("description").value = '';

        } catch (error) {
            console.error("Error adding book:", error);
        }
    });
}

// Initialize book fetching on homepage
if (document.getElementById("item-list")) {
    document.addEventListener("DOMContentLoaded", fetchBooks);
}
